import type { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";
import { SignJWT } from "jose";

import { getGithubAccesstokenURI } from "@/backend/utils/github";
import { saveUser } from "@/backend/controllers/user";
import dbConnect from "@/backend/config/database";

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await dbConnect();
    const { code } = req.query;

    //get access token
    let response = await axios.post(
      getGithubAccesstokenURI(code as string),
      {},
      { headers: { Accept: "application/json" } },
    );
    const { access_token } = response.data;

    //get user info
    let user_response = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `token ${access_token}` },
    });

    //preapre user info
    const { login: username, id, avatar_url, name, email } = user_response.data;

    await saveUser({
      username,
      id,
      avatar_url,
      name,
      email,
    });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);
    const token = await new SignJWT({
      username,
      id,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 12 * 60 * 60,
    })
      .setProtectedHeader({ alg: "HS256" })
      .sign(secret);

    res.redirect(`/login?jwt=Bearer ${token}`);
  } catch (error) {
    console.log(error);
    res.redirect("/login");
  }
}

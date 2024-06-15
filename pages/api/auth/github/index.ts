import type { NextApiRequest, NextApiResponse } from "next";

import { getGithubAuthURI } from "@/backend/utils/github";

export default function Handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const githubAuthURI = getGithubAuthURI();

    res.redirect(githubAuthURI);
  } catch (error) {
    res.redirect("/");
  }
}

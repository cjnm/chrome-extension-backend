import dbConnect from "@/backend/config/database";
import {getUser} from "@/backend/utils/auth";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();

    const {
      headers
    } = req;
    const jwt_token = headers['authorization'];

    const user = await getUser(jwt_token as string);

    if(user) {
      return res.status(200).json(user);
    }

    return res.status(401).json({ message: 'Auth required' });
  } catch (error) {
    return res.status(401).json({ message: 'Auth required' });
  }
}

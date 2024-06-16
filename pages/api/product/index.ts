import dbConnect from "@/backend/config/database";
import { deleteProduct, getAllProduct, saveProduct } from "@/backend/controllers/product";
import { getUser } from "@/backend/utils/auth";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();

    const {
      headers,
      body,
      method,
      query,
    } = req;

    const { id } = query;

    const jwt_token = headers['authorization'];
    const user = await getUser(jwt_token as string);
    if (!user) {
      return res.status(401).json({ message: 'Auth required' });
    }

    switch (method) {
      case 'POST': {
        await saveProduct({ ...body, user: user.id });
        return res.status(200).json({ message: 'Product Saved' });
        break;
      }
      case 'GET': {
        const query: any = {user: user.id}
        if(id) { 
          query['_id'] = id;
        }
          let products = await getAllProduct(query);
          return res.status(200).json({ data: products });
        break;
      }
      case 'DELETE': {
        await deleteProduct({user: user.id, _id: id as string});
        return res.status(200).json({ message: 'Product Deleted' });
        break;
      }
    }

    return res.status(401).json({ message: 'Auth required' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

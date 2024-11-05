//https://<your-site.com>/api/revalidate?secret=<token>
//http://localhost:3000/api/revalidate?path=/&secret=Next10Tokentokkutoku

import { revalidate } from "@/app/page";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.query.secret !== process.env.MY_SECRET_TOKEN)
        return res.status(401).json({ message: 'Invalid token' })
    const path = req.query.path as string
    await res.revalidate(path)

    const responsedata = [
        { revalidated: true },
        { message: "Hello, world" }
    ]
    // return res.json({ revalidated: true });
    // return res.send("Hello, world!");
    return res.json(responsedata);
}


// Handles the view
// Next.js에서 api를 만들 때 export default 키워드를 꼭 넣어야함.

import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

// 해당 주소를 치고 들어갈 때 Next.js가 그걸 보고 함수를 실행하기 때문.
type Method = "GET" | "POST" | "DELETE" | "PUT" | "PATCH";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

export default function withHandler(method: Method, handler: NextApiHandler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== method) {
      res.status(405).end();
    }
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}

// Handles the view
// Next.js에서 api를 만들 때 export default 키워드를 꼭 넣어야함.

import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

// 해당 주소를 치고 들어갈 때 Next.js가 그걸 보고 함수를 실행하기 때문.
type Method = "GET" | "POST" | "DELETE" | "PUT" | "PATCH";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

interface ConfigType {
  method: Method;
  handler: NextApiHandler;
  isPrivate?: boolean;
}

export default function withHandler({
  method,
  handler,
  isPrivate = true,
}: ConfigType) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<any> {
    if (req.method !== method) {
      res.status(405).end();
    }

    if (isPrivate && !req.session.user) {
      return res.status(401).json({ ok: false, error: "로그인 해주세요." });
    }
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}

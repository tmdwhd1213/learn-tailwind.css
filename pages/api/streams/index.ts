import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
    body: { name, price, description },
  } = req;

  switch (req.method) {
    case "GET":
      const streams = await client.stream.findMany();
      res.json({ ok: true, streams });
      break;

    case "POST":
      const stream = await client.stream.create({
        data: {
          name,
          price: +price!,
          description,
          user: {
            connect: {
              id: user?.id,
            },
          },
        },
      });
      res.json({ ok: true, stream });
      break;
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
    isPrivate: true,
  })
);

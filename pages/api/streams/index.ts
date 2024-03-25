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
    query: { page },
  } = req;

  switch (req.method) {
    case "GET":
      const PAGE_OFFSET = 10;
      const streamsCount = await client.stream.count();
      const streams = await client.stream.findMany({
        take: PAGE_OFFSET,
        skip: (Number(page) - 1) * PAGE_OFFSET,
      });
      res.json({
        ok: true,
        streams,
        pages: Math.ceil(streamsCount / PAGE_OFFSET),
      });
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

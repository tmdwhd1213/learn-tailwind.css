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
      const {
        result: {
          uid,
          rtmps: { streamkey, url },
        },
      } = await (
        await fetch(
          `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/stream/live_inputs`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.CF_STREAM_TOKEN}`,
            },
            body: `{"meta": {"name":"${name}"},"recording": { "mode": "automatic", "timeoutSeconds": 10}}`,
          }
        )
      ).json();
      const stream = await client.stream.create({
        data: {
          cloudflareId: uid,
          cloudflareKey: streamkey,
          cloudflareUrl: url,
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

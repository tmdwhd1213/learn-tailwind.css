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
  } = req;

  const reviews = await client.review.findMany({
    where: {
      createdForId: user?.id,
    },
    // 다른 테이블 조인
    include: {
      createdBy: { select: { id: true, name: true, avatar: true } },
    },
  });

  res.json({ ok: true, reviews });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
    isPrivate: true,
  })
);

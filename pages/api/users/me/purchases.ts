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

  const purchases = await client.purchase.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      product: true,
    },
  });

  // 만약 enum record로 저장한 것으로 이용하려면 /api/users/me/records?kind=Fav
  // await client.record.findMany({
  //   where: {
  //     userId: user?.id,
  //     kind: "Fav"
  //   }
  // })

  res.json({ ok: true, purchases });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
    isPrivate: true,
  })
);

import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    body: { name, price, description },
    session: { user },
    query: { page },
  } = req;

  switch (req.method) {
    case "GET":
      const PAGE_OFFSET = 10;
      const productsCount = await client.product.count();
      const products = await client.product.findMany({
        include: {
          // relate된 것의 갯수를 가리킴.
          _count: {
            select: {
              favs: true,
            },
          },
        },
        take: PAGE_OFFSET,
        skip: (Number(page) - 1) * PAGE_OFFSET,
      });

      res.json({
        ok: true,
        products,
        pages: Math.ceil(productsCount / PAGE_OFFSET),
      });
      break;
    case "POST":
      const product = await client.product.create({
        data: {
          name,
          price: +price,
          description,
          image: "test",
          user: {
            connect: {
              id: user?.id,
            },
          },
        },
      });

      res.json({ ok: true, product });
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

import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    body: { question, latitude, longitude },
    session: { user },
    // query : url 뒤에 ?부터 & 있는거 전부
  } = req;

  switch (req.method) {
    case "POST":
      const post = await client.post.create({
        data: {
          question,
          latitude,
          longitude,
          user: {
            connect: {
              id: user?.id,
            },
          },
        },
      });

      res.json({ ok: true, post });
      break;

    case "GET":
      const {
        query: { latitude: getLatitude, longitude: getLongitude },
      } = req;
      const parsedLatitude = parseFloat(getLatitude!.toString());
      const parsedLongitude = parseFloat(getLongitude!.toString());
      const COORDINATE_OFFSET = 0.01;

      const posts = await client.post.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
          _count: {
            select: {
              answers: true,
              wondering: true,
            },
          },
        },
        // F12 콘솔에서 센서를 누르면 지역을 변경할 수 있다. (인근의 글만 뜨는지 테스트 용이)
        where: {
          latitude: {
            gte: parsedLatitude - COORDINATE_OFFSET,
            lte: parsedLatitude + COORDINATE_OFFSET,
          },
          longitude: {
            gte: parsedLongitude - COORDINATE_OFFSET,
            lte: parsedLongitude + COORDINATE_OFFSET,
          },
        },
      });
      res.json({ ok: true, posts });
      break;
  }
}

export default withApiSession(
  withHandler({
    methods: ["POST", "GET"],
    handler,
    isPrivate: true,
  })
);

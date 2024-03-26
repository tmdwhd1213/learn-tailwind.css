import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  switch (req.method) {
    case "GET":
      // GET 요청 처리
      const profile = await client.user.findUnique({
        where: { id: req.session.user?.id },
      });
      res.json({ ok: true, profile });
      break;

    case "POST":
      // POST 요청 처리
      const {
        session: { user },
        body: { email, phone, name, avatarId },
      } = req;

      const currentUser = await client.user.findUnique({
        where: {
          id: user?.id,
        },
      });
      // email과 phone이 모두 빈 문자열인 경우 Error
      // if (email === "" && phone === "") {
      //   return res.json({ ok: false, error: "Both are EMPTY!" });
      // }

      // 이메일 처리
      if (email !== currentUser?.email) {
        const alreadyExists = !!(await client.user.findUnique({
          where: {
            email: email,
          },
          select: {
            id: true,
          },
        }));
        if (alreadyExists) {
          return res.json({
            ok: false,
            error: "Email already Taken.",
          });
        }
        await client.user.update({
          where: {
            id: user?.id,
          },
          data: {
            email,
          },
        });
      }

      // 전화번호 처리
      if (phone !== currentUser?.phone) {
        const alreadyExists = !!(await client.user.findUnique({
          where: {
            phone: phone,
          },
          select: {
            id: true,
          },
        }));
        if (alreadyExists) {
          return res.json({
            ok: false,
            error: "Phone already Taken.",
          });
        }
        await client.user.update({
          where: {
            id: user?.id,
          },
          data: {
            phone,
          },
        });
      }

      if (name) {
        await client.user.update({
          where: {
            id: user?.id,
          },
          data: {
            name,
          },
        });
      }

      if (avatarId) {
        await client.user.update({
          where: {
            id: user?.id,
          },
          data: {
            avatar: avatarId,
          },
        });
      }

      // 마지막에 한 번만 응답을 보냄
      return res.json({ ok: true });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
    isPrivate: true,
  })
);

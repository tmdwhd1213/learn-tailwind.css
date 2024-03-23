import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { generateRandomInt4 } from "@/libs/server/utils";
import sendMessage from "@/libs/server/sms";
import smtpTransport from "@/libs/server/email";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email, phone } = req.body;
  const user = phone ? { phone: phone } : email && { email };
  if (!user) return res.status(400).json({ ok: false });
  const payload = generateRandomInt4() + "";

  // upsert로 update, insert 한번에
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });
  if (phone) {
    //const message = await sendMessage(payload);
    //console.log(message);
  } else if (email) {
    //   const mailOptions = {
    //     from: process.env.MAIL_ID,
    //     to: email,
    //     subject: "캐럿마켓 Authentication Email",
    //     text: `Authentication Code : ${payload}`,
    //     html: `<h1>Authentication Code : ${payload}</h1>`,
    //   };
    //   try {
    //     const sendEmail = await smtpTransport.sendMail(mailOptions);
    //     smtpTransport.close();
    //     console.log(sendEmail);
    //   } catch (error) {
    //     console.error(error);
    //   } finally {
    //     smtpTransport.close();
    //   }
  }
  /* if (email) {
    user = await client.user.findUnique({
      where: {
        email,
      },
    });
    if (user) console.log("found it");
    if (!user) {
      console.log("Did not find. Will create.");
      user = await client.user.create({
        data: {
          name: "Anonymous",
          email,
        },
      });
    }
    console.log(user);
  }
  if (phone) {
    user = await client.user.findUnique({
      where: {
        phone: phone,
      },
    });
    if (user) console.log("found it");
    if (!user) {
      console.log("Did not find. Will create.");
      user = await client.user.create({
        data: {
          name: "Anonymous",
          phone: phone,
        },
      });
    }
    console.log(user);
  } */
  return res.json({
    ok: true,
  });
}

export default withHandler({
  methods: ["POST"],
  handler,
  isPrivate: false,
});

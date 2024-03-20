import { Vonage } from "@vonage/server-sdk";

//@ts-ignore
const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET!,
});

export default async function sendMessage(payload: any) {
  return vonage.sms
    .send({
      to: process.env.MY_PHONE!,
      from: "asd",
      text: `Your login token is ${payload}.`,
    })
    .then((resp) => {
      console.log("Message sent successfully");
      console.log(resp);
    })
    .catch((err) => {
      console.log("There was an error sending the messages.");
      console.error(err);
    });
}

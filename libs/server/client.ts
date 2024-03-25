import { PrismaClient } from "@prisma/client";

declare global {
  var client: PrismaClient | undefined;
}

// const client = global.client || new PrismaClient({ log: ["query"] }); // sql query문을 터미널에서 볼 수 있음.
const client = global.client || new PrismaClient();

if (process.env.NODE_ENV === "development") global.client = client;

export default client;

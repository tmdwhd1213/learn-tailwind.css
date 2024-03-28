import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOption = {
  cookieName: "karrotsession",
  password: process.env.COOKIE_PWD!,
};

export function withApiSession(handler: any) {
  return withIronSessionApiRoute(handler, cookieOption);
}

export function withSsrSession(handler: any) {
  return withIronSessionSsr(handler, cookieOption);
}

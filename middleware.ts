import { getIronSession } from "iron-session/edge";
import { type NextRequest, type NextFetchEvent, userAgent } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  // 봇 판별
  if (userAgent(req).isBot) {
    return new Response(`Plz don't be a bot. Be human.`, { status: 403 });
  }

  // Iron-session으로 미들웨어에서 실제로 해당 세션이 유효한지까지 검사
  const res = NextResponse.next();
  const session = await getIronSession(req, res, {
    cookieName: "karrotsession",
    password: process.env.COOKIE_PWD!,
    cookieOptions: {
      secure: process.env.NODE_ENV! === "production",
    },
  });
  if (!req.url.includes("/enter") && !session.user) {
    const { origin } = req.nextUrl;
    return NextResponse.redirect(new URL(`/enter`, origin));
  }

  if (req.nextUrl.pathname.startsWith("/chats")) {
    // console.log("chats ONLY middleware");
  }
  // 사용자의 지역에 따라 페이지를 다르게 보여줄 수 있고, 차단도 가능
  // console.log(req.geo);
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};

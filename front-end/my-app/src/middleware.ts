import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, res: NextResponse) {
  const chatPath = req.nextUrl.pathname;
  const cookieStore = await cookies();
  if (chatPath === "/chat") {
    console.log("you are in right place ");

    const session = cookieStore.get("session")?.value;
    if (session) {
      const convertSession = Buffer.from(session, "base64").toString("utf-8");
      const {  expireSesion } = JSON.parse(convertSession);
      const expireDate = new Date(expireSesion);
      const now = new Date();
      
      const diffMs = now.getTime() < expireDate.getTime();

      if (!diffMs) {
        cookieStore.delete("session");
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }
  }
}

export const config = {
  matcher: ["/chat"],
};

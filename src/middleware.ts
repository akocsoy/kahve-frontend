import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const guestFlag = request.cookies.get("guest");
  const guestId = request.cookies.get("guestId");

  if (!token && !guestFlag) {
    const newGuestId = "guest_" + Math.random().toString(36).substring(2, 10);
    const response = NextResponse.next();
    response.cookies.set("guest", "true", {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    response.cookies.set("guestId", newGuestId, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/"], // ihtiyaç olan sayfalar
};

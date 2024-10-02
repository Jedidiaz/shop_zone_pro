import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const response = request.cookies.get("userSession")?.value;

  if (!response) {
    console.log("No user session found. Creating a new default session.");
    const newUserSession = JSON.stringify({
      state: { user: null, token: null },
    });
    const res = NextResponse.redirect(new URL("/", request.url));
    res.cookies.set("userSession", newUserSession, { path: "/" });
    return res;
  }

  const userSession = JSON.parse(response);
  const { pathname } = request.nextUrl;
  const protectedPaths = "/(admin)";

  if (
    (pathname.match(protectedPaths) &&
      userSession?.state.user.role !== "admin") ||
    !userSession?.state.user
  ) {
    console.log(
      "No valid user session for protected path, redirecting to home."
    );
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

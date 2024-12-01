import { NextResponse } from "next/server"
import { auth } from "./auth"
import { authRoutes, adminRoutes } from "./routes"

export default auth((req) => {
  const { nextUrl, cookies } = req
  const isLoggedIn = !!req.auth
  const user = req.auth?.user // Assuming user information is stored in req.auth.user

  // Get the fiscalYear cookie
  const fiscalYear = cookies.get("fiscalYear")?.value

  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  // Redirect to /fiscalyear if trying to access /members without fiscalYear set
  if (nextUrl.pathname === "/members" && !fiscalYear) {
    return NextResponse.redirect(new URL("/fiscalyear", nextUrl))
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/members", nextUrl))
    }
    return NextResponse.next()
  }

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/", nextUrl))
  }

  // Admin route protection
  const isAdminRoute = adminRoutes.includes(nextUrl.pathname)

  if (isAdminRoute && user?.email !== "admin") {
    return NextResponse.redirect(new URL("/", nextUrl))
  }
  return NextResponse.next()
})
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images/).*)"],
}

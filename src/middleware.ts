import { NextRequest, NextResponse } from "next/server";
import { getServerToken } from "./utils/session";
import { role } from "./utils/consts";
import { auth } from "./auth";

const publicPaths = ["/", "/auth", "/auth/*", "/api/public/*", "/api/auth/*"];
const studentPaths = ["/student/*", "/api/student/*"];
const facultyPaths = ["/faculty/*", "/api/faculty/*"];
const staffPaths = ["/staff/*", "/api/staff/*"];
const adminPaths = ["/admin/*", "/api/admin/*"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // console.log(pathname);

  const token = await getServerToken(req);
  console.log(token, "token");

  const session = await auth();
  console.log(session, "auth");

  const isPublicPath = publicPaths.some((path) =>
    path.endsWith("*")
      ? pathname.startsWith(path.slice(0, -2))
      : pathname === path
  );
  const isStudentPath = studentPaths.some((path) =>
    path.endsWith("*")
      ? pathname.startsWith(path.slice(0, -2))
      : pathname === path
  );
  const isFacultyPath = facultyPaths.some((path) =>
    path.endsWith("*")
      ? pathname.startsWith(path.slice(0, -2))
      : pathname === path
  );
  const isStaffPath = staffPaths.some((path) =>
    path.endsWith("*")
      ? pathname.startsWith(path.slice(0, -2))
      : pathname === path
  );
  const isAdminPath = adminPaths.some((path) =>
    path.endsWith("*")
      ? pathname.startsWith(path.slice(0, -2))
      : pathname === path
  );

  if (!token && (isStudentPath || isFacultyPath || isStaffPath || isAdminPath)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (token && pathname === "/") {
    switch (token.role) {
      case role.STUDENT:
        return NextResponse.redirect(new URL("/student", req.url));
      case role.FACULTY:
        return NextResponse.redirect(new URL("/faculty", req.url));
      case role.STAFF:
        return NextResponse.redirect(new URL("/staff", req.url));
      case role.ADMIN:
        return NextResponse.redirect(new URL("/admin", req.url));
    }
  }


  if (isStudentPath && token?.role !== role.STUDENT) {
    return NextResponse.redirect(new URL("/403", req.url));
  }
  if (isFacultyPath && token?.role !== role.FACULTY) {
    return NextResponse.redirect(new URL("/403", req.url));
  }
  if (isStaffPath && token?.role !== role.STAFF) {
    return NextResponse.redirect(new URL("/403", req.url));
  }
  if (isAdminPath && token?.role !== role.ADMIN) {
    return NextResponse.redirect(new URL("/403", req.url));
  }

  if (isPublicPath) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

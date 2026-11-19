import {NextRequest,NextResponse} from "next/server";
import {verifySession} from "./lib/auth";

export function proxy(request:NextRequest){
 const pathname=request.nextUrl.pathname;
 if(pathname==="/admin/login")return NextResponse.next();
 if(pathname!=="/admin"&&!pathname.startsWith("/admin/"))return NextResponse.next();
 const valid=verifySession(request.cookies.get("mfsys_admin_session")?.value);
 if(!valid)return NextResponse.redirect(new URL("/admin/login",request.url),302);
 return NextResponse.next();
}
export const config={matcher:["/admin/:path*"]};

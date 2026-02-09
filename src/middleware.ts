import { authConfig } from "../auth.config"
import NextAuth from "next-auth";

export default NextAuth(authConfig).auth;

export const cofng = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
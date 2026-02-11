import type { NextAuthConfig } from "next-auth";

export const authConfig = { pages: { signIn: "/admin/login" },
    callbacks: {
        authorized({auth, request: {nextUrl}}) {
            const isLoggedIn = !!auth?.user;
            const isOnAdminPanel = nextUrl.pathname.startsWith("/admin");
            if (isOnAdminPanel) {
                if (nextUrl.pathname == "/admin/login") return true;
                if (isLoggedIn) return true;
                return false;
            }
            return true;
        },
    },
    providers: [],
} satisfies NextAuthConfig;
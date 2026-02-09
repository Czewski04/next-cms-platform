import type { NextAuthConfig } from "next-auth";

export const authConfig = { pages: { signIn: "/auth/login" },
    callbacks: {
        authorized({auth, request: {nextUrl}}) {
            const isLoggedIn = !!auth?.user;
            const isAdminPanel = nextUrl.pathname.startsWith("/admin");
            if (isAdminPanel) {
                if (nextUrl.pathname == "/admin/login") return true;
                if (isLoggedIn) return true;
                return false;
            }
            return true;
        },
    },
    providers: [],
} satisfies NextAuthConfig;
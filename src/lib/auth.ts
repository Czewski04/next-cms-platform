import NextAuth, { AuthError } from "next-auth";
import { db } from "./db";
import { authConfig } from "../../auth.config";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { DatabaseUnavailableError, InvalidCredentialsError, InvalidEmailError, InvalidPasswordError } from "./exceptions";

const prisma = db;

async function getUser(email: string) {
    try{
        const user = await prisma.user.findUnique({where: {email}});
        return user;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw new DatabaseUnavailableError();
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z.object({
                    email: z.email(),
                    password: z.string().min(1),
                }).safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if(!user) throw new InvalidEmailError();
                    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
                    if (passwordMatch) return user;
                    else throw new InvalidPasswordError();
                }
                console.log("Invalid credentials:");
                throw new InvalidCredentialsError();
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 5*60*60, // 5 hours
    },
});
'use server';

import { signIn, signOut } from "@/lib/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function login(
    prevState: string | undefined,
    formData: FormData
) {
    try {
        await signIn('credentials',  {email: formData.get("email"), password: formData.get("password"), redirectTo: "/admin"});
    } catch (error) {
        if (error instanceof AuthError) {
            console.error("Authentication error:", error);
            return error.message;
        }
        throw error;
    }
    return undefined
}

export async function logout() {
    await signOut();
    redirect('/admin/login');
}
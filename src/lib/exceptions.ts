import { AuthError, CredentialsSignin } from "next-auth";

export class InvalidEmailError extends CredentialsSignin{
    code = "InvalidEmail";
    message = "Invalid email";
}

export class InvalidPasswordError extends CredentialsSignin{
    code = "InvalidPassword";
    message = "Invalid password";
}

export class InvalidCredentialsError extends CredentialsSignin{
    code = "InvalidCredentials";
    message = "Wrong email or password";
}

export class DatabaseUnavailableError extends AuthError {
    code = "DatabaseUnavailable";
    message = "Database is currently unavailable. Please try again later.";
}
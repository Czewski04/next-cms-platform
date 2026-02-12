import { logout } from "@/actions/auth-actions";

export default function AdminPage(){
    return (
        <form action={logout}>
            <button type="submit">Logout</button>
        </form>
    );
}
import { logout } from "@/actions/auth-actions";
import HiddenSidebar from "./HiddenSidebar";

const Navbar = () => {
    return (
        <div className="bg-zinc-800 p-3 flex justify-between items-center rounded-b-2xl mx-2 md:mx-10 font-inter gap-3">
            <HiddenSidebar/>
            <p className="font-bold text-md md:text-xl"> Panel Administratora </p>
            <form action={logout}>
               <button type="submit" className="bg-zinc-900 px-4 py-1 font-bold border border-zinc-700 hover:border-white active:bg-zinc-700 rounded-2xl">Wyloguj</button>
            </form>
        </div>

    );
}

export default Navbar;
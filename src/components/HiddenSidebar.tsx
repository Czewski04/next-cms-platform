'use client';

import { Menu } from "lucide-react";
import { useState } from "react";
import Sidebar from "@/components/Sidebar"

export default function HiddenSidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return(
        <div>
            <button onClick={open} className="transition-transform duration-300 lg:hidden hover:scale-120"> <Menu/> </button>
            <div onClick={close} className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-xs transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}/>
                <div onClick={close} className={`fixed inset-y-0 left-0 z-50 w-55 bg-zinc-800 shadow-2xl rounded-r-3xl transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <div> <Sidebar/></div>
                </div>
            <div/>
        </div>
    );
}
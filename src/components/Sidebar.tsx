'use client'

import Logo from '@/components/Logo'
import { Building2, LayoutDashboard, Users } from 'lucide-react';
import Link from "next/link"
import { usePathname } from 'next/navigation';

const links = [
    {href: "/admin", label: "Panel Główny", icon: LayoutDashboard},
    {href: "/admin/projects", label: "Projekty", icon: Building2},
    {href: "/admin/about", label: "O nas", icon: Users},
]

const Sidebar = () => {
    const pathname = usePathname();
    return (
        <div className="flex flex-col py-5 px-1.5 gap-2 font-inter font-bold">
            <div className="mx-5 mb-5 flex justify-center">
                <Logo width="100" height="40" fill="#ffffff" className="my-svg"/>
            </div>
            <nav className='flex flex-col gap-2'>
                {links.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link key={link.href} href={link.href} className={`flex items-center py-2 px-3 rounded-2xl gap-5 transition-colors ${isActive ? "bg-zinc-900" : "hover:bg-zinc-900"}`}>
                            <link.icon/>
                            <span>{link.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}

export default Sidebar;
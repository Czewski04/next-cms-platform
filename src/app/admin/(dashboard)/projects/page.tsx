import { Plus } from "lucide-react";
import Link from "next/link";

export default function ProjectsPage(){
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/admin/projects/create" className="group relative border-2 border-dashed border-zinc-600 flex flex-col justify-center items-center rounded-2xl transition-all">
                <div>
                    <Plus size={90} className="transition-all duration-500 group-hover:scale-120 group-hover:text-zinc-600"/>
                </div>
                <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="font-bold font-inter">Dodaj nowy projekt</span>
                </div>
            </Link>
            
            <div className="border-2 flex justify-center items-center rounded-2xl"> Project </div>
            <div className="border-2 flex justify-center items-center rounded-2xl"> Project </div>
            <div className="border-2 flex justify-center items-center rounded-2xl"> Project </div>
            <div className="border-2 flex justify-center items-center rounded-2xl"> Project </div>
            <div className="border-2 flex justify-center items-center rounded-2xl"> Project </div>

        </div>
    );
}
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar'
export default function AdminDashboardLayout({children}: {children: React.ReactNode;}) {
    return (
        <div className='flex h-screen w-screen overflow-hidden bg-zinc-900'>
            <aside className='hidden w-55 flex-none bg-zinc-800 lg:block rounded-r-3xl'>
                <Sidebar/>
            </aside>
            <div className='flex flex-1 flex-col'>
                <header>
                    <Navbar/>
                </header>
                <main className='flex-1 overflow-y-auto p-10'> 
                    {children} 
                </main>
            </div>
        </div>
    )
}
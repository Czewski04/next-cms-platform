'use client';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="relative w-screen h-screen flex items-center justify-center">
        <div className="absolute bg-[url('/assets/bg.webp')] blur-lg brightness-60 bg-cover bg-center bg-no-repeat h-dvh w-dvw flex items-center justify-center -z-10"></div>
        
        <form className="w-full max-w-md rounded-2xl px-10 py-7 bg-zinc-900 flex flex-col items-center gap-7">
            <div className="font-sans font-bold text-white text-2xl">Zaloguj się </div>
            <input type="email" placeholder="Email" className="w-full bg-zinc-700 rounded-2xl p-3 text-white font-bold"/>
            <div className="relative w-full">
              <input type={isVisible ? "text" : "password"} placeholder="Hasło" className="w-full bg-zinc-700 rounded-2xl p-3 text-white font-bold pr-15"/>
              <button type="button" onClick={toggleVisibility} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200">
                {isVisible ? <EyeOff /> : <Eye />}
              </button>
            </div>
            <button type="submit" className="w-full border border-zinc-700 rounded-2xl p-3 font-bold hover:border-white active:bg-zinc-700"> Zaloguj się </button>
        </form>

    </div>
  );
}
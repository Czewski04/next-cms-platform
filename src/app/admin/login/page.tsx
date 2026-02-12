'use client';
import { useState, useActionState } from 'react';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import { login } from '@/actions/auth-actions';

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [errorMessage, dispatch] = useActionState(login, undefined);

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center px-7">
        <div className="absolute bg-[url('/assets/bg.webp')] blur-lg brightness-60 bg-cover bg-center bg-no-repeat h-dvh w-dvw flex items-center justify-center -z-10"></div>
        <form action={dispatch} className="w-full max-w-md rounded-2xl px-10 py-7 bg-zinc-900 flex flex-col items-center gap-7">
            <div className="font-sans font-bold text-white text-2xl">Zaloguj się </div>
            <input name='email' type="email" placeholder="Email" className="w-full bg-zinc-700 rounded-2xl p-3 text-white font-bold"/>
            <div className="relative w-full">
              <input name='password' type={isVisible ? "text" : "password"} placeholder="Hasło" className="w-full bg-zinc-700 rounded-2xl p-3 text-white font-bold pr-15"/>
              <button type="button" onClick={toggleVisibility} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200">
                {isVisible ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errorMessage && (
              <div className="flex items-center gap-2 text-sm font-medium text-red-500">
                <AlertCircle size={16} />
                <p>{errorMessage}</p>
              </div>
            )}
            <button type="submit" className="w-full border border-zinc-700 rounded-2xl p-3 font-bold hover:border-white active:bg-zinc-700"> Zaloguj się </button>
        </form>
    </div>
  );
}
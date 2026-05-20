import Link from 'next/link'
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton
} from "@clerk/nextjs";
import { use } from 'react';
import { useCartStore } from '@/store';

function Navbar() {
  // const useSotre = useCartStore();

  return (
    <nav className="fixed top-0 left-0 w-full h-14 flex items-center px-8 justify-between z-50 bg-slate-800 text-gray-300">
      <Link
        href="/"
        className="uppercase font-bold text-sm flex items-center"
      >
        Next Store
      </Link>

      <div className='flex items-center gap-8'>
        <div className='flex items-center cursor-pointer relative'>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span className='bg-teal-600 text-sm font-bold rounded-full h-5 w-5 flex items-center 
                           justify-center absolute left-3 bottom-3'>
            2
          </span>
        </div>
        <div>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode='modal'>
              <button className="uppercase rounded-md border border-gray-400 px-3 py-2">
                Fazer login
              </button>
            </SignInButton>
          </SignedOut>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
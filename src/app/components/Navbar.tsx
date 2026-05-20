import Link from 'next/link'
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton
} from "@clerk/nextjs";
import { use } from 'react';
import Cart from './Cart';

function Navbar() {  

  return (
    <nav className="fixed top-0 left-0 w-full h-14 flex items-center px-8 justify-between z-50 bg-slate-800 text-gray-300">
      <Link
        href="/"
        className="uppercase font-bold text-sm flex items-center"
      >
        Next Store
      </Link>

      <div className='flex items-center gap-8'>
          <Cart />
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
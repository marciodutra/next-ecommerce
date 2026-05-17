import Link from 'next/link'

function Navbar() {
    return(
        <nav className="fixed top-0 left-0 w-full h-14 flex items-center px-8 justify-between z-50 bg-slate-800 text-gray-300">
          <Link
            href="/"
            className="uppercase font-bold text-sm flex items-center"
          >
            Next Store
          </Link>
        </nav>
    );
}

export default Navbar;
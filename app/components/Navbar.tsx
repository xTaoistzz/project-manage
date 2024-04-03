import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-900 p-4 flex justify-between items-center">
      <div>
        <span className="text-white text-lg font-bold">AIWA</span>
      </div>
      <div className="flex space-x-4">
        <div className="nav-item">
          <Link href="/project">
            <div className="text-white cursor-pointer hover:bg-blue-800 transition duration-200 rounded px-2 py-1">Projects</div>
          </Link>
        </div>
        <div className="nav-item">
          <Link href="/auth/login">
            <div className="text-white cursor-pointer hover:bg-blue-800 transition duration-200 rounded px-2 py-1">Sign In</div>
          </Link>
        </div>
        <div className="nav-item">
          <Link href="/auth/register">
            <div className="text-white cursor-pointer hover:bg-blue-800 transition duration-200 rounded px-2 py-1">Sign Up</div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
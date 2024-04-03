import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <div className="w-full h-20 bg-blue-950 sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <Link href="/">
              <div className="text-white font-semibold text-xl">||| OLAWA</div>
            </Link>

            <ul className="hidden md:flex gap-x-6 text-white">
              <li>
                <Link href="/project/create">Project</Link>
              </li>
              <li>
                <Link href="/auth/register">Sign-Up</Link>
              </li>
              <li>
                <Link href="/auth/login">Sign-In</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

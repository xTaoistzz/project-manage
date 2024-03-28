import Link from "next/link";

export default function Navbar(){
    return (
        <>
        <div className="w-full h-20 bg-blue-950 sticky top-0">
            <div className="container mx-auto px-4 h-full">
                <div className="flex justify-between items-center h-full">
                    <div className="text-white font-semibold text-xl">||| AIWA</div>
                    <ul className="hidden md:flex gap-x-6 text-white">
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/project">Projects</Link>
                        </li>
                        <li>
                            <Link href="/auth/register">Sign-Up</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        </>
    )
}
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DarkModeToggle } from "@/components/DarkModeToggle"
import { signIn,signOut, useSession } from "next-auth/react"
const Navbar = () => {
const {data:sessionData} = useSession();
  return (
    <nav className="fixed top-0 w-full z-20 text-center md:text-left border-b border-gray-400/20 bg-gray-600 bg-opacity-5 backdrop-blur-lg backdrop-filter p-3 flex justify-between items-center drop-shadow-xl px-4">
        <h1 className="md:px-12 font-bold text-2xl md:text-4xl text-black dark:text-white flex flex-row justify-between items-center gap-4">
          <Image src="/favicon.png" alt="" height={40} width={50} />
          <Link href='/'>Eventzap</Link>
          </h1>
          <div className="flex flex-row gap-20 justify-center items-center">
            <div className="flex flex-row gap-6">
          <ul className="flex flex-row gap-12 text-lg font-semibold">
            <Link href='/'>Home</Link>
            <Link href='/'>Events</Link>
            <Link href='/'>Team</Link>
            <Link href='/'>About</Link>
          </ul>
          </div>
          <div className="flex flex-row gap-4">
            {/* {
                sessionData?.user ? <Button className="bg-gray-800 text-white dark:bg-gray-100 dark:text-black" onClick={()=>{void signIn("google")}}>Profile</Button> :<></>
            } */}
            {
                sessionData?.user ?
                <Button className="bg-gray-800 text-white dark:bg-gray-100 dark:text-black font-semibold" onClick={()=>{void signOut()}}>Logout</Button>:<Button className="bg-gray-800 text-white dark:bg-gray-100 dark:text-black" onClick={()=>{void signIn("google")}}>Login</Button>
            }
          <DarkModeToggle />
          </div> 
          </div>
    </nav>
  )
}

export default Navbar
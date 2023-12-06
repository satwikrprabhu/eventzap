import { signIn, useSession } from "next-auth/react"
import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"
import { useRouter } from "next/router"
import Signout from "./Signout"
const ProfileButton = () => {
    const router = useRouter()
const session = useSession()

if(!session?.data)
  return (
    <div className="flex items-center justify-center">
      <Button onClick={()=>void signIn("google")} className="bg-gray-800 text-white dark:bg-gray-100 dark:text-black font-semibold dark:hover:bg-gray-300">
        Login
      </Button>
    </div>
  );
  
    return (
        <div className="flex items-center justify-center gap-4">
            <Link href='/profile'>
        <Image
            className="rounded-full"
            src={session.data.user.image!}
            alt="Profile Picture"
            width={40}
            height={40}
        />
        </Link>
        <Signout />
        </div>
  )
}

export default ProfileButton
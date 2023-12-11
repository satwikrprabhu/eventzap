import { signIn, useSession } from "next-auth/react"
import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"
import { useRouter } from "next/router"
import Signout from "./Signout"
import { LogIn } from "lucide-react"
const ProfileButton = () => {
    const router = useRouter()
const session = useSession()

if(!session?.data)
  return (
    <div className="flex items-center justify-center">
      <Button onClick={()=>void signIn("google")} className="" variant={"outline"} size={"icon"}>
      <LogIn />
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
        <span className="hidden md:block">
          <Signout />
          </span>
        </div>
  )
}

export default ProfileButton
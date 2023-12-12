import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { ChangeEvent, useState } from "react"
import { api } from "~/utils/api"
import  {useToast} from "./ui/use-toast"
export default function JoinTeam() {
const { data: sessionData } = useSession();
const { toast } = useToast()
const joinTeam = api.team.joinTeam.useMutation(
    {
        //OnSuccess Toast
        onSuccess: () => {
            router.push(`/team/${teamCode}`)
          toast({
            title: "Joined Team Successfully!",
            description: "You have joined the team successfully.",
            variant: "default",
          })
        },
        onError:(error)=>{
          toast({
            title:"Uh oh! Something went wrong!",
            description:"Please try again later.",
            variant:"destructive"
          })
        }
      }
)
const [teamCode,setTeamCode] = useState('')

const handleChange = (e: ChangeEvent<HTMLInputElement>) =>{
    setTeamCode(e.target.value)
}

const router = useRouter()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="dark:text-black text-white">Join a Team</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter the Team code</DialogTitle>
          <DialogDescription>
            Add the Team code here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="code" className="text-right">
              Team Code
            </Label>
            <Input
              id="code"
              className="col-span-3"
              placeholder="Enter a Team Code"
              onChange={(e)=>handleChange(e)}
              value={teamCode}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={
                ()=>{
                joinTeam.mutate({code:teamCode})
          }
        }>Join Team</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

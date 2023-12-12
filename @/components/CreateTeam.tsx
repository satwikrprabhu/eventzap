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
import { useToast } from "./ui/use-toast"
export function CreateTeam() {
    const { data: sessionData } = useSession();
    const { toast } = useToast()

const createTeam = api.team.createteam.useMutation({
    //OnSuccess Toast
    onSuccess: () => {
      toast({
        title: "Created Team Successfully!",
        description: "Your team has been created successfully.",
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
  })
const [teamname,setTeamname] = useState('')

const handleChange = (e: ChangeEvent<HTMLInputElement>) =>{
    setTeamname(e.target.value)
}
const router = useRouter()

if(createTeam.isSuccess){
  router.push(`/team/${teamname}`)
}
else{
  console.log('error')
}

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="dark:text-black text-white">Create a Team</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a Team</DialogTitle>
          <DialogDescription>
            Add a Team name here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Team Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              placeholder="Enter a Team Name"
              onChange={(e)=>handleChange(e)}
              value={teamname}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={
            ()=>{
              createTeam.mutate({name:teamname})              
          }
        }>Create Team</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

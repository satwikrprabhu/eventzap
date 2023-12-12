import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { api } from "~/utils/api"
import { useRouter } from "next/router"
import { useToast } from "./ui/use-toast"

export function CardWithForm(props: any) {
    const router = useRouter()
    const { toast } = useToast()
    const teamcode = api.team.getTeamCode.useQuery()
    const leaveTeam = api.team.leaveTeam.useMutation(
        {
            onSuccess:()=>{
                router.push('/team')
                toast({
                    title:"Left Team Successfully!",
                    description:"You have left the team successfully.",
                    variant:"default"
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
    const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(teamcode.data?.teamId || "").then(
      () => {
        setCopied(true);
        // changing back to default state after 2 seconds.
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      },
      (err) => {
        console.log("failed to copy", err.mesage);
      }
    );
  };
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{props.titleName}</CardTitle>
        <CardDescription>Share the team code with your members</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className="text-center py-2 text-base">Team Code</Label>
                <p className="text-center hover:select-all border py-1">{teamcode.data?.teamId}</p>
            </div>
            
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {copied? <p className="text-center text-green-400 font-normal">✅ code has been copied</p>:<p></p>}
        {/* <Button  onClick={copyToClipboard} className="cursor-pointer text-center ">Copy</Button> */}
        <Button className="cursor-pointer ml-0" onClick={()=>{
            leaveTeam.mutate()
            }}>Leave Team</Button>
      </CardFooter>
    </Card>
  )
}

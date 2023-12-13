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

export function TeamNameCard() {
    const router = useRouter()
    const teamName = api.team.getTeamName.useQuery()
    const leaveTeam = api.team.leaveTeam.useMutation()
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{teamName.data}</CardTitle>
        <CardDescription>You have joined a Team!</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className="text-center py-2 text-base">Team Name</Label>
                <p className="text-center hover:select-all border py-1">{teamName.data}</p>
            </div>
            
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button className="cursor-pointer hover:bg-gray-950" onClick={()=>{
            leaveTeam.mutate()
            router.push('/team')
            }}>Leave Team</Button>
      </CardFooter>
    </Card>
  )
}

import React from 'react'
import { useSession } from 'next-auth/react'
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { api } from '~/utils/api';
import { zodResolver } from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
const Admin = () => {
  const [value, setValue] = React.useState("");
    const session = useSession();
    const { toast } = useToast()
    const events = api.event.getAllEvents.useQuery();
    const unPublishEvent = api.event.unpublishAnEvent.useMutation();
    const publishEvent = api.event.publishAnEvent.useMutation();
    const getAllUsers = api.user.getAllUsers.useQuery();
    const changeRole = api.user.changeRoles.useMutation(
      {
        //OnSuccess Toast
        onSuccess: () => {
          toast({
            title: "Role changed Successfully!",
            description: "User role has been updated successfully.",
            variant: "default",
          })
          getAllUsers.refetch()
        },
        onError:(error)=>{
          toast({
            title:"Uh oh! Something went wrong!",
            description:error.message,
            variant:"destructive"
          })
        }
      }
    );
    

    if(session?.data?.user.role!="ADMIN")
      return (
        <div className='flex min-h-screen flex-col items-center justify-center bg-slate-100'>
        <h1>Not Authorised</h1>
        </div>
      )
      else{
        return(
        
        <div className='min-h-screen flex justify-center pt-10 bg-slate-100 dark:bg-gradient-to-b from-[#19212d] to-[#131539]'>
            <Tabs defaultValue="password" className="w-[300px] md:w-2/3 pt-20 sticky">
      <TabsList className="grid w-full grid-cols-2 md:text-4xl">
        <TabsTrigger value="password" className='text-lg md:text-2xl'>All Users</TabsTrigger>
        <TabsTrigger value="account" className='text-lg md:text-2xl'>All Events</TabsTrigger>
      </TabsList>
      <TabsContent value="password">
      <Card>
          <CardHeader>
            <CardTitle className='text-xl md:text-2xl'>Users</CardTitle>
            <CardDescription>
             View all the users here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
           <Table>
           <TableHeader>
        <TableRow className='text-center space-x-24'>
          <TableHead className="text-center text-sm font-semibold">Name</TableHead>
          <TableHead className="text-center font-medium text-sm hidden lg:inline-flex">Branch</TableHead>
          <TableHead className="text-center text-sm hidden lg:inline-flex">Activity Points</TableHead>
          <TableHead className="text-center text-sm hidden lg:inline-flex">Year</TableHead>
          <TableHead className="text-right text-sm font-semibold">Role</TableHead>
        </TableRow>
      </TableHeader>
           <TableBody>
            {getAllUsers.data?.map((user) => (
              
          <TableRow className='text-center space-x-32'>
            <TableCell className="text-center text-base font-semibold">{user.name}</TableCell>
            <TableCell className="text-center font-medium text-base hidden lg:inline-flex"><Badge variant="secondary">{user.branch}</Badge></TableCell>
            <TableCell className="text-center text-base hidden lg:inline-flex">{user.activityPoints}</TableCell>
            <TableCell className="text-center text-base hidden lg:inline-flex">{user.year}</TableCell>
            <TableCell className="text-right text-base">
              <Select value={user.Role}
        onValueChange={(selectedValue) => {
          setValue(selectedValue);
          changeRole.mutateAsync({
            id: user.id,
            //@ts-ignore
            role: selectedValue,
          });
              }}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Change roles" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Roles</SelectLabel>
          <SelectItem value="USER">User</SelectItem>
          <SelectItem value="ADMIN">Admin</SelectItem>
          <SelectItem value="ORGANISER">Organiser</SelectItem>
          <SelectItem value="COORDINATOR">Coordinator</SelectItem>
          <SelectItem value="CR">CR</SelectItem>
          <SelectItem value="LECTURER">Lecturer</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select></TableCell>    
          </TableRow>
            ))}
       
      </TableBody>
           </Table>
          </CardContent>
          <CardFooter>

          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle className='text-xl md:ytext-2xl'>Events</CardTitle>
            <CardDescription>
             View all the events here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
           <Table>
           <TableBody>
            {events.data?.map((event) => (
          <TableRow className='text-center space-x-20'>
            
            <TableCell className="text-center text-lg font-semibold ">{event.name}</TableCell>
            <TableCell className="text-center font-medium text-base hidden md:inline-block"><Badge variant="secondary">{String(event.eventDate).split(' ').slice(0,4).join(' ')}</Badge></TableCell>
            <TableCell className="text-center text-base hidden md:inline-block"><Badge variant="secondary">{event.category}</Badge></TableCell>
            <TableCell className="text-center text-base px-4 ">{event.released ? <Button onClick={
              async ()=>{
                await unPublishEvent.mutateAsync({id:event.id})
                events.refetch()
              }
            
            } size={'sm'} className='font-semibold'>Unpublish</Button>:<Button onClick={async ()=>{
              await publishEvent.mutateAsync({id:event.id})
              events.refetch()
            }} size={'sm'} className='font-semibold'>Publish</Button>}</TableCell>
            
              
          </TableRow>
            ))}
       
      </TableBody>
           </Table>
          </CardContent>
          <CardFooter>

          </CardFooter>
        </Card>
      </TabsContent>

          {/* Ignore the form for now you can come back later */}


      
    </Tabs>
        </div>
        )
      }
    }
    


export default Admin
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
import { api } from '~/utils/api';
const Admin = () => {
    const session = useSession();
    const events = api.event.getAllEvents.useQuery();
    const unPublishEvent = api.event.unpublishAnEvent.useMutation();
    const publishEvent = api.event.publishAnEvent.useMutation();
    const getAllUsers = api.user.getAllUsers.useQuery();
    if(session?.data?.user.role!="ADMIN")
      return (
        <div className='flex min-h-screen flex-col items-center justify-center bg-slate-100 dark:bg-gradient-to-b from-[#19212d] to-[#131539]'>
        <h1>Not Authorised</h1>
        </div>
      )
      else{
        return(
        
        <div className='flex min-h-screen flex-col items-center justify-center bg-slate-100 dark:bg-gradient-to-b from-[#19212d] to-[#131539]'>
            <Tabs defaultValue="account" className="w-[300px] md:w-2/3 pt-20">
      <TabsList className="grid w-full grid-cols-2 md:text-4xl">
        <TabsTrigger value="password" className='md:text-2xl'>All Users</TabsTrigger>
        <TabsTrigger value="account" className='md:text-2xl'>All Events</TabsTrigger>
      </TabsList>
      <TabsContent value="password">
      <Card>
          <CardHeader>
            <CardTitle className='md:text-2xl'>Users</CardTitle>
            <CardDescription>
             View all the users here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
           <Table>
           <TableBody>
            {getAllUsers.data?.map((user) => (
          <TableRow className='text-center space-x-20'>
            
            <TableCell className="text-center text-base font-semibold ">{user.name}</TableCell>
            <TableCell className="text-center font-medium text-base hidden md:inline-block">{user.branch}</TableCell>
            <TableCell className="text-center text-base hidden md:inline-block">{user.activityPoints}</TableCell>
            <TableCell className="text-center text-base hidden md:inline-block">{user.year}</TableCell>
            <TableCell className="text-center text-base hidden md:inline-block">{user.Role}</TableCell>
            
              
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
            <CardTitle className='md:text-2xl'>Events</CardTitle>
            <CardDescription>
             View all the events here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
           <Table>
           <TableBody>
            {events.data?.map((event) => (
          <TableRow className='text-center space-x-20'>
            
            <TableCell className="text-center text-base font-semibold ">{event.name}</TableCell>
            <TableCell className="text-center font-medium text-base hidden md:inline-block">{String(event.eventDate).split(' ').slice(0,4).join(' ')}</TableCell>
            <TableCell className="text-center text-base hidden md:inline-block">{event.category}</TableCell>
            <TableCell className="text-center text-base px-4 ">{event.released ? <Button onClick={
              async ()=>{
                await unPublishEvent.mutateAsync({id:event.id})
                events.refetch()
              }
            
            }>Unpublish</Button>:<Button onClick={async ()=>{
              await publishEvent.mutateAsync({id:event.id})
              events.refetch()
            }}>Publish</Button>}</TableCell>
            
              
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
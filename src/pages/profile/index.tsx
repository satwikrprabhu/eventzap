import { EditProfile } from '@/components/EditProfile'
import React from 'react'
import { useSession } from 'next-auth/react'
import { CreateEvent } from '@/components/CreateEvent';
const Profile = () => {
const session = useSession();
if(!session?.data?.user)
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-slate-100 dark:bg-gradient-to-b from-[#19212d] to-[#131539]'>
    <h1>Not Authorised</h1>
    </div>
  )
  else{
    return(
    
    <div className='flex min-h-screen flex-col items-center justify-center bg-slate-100 dark:bg-gradient-to-b from-[#19212d] to-[#131539]'>
   <div className='flex flex-row gap-2 border-[0.5px] border-gray-400 py-60 px-52 rounded-md'>
    <EditProfile />
    <CreateEvent />
   </div>
    </div>
    )
  }
}

export default Profile
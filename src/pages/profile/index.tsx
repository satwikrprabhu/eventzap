import { EditProfile } from '@/components/EditProfile'
import React from 'react'
import { useSession } from 'next-auth/react'
import { CreateEvent } from '@/components/CreateEvent';
const Profile = () => {
const session = useSession();
if(!session?.data?.user)
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-slate-100 dark:bg-gradient-to-b from-[#040508] to-[#181a45]'>
    <h1>Not Authorised</h1>
    </div>
  )
  else{
    return(
    
    <div className='flex min-h-screen flex-col items-center justify-center bg-slate-100 dark:bg-gradient-to-b from-[#040508] to-[#181a45]'>
   <div className='flex flex-col gap-2  px-52 rounded-md'>
    <div>
      <h1 className="text-4xl font-extrabold text-white leading-10 mx-auto max-w-xl  text-center tracking-widest">Profile</h1>
   
      <div className='flex flex-row gap-2 py-10 px-52 rounded-md'>

    <EditProfile />
    <CreateEvent />
      </div>
      </div>
   </div>
    </div>
    )
  }
}

export default Profile
import { EditProfile } from '@/components/EditProfile'
import React from 'react'

const Profile = () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-slate-100 dark:bg-gradient-to-b from-[#19212d] to-[#131539]'>
    <EditProfile />
    </div>
  )
}

export default Profile
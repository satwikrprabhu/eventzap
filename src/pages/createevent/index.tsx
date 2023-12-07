import React from 'react'
import { useSession } from 'next-auth/react'

const CreateEvent = () => {
    const session = useSession().data;
    if(session?.user?.role=='COORDINATOR' || session?.user?.role=='ADMIN')
  return (
    <div className='flex justify-center items-center min-h-screen'>CreateEvent</div>
  )
  return(
    <div className='flex justify-center items-center min-h-screen'>Not Authorised</div>
  )
}

export default CreateEvent
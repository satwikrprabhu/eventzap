import React from 'react'
import { Button } from './ui/button'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

const Signout = () => {
  return (
    <Button variant="outline" size="icon" onClick={async()=>{await signOut()
        window.location.href = "/";}
        }>
        <LogOut className="h-5"/>
        </Button>
  )
}

export default Signout
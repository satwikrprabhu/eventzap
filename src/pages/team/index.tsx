import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button';
import { CreateTeam } from '@/components/CreateTeam';
import JoinTeam from '@/components/JoinTeam';
import {api} from '~/utils/api'
import { CardWithForm } from '@/components/TeamCodeCard';

const createTeam = () => {
  const { data: sessionData } = useSession();
  const userExistsinTeam = api.team.userExistsInTeam.useQuery()
  const teamDetails = api.team.getTeamName.useQuery()
    return (
      <>
      {
        sessionData?
        (<>
        <div className='flex justify-center items-center h-screen gap-5 bg-slate-100 dark:bg-gradient-to-b from-[#040508] to-[#181a45]'>
            {
                userExistsinTeam.data ?  (<>
                    {teamDetails.data?<CardWithForm titleName={teamDetails.data} />:""}
                </>):(<>
                    <CreateTeam/>
                    <JoinTeam />
                </>)

            }
        
        </div>
        </>):
        (<>
        <div className='bg-slate-950 flex flex-col justify-center items-center h-screen gap-4'>         
        <h1 className='text-white'>Please sigin to create a team</h1>
        <Button onClick={()=>signIn()} className='text-black bg-white hover:bg-gray-300'>Sign in</Button>
        </div>
        </>)
      }
      </>
    )
}

export default createTeam

import { CardWithForm } from '@/components/TeamCodeCard';
import { TeamNameCard } from '@/components/TeamNameCard';
import { useRouter } from 'next/router';

const TeamPage = () => {
  const router = useRouter();
  const { teamname,teamCode } = router.query;

  return (
    <div className='flex flex-col justify-center items-center h-screen gap-5 bg-slate-950 text-white'>
      {teamname?<CardWithForm titleName={teamname} />:<TeamNameCard />}
    </div>
  );
};

export default TeamPage;

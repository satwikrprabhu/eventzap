import { api } from "~/utils/api"
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IndianRupee, MapPin, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { set } from "date-fns";
const Events = () => {
  const {toast} = useToast();
    // const [teamId1,setTeamId1] = useState("");
    // const [eventId1,setEventId1] = useState("");
    const eve = api.event.getPublishedEvents.useQuery();
    const teamId = api.team.getTeamId.useQuery().data;
    // const hasregistered = api.event.hasTheUserRegisteredForEvent.useQuery({eventId:eventId1,teamId:teamId1}).data;
    const register= api.event.registerForEvent.useMutation(
      {
        onSuccess: () => {
          toast({
            title: "Registered for the event Successfully!",
            description: "You have registered for the event successfully.",
            variant: "default",
          })
        },
        onError:(error)=>{
          toast({
            title:"Uh oh! Something went wrong!",
            description:"Please try again later.",
            variant:"destructive"
          })
        }
      }
    );
   
    const {data:session} = useSession();
  return (
    <div className="max-h-screen mt-28 px-6 max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    {eve.data?.map((event)=>(
          <div className="dark:bg-slate-900 backdrop-blur-sm flex h-full flex-col cursor-pointer p-4 rounded-sm">
        <div className="relative grow">
        <Image
                src={event.posterUrl}
                alt={event.name}
                width={500}
                height={300}
                className="w-full h-full object-cover rounded-sm"
              />
               <span
              className={`titleFont bg-gradient-to-t capitalize from-black/50 to-transparent p-2 pl-4 h-1/2 w-full flex items-end bottom-0 absolute drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.7)] text-gray-100 font-bold text-xl`}>
              {event.name}
            </span>
            </div>
          <div>
            <div className="flex flex-wrap md:flex-row gap-4 md:gap-8 items-center justify-center md:justify-between">
            <div className="flex flex-col gap-4 md:gap-8 items-center justify-center md:justify-between">
            {/* <h1 className="text-2xl font-bold text-center">{event.name}</h1>
            <p className="text-lg text-center">{event.description}</p> */}
            <div className="flex flex-wrap mt-2 gap-1.5 ">
            {/* Location */}
            <div className="flex px-3 py-2 dark:text-gray-200 dark:bg-gray-600/20 shrink-0 text-sm rounded-sm grow gap-1 items-center max-w-full"
                >
                  <MapPin className='w-3'/>
                  <p className="leading-4">
                    {event.location}
                  </p>
                </div>
                {/* Fees */}
                <div className="flex px-3 py-2 dark:text-gray-200 dark:bg-gray-600/20 shrink-0 text-sm rounded-sm grow gap-1 items-center max-w-full text-center"
                >
                  <IndianRupee className='w-5'/>
                  <p className="leading-4">
                    {event.fees?event.fees:"Free"}
                  </p>
                </div>

                {/* TeamSize */}
                <div className="flex px-3 py-2 dark:text-gray-200 dark:bg-gray-600/20 shrink-0 text-sm rounded-sm grow gap-1 items-center max-w-full"
                >
                  <Users className='w-4'/>
                  <p className="leading-4">
                    {event.eventType} Event
                  </p>
                </div>

                {/* Category */}
                <div className="flex px-3 py-2 dark:text-gray-200 dark:bg-gray-600/20 shrink-0 text-sm rounded-sm grow gap-1 items-center max-w-full"
                >
                  <Users className='w-4'/>
                  <p className="leading-4">
                    {event.category} 
                  </p>
                </div>

                {/* Offline/Online */}
                <div className="flex px-3 py-2 dark:text-gray-200 dark:bg-gray-600/20 shrink-0 text-sm rounded-sm  gap-1 items-center max-w-full"
                >
                  <Users className='w-4'/>
                  <p className="leading-4">
                    {event.offorOn}
                  </p>
                </div>

                {/* TeamSize */}
                <div className="flex px-3 py-2 dark:text-gray-200 dark:bg-gray-600/20 shrink-0 text-sm rounded-sm grow gap-1 items-center max-w-full text-center"
                >
                  <Users className='w-4 text-center'/>
                  <p className="leading-4 text-center">
                  {String(event.eventDate).split(' ').slice(1,3).join(' ')}, {event.time}
                  </p>
                </div>
                {event.minTeamSize == event.maxTeamSize ?
                  
                  <></>
                : 
                    <div className="flex px-3 py-2 dark:text-gray-200 dark:bg-gray-600/20 shrink-0 text-sm rounded-sm grow gap-1 items-center max-w-full text-center"
                    >
                      <Users className='w-4 text-center'/>
                      <p className="leading-4 text-center">
                      {event.minTeamSize} - {event.maxTeamSize} Members / Team
                      </p>
                    </div>
                
              }
                </div>   
                {session?.user && teamId ? <Button size={"lg"} className="font-semibold w-full text-base text-black" onClick={()=>{register.mutateAsync({
              eventId:event.id,
              teamId:teamId
            })
          } }>Register</Button> :
                <Button size={"lg"} className="font-semibold w-full text-base text-white bg-gray-600 hover:bg-gray-600">Register</Button>
                }
            
            </div>
          </div>
            </div>
        
        </div>
        ))}
    </div>

  )
}

export default Events
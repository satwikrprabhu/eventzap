import {z} from 'zod'
import { createTRPCRouter,protectedProcedure,publicProcedure } from '../trpc'
import { OfforOn,EventType } from '@prisma/client'
export const eventRouter = createTRPCRouter({
    createEvent: protectedProcedure
    .input(
        z.object({
            name:z.string(),
            description:z.string(),
            posterUrl:z.string(),
            eventDate:z.date(),
            location:z.string(),
            fees:z.number(),
            eventType:z.enum(EventType as any),
            mode: z.enum(OfforOn as any),


        })
    )
    .mutation(async ({ctx,input})=>{
            try {
                const event = await ctx.prisma.event.create({
                    data:{
                        ...input
                    }
                });

                const organiser = await ctx.prisma.organiser.create({
                    data:{
                        user:{
                            connect:{
                                id:ctx?.session?.user?.id
                            }
                        },
                        event:{
                            connect:{
                                id:event.id
                            }
                        }
                    }
                })
                return event;
            } catch (error) {
                if(error){
                    throw new Error
                }
            }
            
        }
    ),
})
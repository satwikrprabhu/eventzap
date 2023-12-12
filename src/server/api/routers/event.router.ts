import {z} from 'zod'
import { createTRPCRouter,protectedProcedure } from '../trpc'
export const eventRouter = createTRPCRouter({
    createEvent: protectedProcedure
    .input(
        z.object({
            name:z.string(),
            description:z.string(),
            posterUrl:z.string(),
            eventDate:z.date(),
            location:z.string(),
            time:z.string(),
            fees:z.number(),
            eventType:z.enum(["Solo","Team"]),
            offorOn: z.enum(["Offline","Online"]),
            minTeamSize:z.number(),
            maxTeamSize:z.number(),
            category:z.enum(["Technical","Cultural","Workshop","Sports"])
        })
    )
    .mutation(async ({ctx,input})=>{
            try {
               const eventcreate = await ctx.prisma.event.create({
                    data: {
                      ...input,
                      Organiser:{
                        connect:{
                           userId:ctx.session.user.id
                        }
                      }
                    },
                });
                console.log(ctx.session.user.id,eventcreate.id)
                console.log(eventcreate)
                return eventcreate;
            } catch (error) {
                if(error){
                    throw new Error
                }
            }
            
        }
    ),
    getUnpublishedEvents: protectedProcedure.query(async ({ctx})=>{
        if(ctx.session?.user.role=="ADMIN"){
        return await ctx.prisma.event.findMany({
            where:{
               released:false
            },
        })
    }
    else{
        throw new Error("You are not an Admin")
    }
    }),
    publishEvent: protectedProcedure
    .input(
        z.object({
            id:z.string()
        })
    )
    .mutation(async ({ctx,input})=>{
        if(ctx.session.user.role=="ADMIN"){
        return await ctx.prisma.event.update({
            where:{
                id:input.id
            },
            data:{
                released:true
            }
        })
    }
    else{
        throw new Error("You are not an admin")
    }
    })
    ,
    getPublishedEvents: protectedProcedure.query(async ({ctx})=>{
        return await ctx.prisma.event.findMany({
            where:{
               released:true
            },
            select:{
                name:true,
                description:true,
                posterUrl:true,
                eventDate:true,
                location:true,
                fees:true,
                eventType:true,
                time:true,
                offorOn:true,
                minTeamSize:true,
                maxTeamSize:true,
                category:true,
                Organiser:true,
            }
        })
    }),
    getEventById: protectedProcedure
    .input(
        z.object({
            id:z.string()
        })
    )
    .query(async ({ctx,input})=>{
        return await ctx.prisma.event.findUnique({
            where:{
                id:input.id
            }
        })
    }),
    getEventByOrganiser:protectedProcedure
    .query(async ({ctx})=>{
        return await ctx.prisma.organiser.findMany({
            where:{
                userId:ctx.session.user?.id
            },
            include:{
                event:true
            }
        })
    }),
    getAllEvents: protectedProcedure.query(async ({ctx})=>{
        return await ctx.prisma.event.findMany()
    }),
    unpublishAnEvent: protectedProcedure
    .input(
        z.object({
            id:z.string()
        })
    )
    .mutation(async ({ctx,input})=>{
        if(ctx.session.user.role=="ADMIN"){
        return await ctx.prisma.event.update({
            where:{
                id:input.id
            },
            data:{
                released:false
            }
        })
    }
    else{
        throw new Error("You are not an admin")
    }
    }),
    publishAnEvent: protectedProcedure
    .input(
        z.object({
            id:z.string()
        })
    )
    .mutation(async ({ctx,input})=>{
        if(ctx.session.user.role=="ADMIN"){
        return await ctx.prisma.event.update({
            where:{
                id:input.id
            },
            data:{
                released:true
            }
        })
    }
    else{
        throw new Error("You are not an admin")
    }
    }),

    registerForEvent: protectedProcedure
    .input(
        z.object({
            eventId:z.string(),
            teamId:z.string()
        })
    )
    .mutation(async ({ctx,input})=>{
        return await ctx.prisma.event.update({
            where:{
                id:input.eventId
            },
            data:{
              team:{
                    connect:{
                        id:input.teamId
                    }
              }
            }
        })
    }),

})
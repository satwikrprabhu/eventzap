import {EnumValues, z} from "zod";
import { createTRPCRouter,publicProcedure, protectedProcedure } from "../trpc";
import { Branch } from "@prisma/client";
export const userRouter = createTRPCRouter({
    editProfile: protectedProcedure
    .input(
        z.object({
            name:z.string().nullish(),
            phone:z.string().nullish(),
            branch:z.enum((Object.values(Branch) as any)),
            year:z.number().nullish(),
        })
    )
    .mutation(async ({ctx,input})=>{
        return ctx.prisma.user.update({
            where:{
                id:ctx.session.user.id
            },
            data:{
                name:input.name,
                branch:input.branch,
                phone:input.phone,
                year:input.year,
            }
        })
    }),
    getProfile: protectedProcedure.query(({ctx})=>{
        return ctx.prisma.user.findUnique({
            where:{
                id:ctx.session.user.id
            }
        })
        })
})
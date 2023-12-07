import { z} from "zod";
import { createTRPCRouter,publicProcedure, protectedProcedure } from "../trpc";
import { Branch } from "@prisma/client";
export const userRouter = createTRPCRouter({
    editProfile: protectedProcedure
    .input(
        z.object({
            name:z.string().optional(),
            phone:z.string().nullish(),
            branch:z.enum((Object.values(Branch) as any)),
            year:z.number()
        })
    )
    .mutation(async ({ctx,input})=>{
        return ctx.prisma.user.update({
            where:{
                email:ctx?.session?.user?.email || "",
            },
            data:{
                name:input.name,
                branch:input.branch,
                phone:input.phone,
                year:input.year,
                isProfileComplete:true
            }
        })
    }),
    getProfile: protectedProcedure.query(async ({ctx})=>{
        return await ctx.prisma.user.findUnique({
            where: {
                email: ctx?.session?.user?.email!,
            },
            select:{
                id:true,
                name:true,
                email:true,
                branch:true,
                phone:true,
                year:true,
                createdAt:true,
                updatedAt:true,
            }
        })
        })
})
import { z} from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { Branch } from "@prisma/client";
export const userRouter = createTRPCRouter({
    editProfile: protectedProcedure
    .input(
        z.object({
            name:z.string(),
            phone:z.string(),
            branch:z.enum(["CSE","ISE","AIML","AIDS","RAI","ECE","CYBER","FULLSTACK","CCE","EEE","MECH","CIVIL","MCA"]),
            year:z.number()
        })
    )
    .mutation(async ({ctx,input})=>{
        return ctx.prisma.user.update({
            where:{
                email:ctx?.session?.user?.email ?? "",
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
                id:ctx.session.user.id
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
        }),

    getAllUsers: protectedProcedure.query(async ({ctx})=>{
        if(ctx.session?.user.role=="ADMIN"){
        return await ctx.prisma.user.findMany();
    }
    else{
        throw new Error("You are not an Admin")
    }
    }),
})
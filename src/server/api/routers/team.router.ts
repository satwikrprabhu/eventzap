import {z} from 'zod'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'

const userExistsInOtherTeam = async (ctx:any)=>{
  const teams = await ctx.prisma.team.findMany({
    where:{
      members:{
        some:{
          id:ctx?.session?.user?.id
        }
      }
    }
  })
  return teams.length > 0;
}

  
  export const teamRouter = createTRPCRouter({
    createteam: protectedProcedure
      .input(z.object({
        name: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (! await userExistsInOtherTeam(ctx)) {
          return await ctx.prisma.team.create({
            data: {
              name: input.name,
              members:{
                connect:{
                    id:ctx.session.user.id
                } 
              }
            },
          });
        }
        else{
          throw new Error('User already exists in another team');
        }
      }),

      getTeamCode: protectedProcedure
      .query(async ({ctx})=>{
        const tcode = await ctx.prisma.user.findUnique({
          where:{
            id:ctx.session.user.id
          },
          select:{
            teamId:true
          }
        })
        return tcode;
        }),

        joinTeam : protectedProcedure
        .input(z.object({
          code:z.string()
        }))
        .mutation(async({ctx,input})=>{
          if(await userExistsInOtherTeam(ctx)){
            throw new Error('User already exists in another team');
          }
          else
          return await ctx.prisma.team.update({
            where:{
              id:input.code
            },
            data:{
              members:{
                connect:{
                  id:ctx?.session?.user?.id
                }
              }
            },
          })
        }),
        getTeamName:protectedProcedure
        .query(async({ctx})=>{
          const team = await ctx.prisma.team.findMany({
            where:{
              members:{
                some:{
                  id:ctx.session.user.id
                }
              }
            },
            select:{
              name:true
            }
          })
          return team?.[0]?.name;
        }
        ),
        leaveTeam:protectedProcedure
        .mutation(async({ctx})=>{
          const teamCode = await ctx.prisma.user.findUnique({
            where:{
              id:ctx.session.user.id
            },
            select:{
              teamId:true
            }
          })
          return await ctx.prisma.team.update({
            where:{
              id:teamCode?.teamId || ""
            },
            data:{
              members:{
                disconnect:{
                  id:ctx.session.user.id
                },
                
              }
            },
            
          })
        }),
        
        userExistsInTeam:protectedProcedure
        .query(async({ctx})=>{
          return await userExistsInOtherTeam(ctx);
        }),

        getTeamId:protectedProcedure
        .query(async({ctx})=>{
          const teamCode = await ctx.prisma.user.findUnique({
            where:{
              id:ctx.session.user.id
            },
            select:{
              teamId:true
            }
          })
          return teamCode?.teamId;
        }),

    }
  );
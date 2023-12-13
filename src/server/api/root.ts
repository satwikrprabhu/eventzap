import { userRouter } from "~/server/api/routers/user.router";
import { createTRPCRouter } from "~/server/api/trpc";
import { eventRouter } from "./routers/event.router";
import { teamRouter } from "./routers/team.router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  event:eventRouter,
  team:teamRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

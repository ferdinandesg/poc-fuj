import { router } from "../trpc"
import { promotionsRouter } from "./promotions.router";
import { usersRouter } from "./users.router";

export const appRouter = router({
  users: usersRouter,
  promotions: promotionsRouter
})

export type AppRouter = typeof appRouter


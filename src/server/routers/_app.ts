import { router } from "../trpc"
import { paymentRouter } from "./payment.router";
import { promotionsRouter } from "./promotions.router";
import { usersRouter } from "./users.router";

export const appRouter = router({
  users: usersRouter,
  promotions: promotionsRouter,
  payments: paymentRouter,
})

export type AppRouter = typeof appRouter


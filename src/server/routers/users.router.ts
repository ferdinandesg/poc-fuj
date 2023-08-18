import { z } from "zod";
import { procedure, router } from "../trpc";
import { prisma } from '@/server/prisma'
import { userSchema } from "../schemas/user.schema";

export const usersRouter = router({
    create: procedure.input(userSchema).mutation(async ({ input }) => {
        const inserted = await prisma?.user.create({ data: input })
        return inserted
    }),
    // authenticate: procedure.input(userSchema).mutation(async ({input}) => {
    //     const user = await prisma?.user.findFirst({ where: input })
    //     if (!user) throw "User not found"
    //     return user
    // }),
    list: procedure.query(async () => {
        const users = await prisma.user.findMany()
        return users

    })
})

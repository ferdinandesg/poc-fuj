import { procedure, router } from "../trpc";
import { prisma } from "@/server/prisma";
import { userSchema } from "../schemas/user.schema";
import { generateSMSCode } from "../utils/sms.code";
import { Twilio } from "twilio";
import { z } from "zod";
 

const client = new Twilio(process.env.TWILLIO_ID, process.env.TWILLIO_AUTH);

export const usersRouter = router({
  create: procedure.input(userSchema).mutation(async ({ input }) => {
    try {
  console.log({TWILLIO_ID: process.env.TWILLIO_ID, TWILLIO_AUTH: process.env.TWILLIO_AUTH});
  const foundUser = await prisma.user.findFirst({ where: { document: input.document } })
      let inserted;
      if (foundUser) {
        inserted = await prisma.user.update({ where: { document: input.document }, data: { ...input }, include: { promotion: true } })
      } else {
        const code = generateSMSCode();
        const promotion = await prisma.promotion.create({
          data: { sms: { code } },
        });
        inserted = await prisma.user.create({
          data: { ...input, promotionId: promotion.id }, include: { promotion: true },
        });
      }


      await client.messages.create({
        from: "+18156058261",
        to: `+55${inserted.phone}`,
        body: `Seu código de confirmação é ${inserted.promotion?.sms.code}.`,
      });
      console.log("SMS Enviado com sucesso!");
      return inserted;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }),
  getByDocument: procedure
    .input(z.object({ document: z.string() }))
    .mutation(async ({ input }) => {
      const user = await prisma?.user.findFirst({
        where: { document: input.document },
      });
      if (!user) throw "User not found";
      return user;
    }),
  auth: procedure
    .input(z.object({ document: z.string() }))
    .mutation(async ({ input }) => {
      const [user] = await prisma.user.findMany({
        where: {
          document: input.document,
        },
        select: { promotion: true, document: true, name: true },
      });
      if (!user) throw "Usuário não encontrado";
      return user;
    }),
  fastRegister: procedure.input(userSchema).mutation(async ({ input }) => {
    const code = generateSMSCode();
    const promotion = await prisma.promotion.create({
      data: { sms: { code }, palm: true },
    });
    const inserted = await prisma.user.updateMany({
      where: { document: input.document },
      data: { ...input, promotionId: promotion.id },
    });
    return inserted;
  }),
});

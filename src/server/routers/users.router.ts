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
      const code = generateSMSCode();
      const promotion = await prisma.promotion.create({
        data: { sms: { code } },
      });
      const inserted = await prisma.user.create({
        data: { ...input, promotionId: promotion.id },
      });
      await client.messages.create({
        from: "+18156058261",
        to: `+55${inserted.phone}`,
        body: `Seu código de confirmação é ${code}.`,
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
      data: { sms: { code } },
    });
    const inserted = await prisma.user.create({
      data: { ...input, promotionId: promotion.id },
    });
    await client.messages.create({
      from: "+18156058261",
      to: `+55${inserted.phone}`,
      body: `Seu código de confirmação é ${code}.`,
    });
    console.log("SMS Enviado com sucesso!");
    return inserted;
  }),
});

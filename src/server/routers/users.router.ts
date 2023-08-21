import { procedure, router } from "../trpc";
import { prisma } from "@/server/prisma";
import { userSchema } from "../schemas/user.schema";
import { generateSMSCode } from "../utils/sms.code";
import { Twilio } from "twilio";
import { z } from "zod";

console.log({ id: process.env.TWILLIO_ID, auth: process.env.TWILLIO_AUTH });
const client = new Twilio(
  "AC9a4c0a9a02687fc7268278ac917f5763",
  "4d13b583a6eb882f9e744e17b7e671fa"
);

export const usersRouter = router({
  create: procedure.input(userSchema).mutation(async ({ input }) => {
    const code = generateSMSCode();
    const promotion = await prisma.promotion.create({
      data: { sms: { code } },
    });
    const inserted = await prisma.user.create({
      data: { ...input, promotionId: promotion.id },
    });
    client.messages
      .create({
        from: "+18156058261",
        to: `+55${inserted.phone}`,
        body: `Seu código de confirmação é ${code}.`,
      })
      .then((_) => console.log("SMS Enviado com sucesso!"))
      .catch((er) =>
        console.error("Erro ao enviar sms\n", JSON.stringify(er, null, 4))
      );
    return inserted;
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
    client.messages
      .create({
        from: "+18156058261",
        to: `+55${inserted.phone}`,
        body: `Seu código de confirmação é ${code}.`,
      })
      .then((_) => console.log("SMS Enviado com sucesso!"))
      .catch((er) =>
        console.error("Erro ao enviar sms\n", JSON.stringify(er, null, 4))
      );
    return inserted;
  }),
});

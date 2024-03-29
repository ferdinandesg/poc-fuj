import { prisma } from "./../prisma";
import { z } from "zod";
import { procedure, router } from "../trpc";
import { upsertCustomer } from "../axios";

export const promotionsRouter = router({
  validatePhone: procedure
    .input(
      z.object({ code: z.string(), phone: z.string(), document: z.string() })
    )
    .mutation(async ({ input }) => {
      const { code, document, phone } = input;
      const user = await prisma.user.findFirst({
        where: {
          document,
          phone,
        },
        include: { promotion: true },
      });
      if (!user) throw "Usuário não encontrado, contate o administrador";
      const updated = await prisma.promotion.update({
        where: { id: user.promotion?.id },
        data: { sms: { code, isVerified: true } },
      });
      if (!updated) throw "Código inválido";
      return { ok: true };
    }),
  validateCard: procedure
    .input(z.object({ cardToken: z.string(), document: z.string() }))
    .mutation(async ({ input }) => {
      const { cardToken, document } = input;
      const user = await prisma.user.upsert({
        where: {
          document,
        },
        update: { cardToken },
        create: {
          document,
          cardToken,
        },
      });
      await upsertCustomer({ cardToken, document })
      return { ok: true };
    }),
  validateBio: procedure
    .input(z.object({ document: z.string() }))
    .mutation(async ({ input }) => {
      const { document } = input;
      const user = await prisma.user.findFirst({
        where: {
          document,
        },
      });
      if (!user) throw "Usuário não encontrado";
      if (user.promotionId)
        await prisma.promotion.update({
          where: { id: user?.promotionId },
          data: { palm: true },
        });
      return user;
    }),
  validatePalm: procedure
    .input(z.object({ document: z.string() }))
    .mutation(async ({ input }) => {
      const { document } = input;
      let user = await prisma.user.findFirst({
        where: {
          document,
        },
      });
      if (!user) {
        user = await prisma.user.create({
          data: {
            document,
          },
        });
      };
      if (user.promotionId)
        await prisma.promotion.update({
          where: { id: user?.promotionId },
          data: { palm: true },
        });
      return user;
    }),
});

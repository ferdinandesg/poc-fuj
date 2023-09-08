import { prisma } from "./../prisma";
import { z } from "zod";
import { procedure, router } from "../trpc";

export const paymentRouter = router({
  payment: procedure
    .input(z.object({ document: z.string() }))
    .mutation(async ({ input }) => {
      const { document } = input;
      console.log("DOCUMENT", document);

      const user = await prisma.user.findFirst({
        where: {
          document,
        },
      });
      if (!user) throw "Usuário não encontrado";
      const response = await fetch(
        `${process.env.PMS_URL}/payment/${user.cardToken}`,
        { method: "POST" }
      );
      const json = await response.json();
      console.log({ json });

      return { ok: true };
    }),
});

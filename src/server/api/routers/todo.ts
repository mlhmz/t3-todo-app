import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { todos } from "~/server/db/schema";

export const todoRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ title: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(todos).values({
        title: input.title,
      });
    }),
});

import { z } from "zod";
import { todos, todosSchema } from "~/server/db/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { eq } from "drizzle-orm";

export const todoRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ title: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(todos).values({
        title: input.title,
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.todos.findMany();
  }),

  update: publicProcedure
    .input(todosSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(todos)
        .set(input)
        .where(eq(todos.id, input.id ?? 0));
    }),
});

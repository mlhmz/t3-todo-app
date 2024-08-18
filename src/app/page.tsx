import { HydrateClient } from "~/trpc/server";
import { Todos } from "./_components/todos";

export default async function Home() {
  return (
    <HydrateClient>
      <main>
        <div className="my-5 flex flex-col items-center gap-3">
          <h1 className="text-3xl">Todo App</h1>
          <Todos />
        </div>
      </main>
    </HydrateClient>
  );
}

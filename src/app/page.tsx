import { HydrateClient } from "~/trpc/server";
import { Todos } from "./_components/todos";

export default async function Home() {
  return (
    <HydrateClient>
      <main>
        <Todos />
      </main>
    </HydrateClient>
  );
}

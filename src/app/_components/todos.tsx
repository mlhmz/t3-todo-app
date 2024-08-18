import { api } from "~/trpc/react";

export const Todos = () => {
  const utils = api.useUtils();
  const { mutate } = api.todo.create.useMutation({
    onSuccess: async () => {
      await utils.todo.invalidate();
    },
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          mutate({ title: (formData.get("title") as string) ?? "" });
        }}
      >
        <input name="title"></input>
        <button>Submit</button>
      </form>
    </div>
  );
};

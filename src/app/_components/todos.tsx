"use client";

import { useState } from "react";
import { RouterInputs, api } from "~/trpc/react";

type UpdateTodo = RouterInputs["todo"]["update"];

export const Todos = () => {
  const utils = api.useUtils();
  const [title, setTitle] = useState("");
  const { mutate: createTodo } = api.todo.create.useMutation({
    onSuccess: async () => {
      await utils.todo.invalidate();
      alert(`${title} was successfully created!`);
      setTitle("");
    },
  });
  const { mutate: updateTodo } = api.todo.update.useMutation({
    onSuccess: async () => {
      await utils.todo.invalidate();
    },
  });
  const { data } = api.todo.getAll.useQuery();

  const toggleTodoFinish = (todo: UpdateTodo) => {
    todo.doneAt = !todo.doneAt ? new Date() : undefined;
    updateTodo(todo);
  };

  return (
    <div className="flex w-[90vw] flex-col items-center md:w-[40vw]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createTodo({ title: title });
        }}
        className="flex gap-3"
      >
        <input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          className="rounded-md border border-gray-200 p-1 shadow"
          placeholder="Type something..."
        ></input>
      </form>
      <div className="my-5 flex w-full flex-col gap-3">
        {data
          ?.sort((entry) => (!entry.doneAt ? -1 : 1))
          .map((entry) => (
            <div
              className={`flex items-center justify-between rounded-md border p-2 shadow hover:cursor-pointer hover:line-through`}
              key={entry.id}
              onClick={() => toggleTodoFinish(entry)}
            >
              <p className={`${!!entry.doneAt && "line-through"}`}>
                {entry.title}
              </p>
              <p className="text-xs text-gray-500">
                {entry.doneAt?.toLocaleString("DE")}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

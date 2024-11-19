import { AppearAnimation } from "@/lib/animations/AppearAnimation";
import { Filters } from "../Filters";
import { AddNewTaskBtn } from "../AddNewTaskBtn";
import { PendingTasks } from "../PendingTasks";
import { getTasks } from "@/lib/helpers/getTasks";

export default async function PendingPage() {
  const tasks = await getTasks();

  return (
    <main className="m-6 h-full">
      <section className="flex flex-col justify-between md:flex-row">
        <h1 className="text-2xl font-bold">Pending Tasks</h1>
        <Filters />
      </section>
      <AppearAnimation>
        <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem] pb-[2rem]">
          <PendingTasks tasks={tasks.tasks} />
          <AddNewTaskBtn />
        </div>
      </AppearAnimation>
    </main>
  );
}

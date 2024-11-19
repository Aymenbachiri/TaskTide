import { AppearAnimation } from "@/lib/animations/AppearAnimation";
import { Filters } from "../Filters";
import { AddNewTaskBtn } from "../AddNewTaskBtn";
import { PendingTasks } from "../PendingTasks";

export default function PendingPage() {
  return (
    <main className="m-6 h-full">
      <section className="flex justify-between">
        <h1 className="text-2xl font-bold">Pending Tasks</h1>
        <Filters />
      </section>
      <AppearAnimation>
        <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem] pb-[2rem]">
          <PendingTasks />
          <AddNewTaskBtn />
        </div>
      </AppearAnimation>
    </main>
  );
}

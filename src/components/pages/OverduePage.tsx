import { AppearAnimation } from "@/lib/animations/AppearAnimation";
import { AddNewTaskBtn } from "../AddNewTaskBtn";
import { Filters } from "../Filters";
import { OverdueTasks } from "../OverdueTasks";

export default function OverduePage() {
  return (
    <main className="m-6 h-full">
      <section className="flex flex-col justify-between md:flex-row">
        <h1 className="text-2xl font-bold">Overdue Tasks</h1>
        <Filters />
      </section>
      <AppearAnimation>
        <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem] pb-[2rem]">
          <OverdueTasks />
          <AddNewTaskBtn />
        </div>
      </AppearAnimation>
    </main>
  );
}

import { MySuspense } from "@/lib/utils/MySuspense";
import { Filters } from "../Filters";
import { Tasks } from "../Tasks";
import { AddNewTaskBtn } from "../AddNewTaskBtn";

export default function HomePage() {
  return (
    <main className="m-6 h-full">
      <section className="flex flex-col justify-between md:flex-row">
        <h1 className="text-2xl font-bold">All Tasks</h1>
        <Filters />
      </section>
      <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem] pb-[2rem]">
        <MySuspense fallback={<div>Loading...</div>}>
          <Tasks />
        </MySuspense>
        <AddNewTaskBtn />
      </div>
    </main>
  );
}

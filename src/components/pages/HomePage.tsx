import { MySuspense } from "@/lib/utils/MySuspense";
import { Filters } from "../Filters";
import { Tasks } from "../Tasks";

export default function HomePage() {
  return (
    <main className="m-6 h-full">
      <section className="flex justify-between">
        <h1 className="text-2xl font-bold">All Tasks</h1>
        <Filters />
      </section>
      <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem] pb-[2rem]">
        <MySuspense fallback={<div>Loading...</div>}>
          <Tasks />
        </MySuspense>
        <button className="h-[16rem] w-full rounded-md border-2 border-dashed border-gray-400 py-2 text-lg font-medium text-gray-500 transition duration-200 ease-in-out hover:border-none hover:bg-gray-300">
          Add New Task
        </button>
      </div>
    </main>
  );
}

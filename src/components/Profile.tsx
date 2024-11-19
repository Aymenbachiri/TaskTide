/* eslint-disable @next/next/no-img-element */
import { getTasks } from "@/lib/helpers/getTasks";
import { UserName } from "./UserName";
import type { Task } from "@/lib/types/types";

export async function Profile() {
  const tasks = await getTasks();
  const totalTasks = tasks.length;
  const activeTasks = tasks.tasks.filter(
    (task: Task) => !task.completed,
  ).length;
  const completedTasks = tasks.tasks.filter(
    (task: Task) => task.completed,
  ).length;

  return (
    <main className="m-6">
      <div className="flex cursor-pointer items-center gap-3 rounded-[0.8rem] border-2 border-transparent bg-[#E6E6E6]/20 px-2 py-4 transition duration-300 ease-in-out hover:border-2 hover:border-white hover:bg-[#E6E6E6]/50">
        <section>
          <img
            src="https://img.favpng.com/17/3/18/computer-icons-user-profile-male-png-favpng-ZmC9dDrp9x27KFnnge0jKWKBs.jpg"
            alt="profile"
            className="h-12 w-12 rounded-full"
          />
        </section>
        <section>
          <h1 className="flex items-center text-xl">
            <span className="font-medium">Hello, </span>
            <UserName />
          </h1>
        </section>
      </div>

      <div className="mt-6 flex flex-col gap-8 dark:text-white">
        <div className="grid grid-cols-2 gap-4">
          <section className="text-gray-400 dark:text-white">
            <p>Total Tasks:</p>
            <p className="relative flex gap-2 pl-4">
              <span className="absolute left-[1px] top-1/2 h-[70%] w-[0.2rem] translate-y-[-50%] rounded-[5px] bg-purple-500"></span>
              <span className="text-4xl font-medium text-[#333] dark:text-white">
                {totalTasks}
              </span>
            </p>
          </section>
          <section className="text-gray-400 dark:text-white">
            <p>In Progress:</p>
            <p className="relative flex gap-2 pl-4">
              <span className="absolute left-[1px] top-1/2 h-[70%] w-[0.2rem] translate-y-[-50%] rounded-[5px] bg-[#3AAFAE]"></span>
              <span className="text-4xl font-medium text-[#333] dark:text-white">
                {activeTasks}
              </span>
            </p>
          </section>
          <section className="text-gray-400 dark:text-white">
            <p>Open Tasks:</p>
            <p className="relative flex gap-2 pl-4">
              <span className="absolute left-[1px] top-1/2 h-[70%] w-[0.2rem] translate-y-[-50%] rounded-[5px] bg-orange-400"></span>
              <span className="text-4xl font-medium text-[#333] dark:text-white">
                {activeTasks}
              </span>
            </p>
          </section>
          <section className="text-gray-400 dark:text-white">
            <p>Completed:</p>
            <p className="relative flex gap-2 pl-4">
              <span className="absolute left-[1px] top-1/2 h-[70%] w-[0.2rem] translate-y-[-50%] rounded-[5px] bg-green-400"></span>
              <span className="text-4xl font-medium text-[#333] dark:text-white">
                {completedTasks}
              </span>
            </p>
          </section>
        </div>
      </div>
      <h3 className="mt-8 font-medium">Activity</h3>
    </main>
  );
}

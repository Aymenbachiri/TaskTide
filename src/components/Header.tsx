import ThemeSwitch from "./ThemeSwitch";
import { CreateNewTask } from "./CreateNewTask";
import { MobileSidebar } from "./MobileSidebar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { MobileProfileSidebar } from "./MobileProfileSidebar";
import { getTasks } from "@/lib/helpers/getTasks";
import type { Task } from "@/lib/types/types";
import { MyImage } from "./common/MyImage";
import img from "/public/assets/images/logo.webp";

export async function Header() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const tasks = await getTasks();
  const activeTasks = tasks.tasks.filter((task: Task) => !task.completed);

  return (
    <header className="my-4 flex w-full flex-col gap-4 px-4 md:flex-row md:items-center md:justify-between md:px-6">
      <div className="flex items-center justify-between">
        <section className="hidden md:block">
          <h1 className="text-lg font-medium">
            <span role="img" aria-label="wave">
              👋
            </span>
            {user
              ? `welcome ${user?.given_name} to TaskTide`
              : "Welcome to TaskTide"}
          </h1>
          <p>
            {user ? (
              <>
                you have{" "}
                <span className="font-bold text-[#3aafae]">
                  {activeTasks.length}
                </span>{" "}
                active tasks
              </>
            ) : (
              "Please sign in to view your first task"
            )}
          </p>
        </section>
      </div>
      <div className="flex md:hidden">
        <MyImage
          src={img}
          alt="logo"
          width={100}
          height={100}
          style={{ borderRadius: 50 }}
          placeholder="blur"
        />
      </div>

      <section className="flex flex-col gap-4 md:flex-row md:items-center md:gap-[10.4rem]">
        <div className="flex items-center justify-between gap-3">
          <ThemeSwitch />
          <CreateNewTask />
        </div>

        <MobileProfileSidebar />
        <MobileSidebar />
      </section>
    </header>
  );
}

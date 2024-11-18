import { IconCheck } from "@/lib/icons/IconCheck";
import { MyLink } from "./common/MyLink";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function Header() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <header className="my-4 flex w-full items-center justify-between bg-[#f9f9f9] px-6">
      <section>
        <h1 className="text-lg font-medium">
          <span role="img" aria-label="wave">
            👋
          </span>
          {user
            ? `welcome ${user?.given_name} to FirstTask`
            : "Welcome to FirstTask"}
        </h1>
        <p>
          {user ? (
            <>
              you have <span className="font-bold text-[#3aafae]">5</span>{" "}
              active tasks
            </>
          ) : (
            "Please sign in to view your first task"
          )}
        </p>
      </section>
      <section className="flex h-[50px] items-center gap-[10.4rem]">
        <button className="rounded-[50px] bg-[#3aafae] px-8 py-3 text-white transition-all duration-200 ease-in-out hover:bg-[#00A1F1] hover:text-white">
          Create a new task
        </button>
        <nav className="flex items-center gap-4">
          <MyLink
            href="/"
            passHref
            target="_blank"
            rel="noreferrer"
            className="flex h-[40px] w-[40px] items-center justify-center rounded-full text-purple-500 transition-all duration-200 ease-in-out hover:bg-[#3aafae] hover:text-white"
          >
            <IconCheck />
          </MyLink>
          <MyLink
            href="/"
            passHref
            target="_blank"
            rel="noreferrer"
            className="flex h-[40px] w-[40px] items-center justify-center rounded-full text-purple-500 transition-all duration-200 ease-in-out hover:bg-[#3aafae] hover:text-white"
          >
            <IconCheck />
          </MyLink>
          <MyLink
            href="/"
            passHref
            target="_blank"
            rel="noreferrer"
            className="flex h-[40px] w-[40px] items-center justify-center rounded-full text-purple-500 transition-all duration-200 ease-in-out hover:bg-[#3aafae] hover:text-white"
          >
            <IconCheck />
          </MyLink>
        </nav>
      </section>
    </header>
  );
}

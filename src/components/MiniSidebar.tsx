import { IconGrid } from "@/lib/icons/IconGrid";
import { MyLink } from "./common/MyLink";
import { IconFileCheck } from "@/lib/icons/IconFileCheck";
import { IconCheck } from "@/lib/icons/IconCheck";
import { IconStopwatch } from "@/lib/icons/IconStopwatch";
import { IconDeleteAll } from "@/lib/icons/IconDeleteAll";

export function MiniSidebar() {
  const navItems = [
    {
      icon: <IconGrid />,
      title: "All",
      link: "/",
    },
    {
      icon: <IconFileCheck />,
      title: "Completed",
      link: "/completed",
    },
    {
      icon: <IconCheck />,
      title: "Pending",
      link: "/pending",
    },
    {
      icon: <IconStopwatch />,
      title: "Overdue",
      link: "/overdue",
    },
  ];

  return (
    <main className="flex h-full w-full basis-[5rem] flex-col bg-[#f9f9f9]">
      <span className="flex h-[5rem] items-center justify-center">Logo</span>
      <div className="mt-8 flex flex-1 flex-col items-center justify-between">
        <ul className="flex flex-col gap-10">
          {navItems.map((item, index) => (
            <li key={index} className="group relative">
              <MyLink href={item.link}>{item.icon}</MyLink>
              <span className="u-triangle dark:bg-2 pointer-events-none absolute left-8 top-[50%] translate-y-[-50%] rounded-md bg-[#3aafae] px-2 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
                {item.title}
              </span>
            </li>
          ))}
        </ul>
        <section className="mb-[1.5rem]">
          <button className="flex h-12 w-12 items-center justify-center rounded-full border-2">
            <IconDeleteAll />
          </button>
        </section>
      </div>
    </main>
  );
}

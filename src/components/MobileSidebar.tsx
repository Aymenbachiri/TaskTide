import { IconGrid } from "@/lib/icons/IconGrid";
import { IconFileCheck } from "@/lib/icons/IconFileCheck";
import { IconCheck } from "@/lib/icons/IconCheck";
import { IconStopwatch } from "@/lib/icons/IconStopwatch";
import { MyLink } from "./common/MyLink";

export function MobileSidebar() {
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
    <main className="flex h-full flex-col p-4 md:hidden">
      <nav className="mt-8 grid grid-cols-2 gap-4">
        {navItems.map((item, index) => (
          <MyLink
            key={index}
            href={item.link}
            className="flex items-center gap-4 rounded-lg p-3 hover:bg-[#3aafae]/10"
          >
            {item.icon}
            <span>{item.title}</span>
          </MyLink>
        ))}
      </nav>
    </main>
  );
}

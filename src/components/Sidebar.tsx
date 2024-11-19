import { Profile } from "./Profile";
import { RadialChart } from "./RadialChart";
import { SignOutBtn } from "./SignOutBtn";

export async function Sidebar() {
  return (
    <div className="fixed right-0 top-0 mt-[5rem] flex h-[calc(100%-5rem)] w-[20rem] flex-col bg-[#f9f9f9] dark:bg-[#1A1A1A]">
      <Profile />
      <div className="mx-6 mt-4">
        <RadialChart />
      </div>

      <SignOutBtn />
    </div>
  );
}

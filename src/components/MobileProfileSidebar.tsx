import { Profile } from "./Profile";
import { RadialChart } from "./RadialChart";
import { SignOutBtn } from "./SignOutBtn";

export function MobileProfileSidebar() {
  return (
    <div className="block md:hidden">
      <Profile />
      <div className="mx-6 mt-4">
        <RadialChart />
      </div>

      <SignOutBtn />
    </div>
  );
}

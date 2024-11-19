import { Sidebar } from "./Sidebar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function SidebarProvider() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (user) return <Sidebar />;
  if (!user) return <div>You must sign in to see this content</div>;

  return <div>You must sign in to see this content</div>;
}

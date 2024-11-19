import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function UserName() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const name = user?.given_name;
  return <span className="font-bold">{name}</span>;
}

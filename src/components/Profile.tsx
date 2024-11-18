/* eslint-disable @next/next/no-img-element */
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ProfileHolder } from "./ProfileHolder";

export async function Profile() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <main className="m-6">
      <ProfileHolder>
        <section>
          <img
            src="https://img.favpng.com/17/3/18/computer-icons-user-profile-male-png-favpng-ZmC9dDrp9x27KFnnge0jKWKBs.jpg"
            alt="profile"
            className="h-12 w-12 rounded-full"
          />
        </section>
        <section>
          <h1 className="flex flex-col text-xl">
            <span className="font-medium">Hello,</span>
            <span className="font-bold">{user?.given_name}</span>
          </h1>
        </section>
      </ProfileHolder>

      <div className="mt-6 flex flex-col gap-8 dark:text-white">
        <div className="grid grid-cols-2 gap-4">
          <section className="text-gray-400 dark:text-white">
            <p>Total Tasks:</p>
            <p className="relative flex gap-2 pl-4">
              <span className="absolute left-[1px] top-1/2 h-[70%] w-[0.2rem] translate-y-[-50%] rounded-[5px] bg-purple-500"></span>
              <span className="text-4xl font-medium text-[#333] dark:text-white">
                10
              </span>
            </p>
          </section>
          <section className="text-gray-400 dark:text-white">
            <p>In Progress:</p>
            <p className="relative flex gap-2 pl-4">
              <span className="absolute left-[1px] top-1/2 h-[70%] w-[0.2rem] translate-y-[-50%] rounded-[5px] bg-[#3AAFAE]"></span>
              <span className="text-4xl font-medium text-[#333] dark:text-white">
                6
              </span>
            </p>
          </section>
          <section className="text-gray-400 dark:text-white">
            <p>Open Tasks:</p>
            <p className="relative flex gap-2 pl-4">
              <span className="absolute left-[1px] top-1/2 h-[70%] w-[0.2rem] translate-y-[-50%] rounded-[5px] bg-orange-400"></span>
              <span className="text-4xl font-medium text-[#333] dark:text-white">
                2
              </span>
            </p>
          </section>
          <section className="text-gray-400 dark:text-white">
            <p>Completed:</p>
            <p className="relative flex gap-2 pl-4">
              <span className="absolute left-[1px] top-1/2 h-[70%] w-[0.2rem] translate-y-[-50%] rounded-[5px] bg-green-400"></span>
              <span className="text-4xl font-medium text-[#333] dark:text-white">
                3
              </span>
            </p>
          </section>
        </div>
      </div>
      <h3 className="mt-8 font-medium">Activity</h3>
    </main>
  );
}

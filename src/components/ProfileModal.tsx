/* eslint-disable @next/next/no-img-element */
import { useTasks } from "@/lib/context/TaskContext";
import { useDetectOutside } from "@/lib/hooks/useDetectOutside";
import { BadgeIcon } from "@/lib/icons/BadgeIcon";
import { CheckIcon } from "@/lib/icons/CheckIcon";
import { MailIcon } from "@/lib/icons/MailIcon";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRef, useState } from "react";

export function ProfileModal() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const ref = useRef(null);
  const { closeModal } = useTasks();
  const { getUser } = useKindeBrowserClient();
  const user = getUser();
  const name = user?.given_name;
  const email = user?.email;
  const photo = user?.picture;

  useDetectOutside({
    ref,
    callback: () => {
      closeModal();
    },
  });

  const handlePassword =
    (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (type === "old") {
        setOldPassword(e.target.value);
      } else {
        setNewPassword(e.target.value);
      }
    };
  return (
    <main className="fixed left-0 top-0 z-50 h-full w-full overflow-hidden bg-[#333]/30">
      <div
        ref={ref}
        className="absolute left-1/2 top-1/2 flex w-full max-w-[520px] -translate-x-1/2 -translate-y-1/2 transform flex-col gap-3 rounded-lg border-2 border-white bg-white px-6 py-5 shadow-md dark:bg-[#0D0D0D]"
      >
        <div className="absolute left-0 top-0 h-[80px] w-full rounded-tl-md rounded-tr-md bg-[#323232]/10 dark:bg-[#0D0D0D]"></div>
        <div className="relative mt-4 flex justify-between">
          <div className="relative inline-block">
            <img
              src="https://img.favpng.com/17/3/18/computer-icons-user-profile-male-png-favpng-ZmC9dDrp9x27KFnnge0jKWKBs.jpg"
              alt="profile"
              className="h-12 w-12 rounded-full"
            />
            <section className="absolute bottom-0 right-1 shadow-sm">
              <span className="text-lg text-blue-400">
                <BadgeIcon />
              </span>
              <span className="absolute left-[50%] top-[50%] z-20 translate-x-[-50%] translate-y-[-50%] text-xs text-white">
                <CheckIcon />
              </span>
            </section>
          </div>
          <section className="flex items-center gap-2 self-end">
            <button className="flex items-center gap-2 rounded-md border-2 border-[#323232]/10 px-3 py-1 text-xs font-medium text-[#323232] dark:text-white">
              Github
            </button>
            <button className="flex items-center gap-2 rounded-md border-2 border-[#323232]/10 px-3 py-1 text-xs font-medium text-[#323232] dark:text-white">
              <CheckIcon /> Verified
            </button>
          </section>
        </div>
        <section>
          <h1 className="text-lg font-bold">{name}</h1>
          <p className="text-sm text-gray-500">{email}</p>
        </section>
        <form
          action=""
          className="mt-4 flex flex-col gap-4 border-t-2 border-t-[#323232]/10 pt-2"
          onSubmit={(e) => {
            e.preventDefault();
            updateUser(e, {
              name: userState.name,
              email: userState.email,
            });
          }}
        >
          <section className="grid grid-cols-[150px_1fr] pt-2">
            <label htmlFor="name" className="text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={name}
              onChange={(e) => handlerUserInput("name")(e)}
              className="rounded-lg border-2 border-[#323232]/10 px-3 py-[0.4rem] font-medium dark:border-white"
            />
          </section>

          <section className="grid grid-cols-[150px_1fr] border-t-2 border-t-[#323232]/10 pt-4">
            <label htmlFor="email" className="text-sm font-medium">
              Email Address
            </label>
            <div className="relative w-full">
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => handlerUserInput("email")(e)}
                className="w-full rounded-lg border-2 border-[#323232]/10 py-[0.4rem] pl-9 pr-2 font-medium dark:border-white"
              />
              <span className="absolute bottom-0 left-0 top-0 flex items-center px-3 text-[#323232]/50">
                <MailIcon />
              </span>
            </div>
          </section>
          <div className="grid grid-cols-2 gap-4 border-t-2 border-t-[#323232]/10 pt-4">
            <section className="flex flex-col gap-1">
              <label htmlFor="oldPassWord" className="text-sm font-medium">
                Old Password
              </label>
              <input
                type="password"
                id="oldPassword"
                value={oldPassword}
                onChange={handlePassword("old")}
                className="rounded-lg border-2 border-[#323232]/10 px-3 py-[0.4rem] font-medium dark:border-white"
              />
            </section>
            <section className="flex flex-col gap-1">
              <label htmlFor="newPassword" className="text-sm font-medium">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={handlePassword("new")}
                className="rounded-lg border-2 border-[#323232]/10 px-3 py-[0.4rem] font-medium dark:border-white"
              />
            </section>
          </div>
          <section className="flex justify-end">
            <button
              type="button"
              className="rounded-md bg-blue-500 px-4 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-blue-400"
              onClick={() => changePassword(oldPassword, newPassword)}
            >
              Change Password
            </button>
          </section>
          <section className="flex justify-end gap-4 border-t-2 border-t-[#323232]/10">
            <button className="mt-3 rounded-md border-2 border-[#323232]/10 bg-transparent px-4 py-2 text-sm font-medium text-black transition-all duration-300 hover:border-transparent hover:bg-[#EB4E31] hover:text-white dark:bg-gray-700 dark:text-white">
              Cancel
            </button>
            <button
              type="submit"
              className="mt-3 rounded-md bg-[#3aafae] px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-[#2e8d8c]/90"
            >
              Save Changes
            </button>
          </section>
        </form>
      </div>
    </main>
  );
}

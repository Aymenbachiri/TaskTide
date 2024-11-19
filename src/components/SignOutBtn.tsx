"use client";

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";

export function SignOutBtn() {
  return (
    <button className="mx-auto mb-6 mt-3 block rounded-[50px] bg-[#EB4E31] px-8 py-4 text-white transition duration-200 ease-in-out hover:bg-[#3aafae] md:mt-auto">
      <LogoutLink>Sign Out</LogoutLink>
    </button>
  );
}

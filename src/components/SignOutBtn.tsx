"use client";

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";

export function SignOutBtn() {
  return (
    <button className="mx-6 mb-6 mt-auto rounded-[50px] bg-[#EB4E31] px-8 py-4 text-white transition duration-200 ease-in-out hover:bg-[#3aafae]">
      <LogoutLink>Sign Out</LogoutLink>
    </button>
  );
}
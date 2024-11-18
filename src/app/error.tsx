"use client";

import { useState } from "react";
import { MyLink } from "@/components/common/MyLink";
import { MyImage } from "@/components/common/MyImage";
import img from "/public/assets/images/error-image.webp";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = () => {
    setIsLoading(true);
    reset();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4 dark:bg-black">
      <article className="w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-black">
        <div className="p-8">
          <header className="flex flex-col items-center md:flex-row">
            <figure className="mb-6 w-full md:mb-0 md:w-1/2">
              <MyImage
                src={img}
                alt="Error illustration"
                className="h-auto w-full rounded-lg"
                width={340}
                height={260}
                placeholder="blur"
                sizes="(min-width: 1120px) 480px, (min-width: 780px) 43.13vw, calc(100vw - 96px)"
                style={{ borderRadius: "1rem" }}
              />
            </figure>
            <section className="w-full md:w-1/2 md:pl-8">
              <h1 className="mb-2 text-2xl font-bold text-red-600">Oops!</h1>
              <h2 className="mb-4 text-4xl font-semibold text-gray-800 dark:text-gray-200">
                {error.message || "Something went wrong"}
              </h2>
              <p className="mb-6 text-gray-600">
                Please try again later or contact support if the problem
                persists.
              </p>
              <nav className="space-y-4">
                <button
                  onClick={handleReset}
                  disabled={isLoading}
                  className="flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition-colors duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-live="polite"
                >
                  <span>{isLoading ? "Trying again..." : "Try again"}</span>
                </button>
                <MyLink
                  href="/"
                  className="flex w-full items-center justify-center rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors duration-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <svg
                    className="mr-2 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  <span>Go back home</span>
                </MyLink>
              </nav>
            </section>
          </header>
        </div>
      </article>
    </main>
  );
}

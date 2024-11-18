import { MyLink } from "@/components/common/MyLink";

export default function Notfound() {
  return (
    <main className="flex h-screen w-screen items-center justify-center bg-gray-50 dark:bg-black">
      <div className="container flex flex-col items-center justify-between px-5 text-gray-700 md:flex-row">
        <section className="mx-8 w-full lg:w-1/2">
          <h1 className="text-1xl font-dark mb-8 text-center font-extrabold text-blue-500 md:text-start">
            404
          </h1>
          <p className="mb-8 text-2xl font-light leading-normal md:text-3xl dark:text-slate-300">
            Sorry we couldn&apos;t find the page you&apos;re looking for
          </p>
          <MyLink
            href="/"
            className="duration-400 mx-auto inline rounded-lg border border-transparent bg-blue-600 px-5 py-3 text-center text-sm font-medium leading-5 text-white shadow-2xl transition-all hover:bg-red-700 focus:outline-none active:bg-red-600 md:text-start"
          >
            back to homepage
          </MyLink>
        </section>
      </div>
    </main>
  );
}

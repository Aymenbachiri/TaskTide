function SkeletonTaskItem() {
  return (
    <div className="flex h-[16rem] animate-pulse flex-col gap-4 rounded-lg border-2 border-gray-300 bg-gray-200 p-4 shadow-sm dark:border-gray-600 dark:bg-gray-700">
      <div className="h-6 w-3/4 rounded-md bg-gray-300 dark:bg-gray-600"></div>
      <div className="h-4 w-5/6 rounded-md bg-gray-300 dark:bg-gray-600"></div>
      <div className="mt-auto flex items-center justify-between">
        <div className="h-4 w-1/3 rounded-md bg-gray-300 dark:bg-gray-600"></div>
        <div className="h-4 w-1/4 rounded-md bg-gray-300 dark:bg-gray-600"></div>
        <div className="flex items-center gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-6 w-6 rounded-full bg-gray-300 dark:bg-gray-600"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LoadingSkeleton() {
  return (
    <main className="m-6 h-full">
      <section className="flex flex-col justify-between md:flex-row">
        <h1 className="h-6 w-20 rounded-md bg-gray-300 dark:bg-gray-600"></h1>
        <div className="flex w-fit animate-pulse justify-between rounded-md bg-gray-200 p-4 dark:bg-gray-700">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-6 w-20 rounded-md bg-gray-300 dark:bg-gray-600"
            ></div>
          ))}
        </div>
      </section>

      <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem] pb-[2rem]">
        <>
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonTaskItem key={i} />
          ))}
        </>
        <div className="h-[16rem] w-full animate-pulse rounded-md border-2 border-dashed border-gray-400 bg-gray-200 p-4 dark:bg-gray-700"></div>
      </div>
    </main>
  );
}

import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

export function RadialChartSkeleton() {
  return (
    <Card className="flex animate-pulse flex-col border-2 border-white bg-[#EDEDED] shadow-none dark:bg-[#1A1A1A] dark:text-white">
      <CardHeader className="items-center pb-0">
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-300 dark:bg-gray-700" />
        <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-gray-300 dark:bg-gray-700" />
      </CardHeader>
      <CardContent className="flex flex-1 items-center justify-center pb-0">
        <div className="relative aspect-square w-[250px] max-w-full animate-pulse rounded-full bg-gray-300 dark:bg-gray-700" />
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="h-4 w-full animate-pulse rounded bg-gray-300 dark:bg-gray-700" />
        <div className="mt-2 h-3 w-3/4 animate-pulse rounded bg-gray-300 dark:bg-gray-700" />
      </CardFooter>
    </Card>
  );
}

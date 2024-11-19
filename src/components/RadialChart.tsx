"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { TrendingUp } from "@/lib/icons/TrendingUp";
import { Task } from "@/lib/types/types";
import { getTasks, getTasksResponse } from "@/lib/helpers/getTasks";
import { RadialChartSkeleton } from "./RadialChartSkeleton";

const chartConfig: ChartConfig = {
  desktop: {
    label: "Completed",
    color: "#8BCE89",
  },
  mobile: {
    label: "Pending",
    color: "#EB4E31",
  },
};

export function RadialChart() {
  const { theme } = useTheme();
  const [chartData, setChartData] = useState<{
    totalTasks: number;
    activeTasks: number;
    completedTasks: number;
  } | null>(null);

  useEffect(() => {
    async function fetchData() {
      const tasks: getTasksResponse = await getTasks();
      const totalTasks = tasks.length;
      const activeTasks = tasks.tasks.filter(
        (task: Task) => !task.completed,
      ).length;
      const completedTasks = tasks.tasks.filter(
        (task: Task) => task.completed,
      ).length;
      setChartData({ totalTasks, activeTasks, completedTasks });
    }

    fetchData();
  }, []);

  if (!chartData) {
    return <RadialChartSkeleton />;
  }

  const { totalTasks, activeTasks, completedTasks } = chartData;

  return (
    <Card className="flex flex-col border-2 border-white bg-[#EDEDED] shadow-none dark:bg-[#1A1A1A] dark:text-white">
      <CardHeader className="items-center pb-0">
        <CardTitle>Completed vs Pending Tasks</CardTitle>
        <CardDescription>Task completion status.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px] dark:bg-[#1A1A1A]"
        >
          <RadialBarChart
            data={[{ pending: activeTasks, completed: completedTasks }]}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
            style={{ backgroundColor: "transparent" }}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        fill={theme === "dark" ? "white" : "black"}
                        textAnchor="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className={`fill-foreground text-2xl font-bold`}
                        >
                          {totalTasks}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className={`fill-muted-foreground`}
                        >
                          Tasks
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="completed"
              stackId="a"
              cornerRadius={5}
              fill={chartConfig.desktop.color}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="pending"
              fill={chartConfig.mobile.color}
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Task completion improved by 12% this month <TrendingUp />
        </div>
        <div className="text-muted-foreground leading-none">
          Analysis based on tasks completed in the last 30 days.
        </div>
      </CardFooter>
    </Card>
  );
}

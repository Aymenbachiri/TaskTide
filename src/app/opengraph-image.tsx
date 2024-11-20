import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "TaskTide Home - Task Management";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: "#00A1E4",
          color: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
        }}
      >
        TaskTide - Manage Your Tasks Efficiently
      </div>
    ),
    {
      ...size,
    },
  );
}

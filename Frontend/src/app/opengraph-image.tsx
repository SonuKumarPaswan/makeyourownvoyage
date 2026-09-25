import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Make Your Own Voyage";
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
          background: "linear-gradient(to right, #0f172a, #1e293b)",
          color: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ fontSize: 60, fontWeight: "bold", marginBottom: 20 }}>
          Make Your Own Voyage
        </div>
        <div style={{ fontSize: 24, color: "#94a3b8" }}>
          Flights, Hotels & Holiday Packages
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

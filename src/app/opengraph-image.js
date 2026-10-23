import { ImageResponse } from "next/og";

// Required for `output: "export"`.
export const dynamic = "force-static";

export const alt = "Growthys — Build Digital Experiences. Accelerate Growth.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "radial-gradient(circle at 85% 10%, #22357a 0%, #080B12 55%)",
        color: "#F7F8FC",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>
        Growth<span style={{ color: "#57E6D2" }}>ys</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 76,
          fontWeight: 700,
          lineHeight: 1.05,
          letterSpacing: -3,
        }}
      >
        <span>Build Digital Experiences.</span>
        <span style={{ display: "flex" }}>
          Accelerate&nbsp;<span style={{ color: "#57E6D2" }}>Growth.</span>
        </span>
      </div>
      <div style={{ display: "flex", fontSize: 28, color: "#A4ADBF" }}>Strategy. Technology. Performance.</div>
    </div>,
    size,
  );
}

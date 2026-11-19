import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon: the finish flag on the accent colour. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#c2410c",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <div style={{ display: "flex", width: 14, height: 118, borderRadius: 7, background: "#ffffff" }} />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: 84,
              height: 68,
              marginLeft: 8,
              background: "#ffffff",
              borderRadius: 8,
              padding: 6,
            }}
          >
            <div style={{ display: "flex", width: 36, height: 28, background: "#1b2032" }} />
            <div style={{ display: "flex", width: 36, height: 28 }} />
            <div style={{ display: "flex", width: 36, height: 28 }} />
            <div style={{ display: "flex", width: 36, height: 28, background: "#1b2032" }} />
          </div>
        </div>
      </div>
    ),
    size,
  );
}

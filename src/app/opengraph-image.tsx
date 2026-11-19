import { ImageResponse } from "next/og";
import { site } from "@/site.config";
import { totalMetas } from "@/data/metas";

export const alt = `${site.name}: ${site.tagline.toLowerCase()}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#1b2032";
const META = "#c2410c";
const PAPER = "#fbf7f0";

/** The share image for every page: wordmark, tagline and the finish-line strip. */
export default function Image() {
  const cuadros = Array.from({ length: 30 });
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER,
          color: INK,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", padding: "70px 80px 0 80px" }}>
          <div style={{ display: "flex", alignItems: "center", fontSize: 44, fontWeight: 800 }}>
            <div
              style={{
                display: "flex",
                width: 56,
                height: 56,
                borderRadius: 12,
                background: META,
                marginRight: 18,
              }}
            />
            <span>mil</span>
            <span style={{ color: META }}>metas</span>
          </div>
          <div style={{ display: "flex", marginTop: 70, fontSize: 84, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            Ideas de metas y el ritmo para cumplirlas
          </div>
          <div style={{ display: "flex", marginTop: 34, fontSize: 36, color: "#5b6072" }}>
            {`${totalMetas} metas medibles · calculadora de ritmo · guías`}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {[0, 1].map((fila) => (
            <div key={fila} style={{ display: "flex" }}>
              {cuadros.map((_, i) => (
                <div
                  key={i}
                  style={{ width: 40, height: 40, background: (i + fila) % 2 === 0 ? INK : "#ffffff" }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}

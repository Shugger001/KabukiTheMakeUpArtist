import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Kabuki The MakeUp Girl — Luxury makeup artistry";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #0a1a2f 0%, #152a45 48%, #0a1a2f 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 55% at 30% 25%, rgba(248,200,220,0.35), transparent 55%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "40px",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              color: "#f8c8dc",
              fontFamily: 'Georgia, "Times New Roman", serif',
              lineHeight: 1.05,
            }}
          >
            Kabuki
          </div>
          <div
            style={{
              marginTop: 8,
              fontSize: 28,
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase" as const,
              color: "rgba(255,255,255,0.72)",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            The MakeUp Girl
          </div>
          <div
            style={{
              marginTop: 28,
              maxWidth: 520,
              fontSize: 22,
              lineHeight: 1.45,
              color: "rgba(255,255,255,0.78)",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Accra, Ghana · luxury makeup for Africa and diaspora
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

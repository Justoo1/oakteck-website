import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { siteConfig } from "@/site.config";

// Read synchronously at module scope. With Cache Components, awaiting async
// file I/O during prerender can mark an image route dynamic (it did for the
// first routes each build worker rendered); sync reads keep every card static.
const extraBold = readFileSync(join(process.cwd(), "assets/fonts/Montserrat-ExtraBold.ttf"));
const semiBold = readFileSync(join(process.cwd(), "assets/fonts/Montserrat-SemiBold.ttf"));
const logoSrc = `data:image/png;base64,${readFileSync(join(process.cwd(), "public/brand/oakteck-logo-on-dark-1600.png")).toString("base64")}`;

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/** Navy Open Graph card: logo, optional eyebrow, page title and the domain. */
export async function renderOg({ title, eyebrow }: { title: string; eyebrow?: string }) {
  const domain = siteConfig.url.replace(/^https?:\/\//, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0D1B2A",
          padding: "64px 72px",
          position: "relative",
          fontFamily: "Montserrat",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -160,
            top: -200,
            width: 640,
            height: 640,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(19,128,204,0.35), rgba(19,128,204,0) 70%)",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={330} height={143} alt="" style={{ objectFit: "contain", objectPosition: "left" }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          {eyebrow && (
            <div style={{ color: "#C4966C", fontSize: 26, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase" }}>
              {eyebrow}
            </div>
          )}
          <div
            style={{
              color: "#FFFFFF",
              fontSize: title.length > 48 ? 58 : 72,
              fontWeight: 800,
              lineHeight: 1.05,
              marginTop: 18,
              maxWidth: 1000,
              letterSpacing: -1.5,
            }}
          >
            {title}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: 64, height: 4, background: "#C4966C", borderRadius: 4, marginRight: 20 }} />
            <div style={{ color: "#9FB0C2", fontSize: 26, fontWeight: 600 }}>{siteConfig.tagline}</div>
          </div>
          <div style={{ color: "#4FA8E8", fontSize: 26, fontWeight: 600 }}>{domain}</div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Montserrat", data: extraBold, weight: 800, style: "normal" },
        { name: "Montserrat", data: semiBold, weight: 600, style: "normal" },
      ],
    },
  );
}

// Adds Cloudflare-specific files to the static export in out/.
//   node scripts/cloudflare-postbuild.mjs   (run by `npm run build:cloudflare`)
import { writeFileSync, existsSync } from "node:fs";

if (!existsSync("out/index.html")) {
  console.error("out/ not found: run the Cloudflare build first (DEPLOY_TARGET=cloudflare next build).");
  process.exit(1);
}

// Cache headers for Workers Static Assets (https://developers.cloudflare.com/workers/static-assets/headers/).
writeFileSync(
  "out/_headers",
  `/_next/static/*
  Cache-Control: public, max-age=31536000, immutable

/_img/*
  Cache-Control: public, max-age=2592000

/brand/*
  Cache-Control: public, max-age=604800

/video/*
  Cache-Control: public, max-age=2592000

# Next.js exports Open Graph images as extensionless PNG files.
/opengraph-image
  Content-Type: image/png

/*/opengraph-image
  Content-Type: image/png

/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
`,
);
console.log("Wrote out/_headers");

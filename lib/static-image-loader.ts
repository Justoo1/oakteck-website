/**
 * next/image loader for the Cloudflare static export (no image server).
 * scripts/build-images.mjs pre-generates every width below as WebP in
 * public/_img/, mirroring the source path. Widths must match `deviceSizes`
 * and `imageSizes` in next.config.ts.
 */
export const STATIC_IMAGE_WIDTHS = [256, 384, 640, 828, 1200, 1440] as const;

export default function staticImageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  // Only local raster images are pre-sized; anything else is served as-is.
  if (!src.startsWith("/") || !/\.(jpe?g|png|webp)$/i.test(src)) return src;
  const w = STATIC_IMAGE_WIDTHS.find((size) => size >= width) ?? STATIC_IMAGE_WIDTHS[STATIC_IMAGE_WIDTHS.length - 1];
  return `/_img${src.replace(/\.[a-z]+$/i, "")}-${w}.webp`;
}

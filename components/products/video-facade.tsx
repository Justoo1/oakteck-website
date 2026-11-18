"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";

/**
 * Click-to-play video. Until pressed it is just a lazily loaded poster image,
 * so no video data (and no poster) is downloaded for visitors who never play
 * it, which matters on metered mobile data.
 */
export function VideoFacade({
  src,
  poster,
  title,
  captions,
}: {
  src: string;
  poster: string;
  title: string;
  captions?: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <video
        controls
        autoPlay
        playsInline
        poster={poster}
        width={1440}
        height={900}
        className="block aspect-[1440/900] h-auto w-full bg-navy-900"
        aria-label={`Kwanix demo: ${title}`}
      >
        <source src={src} type="video/mp4" />
        {captions && <track kind="captions" src={captions} srcLang="en" label="English" default />}
      </video>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative block aspect-[1440/900] w-full overflow-hidden bg-navy-900"
      aria-label={`Play Kwanix demo: ${title}`}
    >
      <Image src={poster} alt="" fill sizes="(min-width: 768px) 560px, 100vw" quality={60} className="object-cover" />
      <span className="absolute inset-0 bg-navy-950/25 transition-colors group-hover:bg-navy-950/10" aria-hidden="true" />
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-blue-600 text-white shadow-[0_10px_30px_-8px_rgb(0_0_0/0.6)] transition-transform group-hover:scale-105 group-active:scale-95"
      >
        <Play className="ml-1 size-7 fill-current" />
      </span>
    </button>
  );
}

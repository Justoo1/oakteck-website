/**
 * Full Kwanix demo videos (originals in docs/kwanix-videos). Each has
 * burned-in on-screen captions. Narration caption files (.vtt) are still
 * needed: when one is added at `captions`, it is switched on by default.
 */
export type DemoVideo = {
  slug: string;
  title: string;
  summary: string;
  duration: string;
  src: string;
  poster: string;
  captions?: string;
};

export const kwanixVideos: DemoVideo[] = [
  {
    slug: "owner-overview",
    title: "Owner dashboard",
    summary: "Live trips, seats sold, parcels and revenue across every station, on one screen.",
    duration: "1:50",
    src: "/video/kwanix-01-owner-overview.mp4",
    poster: "/video/kwanix-01-owner-overview-poster.webp",
  },
  {
    slug: "counter-ticket-sale",
    title: "Counter ticket sale",
    summary: "Sell a seat from the visual seat map, with cash or Mobile Money.",
    duration: "1:20",
    src: "/video/kwanix-02-counter-ticket-sale.mp4",
    poster: "/video/kwanix-02-counter-ticket-sale-poster.webp",
  },
  {
    slug: "parcel-journey",
    title: "Parcel journey",
    summary: "Log, scan-to-load, OTP pickup and public tracking, end to end.",
    duration: "2:52",
    src: "/video/kwanix-03-parcel-journey.mp4",
    poster: "/video/kwanix-03-parcel-journey-poster.webp",
  },
  {
    slug: "passenger-online-booking",
    title: "Passenger online booking",
    summary: "Passengers search by town, pick a seat, pay with Mobile Money or card, and get the ticket by SMS.",
    duration: "1:03",
    src: "/video/kwanix-04-passenger-online-booking.mp4",
    poster: "/video/kwanix-04-passenger-online-booking-poster.webp",
  },
];

"use client";

import ParallaxScrolling, { type ParallaxLayer } from "@/components/ui/parallax-scrolling";
import { films, ytThumb } from "@/lib/films";
import { withBasePath } from "@/lib/basePath";

// Map each film to a parallax layer using its best local still (or YouTube thumb)
// Slower speed = feels further away; faster = closer to viewer
const layers: ParallaxLayer[] = [
  {
    src: withBasePath("/films/yumma/still-6.jpg"),
    alt: "Yumma — film still",
    href: "/films/yumma",
    speed: 0.25,
    label: films[0].title,
    sublabel: films[0].roles.join(" · "),
  },
  {
    src: withBasePath("/films/seeds-of-dignity/still-4.jpg"),
    alt: "Seeds of Dignity — film still",
    href: "/films/seeds-of-dignity",
    speed: 0.45,
    label: films[1].title,
    sublabel: films[1].roles.join(" · "),
  },
  {
    src: ytThumb(films[2].trailerId),
    alt: "BBC Documentary — still",
    href: "/films/bbc-documentary",
    speed: 0.60,
    label: films[2].title,
    sublabel: films[2].roles.join(" · "),
  },
  {
    src: ytThumb(films[3].trailerId),
    alt: "Arts & Culture — still",
    href: "/films/arts-and-culture",
    speed: 0.75,
    label: films[3].title,
    sublabel: films[3].roles.join(" · "),
  },
];

export default function FilmsParallax() {
  return (
    <section id="films" className="bg-ink">
      <ParallaxScrolling layers={layers} bandHeight="72vh" />
    </section>
  );
}

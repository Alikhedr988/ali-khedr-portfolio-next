export type Film = {
  slug: string;
  title: string;
  year: string;
  roles: string[];
  trailerId: string;
  poster: string | null;
  /** Intrinsic poster dimensions — used by next/image for correct aspect ratio */
  posterWidth: number;
  posterHeight: number;
  stills: string[];
  description: string;
};

export const films: Film[] = [
  {
    slug: "yumma",
    title: "Yumma",
    year: "2025",
    roles: ["Director", "Cinematographer", "Editor"],
    trailerId: "27VRadrXaJ4",
    poster: "/films/yumma/poster.jpg",
    posterWidth: 1600,
    posterHeight: 2371,
    stills: Array.from({ length: 7 }, (_, i) => `/films/yumma/still-${i + 1}.jpg`),
    description: "Migrant mothers in Lebanon, told without abstraction. Lived inside the Kafala system, racialized labor, and legal precarity — and the children growing up in its margin.",
  },
  {
    slug: "seeds-of-dignity",
    title: "Seeds of Dignity",
    year: "2025",
    roles: ["Cinematographer", "Director", "Co-Editor"],
    trailerId: "9L2yNoCdkwM",
    poster: "/films/seeds-of-dignity/poster.jpg",
    posterWidth: 1600,
    posterHeight: 2123,
    stills: Array.from({ length: 10 }, (_, i) => `/films/seeds-of-dignity/still-${i + 1}.jpg`),
    description: "Farmers and seed keepers hold what war and industrial agriculture try to erase. A film on food sovereignty, climate, and the politics of what we grow.",
  },
  {
    slug: "bbc-documentary",
    title: "BBC Documentary",
    year: "2023",
    roles: ["Cinematographer", "Editor"],
    trailerId: "UfWBHHY1gQY",
    poster: null,
    posterWidth: 1280,
    posterHeight: 720,
    stills: [],
    description: "Beirut Blast Documentary contribution covering the August 2020 Beirut port explosion and its aftermath, produced for the BBC.",
  },
  {
    slug: "alkhansa",
    title: "Alkhansa",
    year: "2022",
    roles: ["Cinematographer"],
    trailerId: "BySavSOpWak",
    poster: null,
    posterWidth: 1280,
    posterHeight: 720,
    stills: [],
    description: "A live performance by the Beirut-based artist Khansa, documented as a short film. Body, voice, and music as testimony — for queer presence, where language fails.",
  },
];

export function getFilmBySlug(slug: string): Film | undefined {
  return films.find((f) => f.slug === slug);
}

export function ytThumb(id: string) {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { films, getFilmBySlug } from "@/lib/films";
import FilmPageClient from "./FilmPageClient";
import GrainOverlay from "@/components/GrainOverlay";

export function generateStaticParams() {
  return films.map((f) => ({ slug: f.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const film = getFilmBySlug(params.slug);
  if (!film) return {};
  return {
    title: `${film.title} — Ali AlSheikh`,
    description: film.description,
  };
}

export default function FilmPage({ params }: { params: { slug: string } }) {
  const film = getFilmBySlug(params.slug);
  if (!film) notFound();

  return (
    <>
      <GrainOverlay />
      <FilmPageClient film={film} />
    </>
  );
}

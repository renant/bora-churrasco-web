"use client";

export default function YouTube({ id }: { id: string }) {
  return (
    <iframe
      className="w-full rounded-lg"
      style={{
        aspectRatio: "16/9",
      }}
      src={`https://www.youtube.com/embed/${id}`}
      title="YouTube Video Player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    />
  );
}

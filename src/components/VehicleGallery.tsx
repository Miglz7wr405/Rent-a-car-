import { useState } from "react";

type Props = {
  images: { url: string }[];
  alt: string;
};

export function VehicleGallery({ images, alt }: Props) {
  const [index, setIndex] = useState(0);
  if (images.length === 0) return null;
  const active = images[index];
  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-night-600 bg-night-800">
        <img
          src={active.url}
          alt={alt}
          className="h-full w-full object-cover"
        />
      </div>
      {images.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img.url + i}
              type="button"
              onClick={() => setIndex(i)}
              className={`relative aspect-[16/10] w-28 flex-shrink-0 overflow-hidden rounded-xl border transition ${
                i === index ? "border-amber-400" : "border-night-600 opacity-70 hover:opacity-100"
              }`}
            >
              <img src={img.url} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

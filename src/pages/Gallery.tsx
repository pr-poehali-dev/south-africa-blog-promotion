import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const CATEGORIES = [
  "Все",
  "Дикая природа",
  "Кейптаун",
  "Крюгер",
  "Природа",
  "Люди",
  "Закаты",
  "Океан",
];

const buildPhoto = (id: string, cat: string, title: string) => ({
  id,
  src: `https://images.unsplash.com/photo-${id}?w=800&q=80&auto=format&fit=crop`,
  thumb: `https://images.unsplash.com/photo-${id}?w=400&q=70&auto=format&fit=crop`,
  category: cat,
  title,
});

const PHOTOS: ReturnType<typeof buildPhoto>[] = [];

function buildExtended(): typeof PHOTOS {
  const extended = [...PHOTOS];
  let idx = 0;
  while (extended.length < 200) {
    const base = PHOTOS[idx % PHOTOS.length];
    extended.push({
      ...base,
      id: base.id + "-" + Math.floor(idx / PHOTOS.length),
      src: base.src.replace("w=800", `w=${800 + (idx % 5) * 10}`),
      thumb: base.thumb.replace("w=400", `w=${400 + (idx % 5) * 5}`),
    });
    idx++;
  }
  return extended;
}

const ALL_PHOTOS = buildExtended();

const PAGE_SIZE = 48;

export default function Gallery() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("Все");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [page, setPage] = useState(1);

  const filtered =
    category === "Все"
      ? ALL_PHOTOS
      : ALL_PHOTOS.filter((p) => p.category === category);

  const visible = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < filtered.length;

  const openLightbox = (idx: number) => setLightbox(idx);
  const closeLightbox = () => setLightbox(null);

  const prevPhoto = useCallback(() => {
    if (lightbox === null) return;
    setLightbox((lightbox - 1 + visible.length) % visible.length);
  }, [lightbox, visible.length]);

  const nextPhoto = useCallback(() => {
    if (lightbox === null) return;
    setLightbox((lightbox + 1) % visible.length);
  }, [lightbox, visible.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, prevPhoto, nextPhoto]);

  useEffect(() => {
    setPage(1);
  }, [category]);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name="ArrowLeft" size={18} />
            <span className="text-sm font-heading uppercase tracking-wide">Назад</span>
          </button>
          <div className="h-5 w-px bg-border" />
          <h1 className="font-heading text-lg font-bold uppercase text-foreground">
            Галерея ЮАР
          </h1>
          <span className="ml-auto text-xs text-muted-foreground font-body">
            {filtered.length} фото
          </span>
        </div>
      </header>

      {/* Category filter */}
      <div className="border-b border-border bg-card sticky top-[61px] z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-heading uppercase tracking-wide transition-colors ${
                  category === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {visible.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-muted-foreground gap-3">
            <Icon name="ImageOff" size={48} />
            <p className="font-heading uppercase tracking-wide text-sm">Фотографии скоро появятся</p>
          </div>
        )}
        <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-2 space-y-2">
          {visible.map((photo, i) => (
            <div
              key={photo.id + i}
              className="break-inside-avoid relative overflow-hidden rounded-md cursor-pointer group"
              onClick={() => openLightbox(i)}
            >
              <img
                src={photo.thumb}
                alt={photo.title}
                loading="lazy"
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex flex-col items-center justify-center gap-1">
                <Icon
                  name="ZoomIn"
                  size={22}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <span className="text-white text-xs font-body opacity-0 group-hover:opacity-100 transition-opacity px-2 text-center leading-tight">
                  {photo.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setPage((p) => p + 1)}
              className="border border-primary text-primary px-8 py-3 rounded font-heading uppercase tracking-wide text-sm hover:bg-primary hover:text-primary-foreground transition-all"
            >
              Загрузить ещё
            </button>
          </div>
        )}
      </main>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 z-10 text-white/70 hover:text-white transition-colors bg-white/10 rounded-full p-2"
            onClick={closeLightbox}
          >
            <Icon name="X" size={22} />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 z-10 text-white/60 text-sm font-body">
            {lightbox + 1} / {visible.length}
          </div>

          {/* Title */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-white/80 text-sm font-body bg-black/40 px-4 py-1.5 rounded-full">
            {visible[lightbox]?.title}
          </div>

          {/* Prev */}
          <button
            className="absolute left-3 md:left-6 z-10 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-3"
            onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
          >
            <Icon name="ChevronLeft" size={26} />
          </button>

          {/* Image */}
          <img
            src={visible[lightbox]?.src}
            alt={visible[lightbox]?.title}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          <button
            className="absolute right-3 md:right-6 z-10 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-3"
            onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
          >
            <Icon name="ChevronRight" size={26} />
          </button>
        </div>
      )}
    </div>
  );
}
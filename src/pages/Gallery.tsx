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

const PHOTOS = [
  buildPhoto("1516426122078-c23e76319801", "Дикая природа", "Слон в саванне"),
  buildPhoto("1547970810-dc1eac37d174", "Дикая природа", "Лев на закате"),
  buildPhoto("1534759926110-c0a4c2d00bec", "Дикая природа", "Жирафы"),
  buildPhoto("1474511320723-9a56873867b5", "Дикая природа", "Леопард"),
  buildPhoto("1551316679-9c6ae9dec224", "Дикая природа", "Носорог"),
  buildPhoto("1564349683136-77e08dba1ef7", "Дикая природа", "Зебры"),
  buildPhoto("1518715308788-3005759c6baf", "Дикая природа", "Буйволы"),
  buildPhoto("1535941339077-2dd1c7963098", "Дикая природа", "Гепард"),
  buildPhoto("1602526212648-87a7b13e36c6", "Дикая природа", "Бегемот"),
  buildPhoto("1509479100390-f83a8349e79c", "Дикая природа", "Крокодил"),
  buildPhoto("1580741569354-c29f9b2b3e95", "Дикая природа", "Страус"),
  buildPhoto("1504006833117-84e27b16a87c", "Дикая природа", "Шакал"),
  buildPhoto("1614715838782-8e2db5b31ca2", "Дикая природа", "Импала"),
  buildPhoto("1561731216-c3a4d99437d5", "Дикая природа", "Обезьяны"),
  buildPhoto("1598514983318-2f5f27e4c0e2", "Дикая природа", "Антилопа"),
  buildPhoto("1549366021-112d74e87c99", "Дикая природа", "Попугай"),
  buildPhoto("1571941994797-9bb7d4404d46", "Дикая природа", "Пингвины ЮАР"),
  buildPhoto("1608848461950-0fe51dfc41cb", "Дикая природа", "Фламинго"),
  buildPhoto("1591691879869-20abbbf23dc0", "Дикая природа", "Вилдебисты"),
  buildPhoto("1534759926110-c0a4c2d00bec", "Дикая природа", "Слоны у реки"),
  buildPhoto("1580060839134-75a5edca2e99", "Кейптаун", "Стол-гора"),
  buildPhoto("1578662996442-48f60103fc96", "Кейптаун", "Bo-Kaap"),
  buildPhoto("1630096601694-0e5b6d92b67e", "Кейптаун", "V&A Waterfront"),
  buildPhoto("1501854140801-50d01698950b", "Кейптаун", "Мыс Доброй Надежды"),
  buildPhoto("1580654712603-d7d2b6f98df5", "Кейптаун", "Кейптаун с воздуха"),
  buildPhoto("1559598467-f8b76c8155d0", "Кейптаун", "Виноградники"),
  buildPhoto("1525596662741-e234dd0a5e17", "Кейптаун", "Пляж Кэмпс Бэй"),
  buildPhoto("1604537529428-15bcbeecfe4d", "Кейптаун", "Столовая гора панорама"),
  buildPhoto("1559827260-dc66d52bef19", "Кейптаун", "Город и горы"),
  buildPhoto("1516026672322-bc52d61a55d5", "Кейптаун", "Sunset над Атлантикой"),
  buildPhoto("1536514498073-a8bbd2b2acbc", "Кейптаун", "Пляж Клиф"),
  buildPhoto("1576941342559-b27ab4ab88ff", "Кейптаун", "Пингвины Боулдерс"),
  buildPhoto("1589308078059-be1415eab4c3", "Кейптаун", "Сигнальный холм"),
  buildPhoto("1566073771259-470d8e66ef4a", "Кейптаун", "Отель с видом"),
  buildPhoto("1553152531-b98a2753efca", "Крюгер", "Крюгер-парк"),
  buildPhoto("1545671913-b89ac1b4ac10", "Крюгер", "Слоны в Крюгере"),
  buildPhoto("1560969184-10fe8719e047", "Крюгер", "Водопой на закате"),
  buildPhoto("1516169443497-c0b69e3e52b8", "Крюгер", "Рейнджер-джип"),
  buildPhoto("1609176109626-76671f9da1a1", "Крюгер", "Лев в высокой траве"),
  buildPhoto("1575550959106-5a7dece5a817", "Крюгер", "Буш-лагерь"),
  buildPhoto("1548366086-7f1b76106622", "Крюгер", "Леопард на дереве"),
  buildPhoto("1557050543-4d5f4e07ef46", "Крюгер", "Закат в буше"),
  buildPhoto("1589182337358-2cb63099350c", "Крюгер", "Крюгер птицы"),
  buildPhoto("1539367628448-4bc5c9d171c8", "Крюгер", "Антилопы стадо"),
  buildPhoto("1506905925346-21bda4d32df4", "Природа", "Драконовы горы"),
  buildPhoto("1504198453819-1190e59cc33c", "Природа", "Сад маршрут"),
  buildPhoto("1484318571209-661cf29a69d3", "Природа", "Цветущий фынбос"),
  buildPhoto("1494500764479-0c8f2919a3d8", "Природа", "Блайд-Ривер каньон"),
  buildPhoto("1426604966848-d7adac402bbc", "Природа", "Зелёные холмы"),
  buildPhoto("1501854140801-50d01698950b", "Природа", "Побережье ЮАР"),
  buildPhoto("1445307806294-bff7f67ff225", "Природа", "Пещеры"),
  buildPhoto("1464822759023-fed622ff2c3b", "Природа", "Горное озеро"),
  buildPhoto("1502082553048-f009c37129b9", "Природа", "Лес Книсна"),
  buildPhoto("1441974231531-c6227db76b6e", "Природа", "Дорога через лес"),
  buildPhoto("1500534314209-a25ddb2bd429", "Природа", "Водопад"),
  buildPhoto("1518459031867-a89b944bffe4", "Природа", "Пляж на закате"),
  buildPhoto("1507525428034-b723cf961d3e", "Природа", "Тропический берег"),
  buildPhoto("1559494007-191dc1c7a2b8", "Природа", "Туман в горах"),
  buildPhoto("1516912481800-0f8f4f3e2a37", "Природа", "Ночное небо саванны"),
  buildPhoto("1443890923422-7819ed4101b0", "Природа", "Долина"),
  buildPhoto("1455156218388-5e61b526818b", "Природа", "Степь"),
  buildPhoto("1572987670199-b35d27c22b55", "Люди", "Местные жители"),
  buildPhoto("1489493512598-d08130f49bea", "Люди", "Дети Южной Африки"),
  buildPhoto("1531123897727-8f129e1688ce", "Люди", "Зулусы"),
  buildPhoto("1529156069898-49953e39b3ac", "Люди", "Маркет"),
  buildPhoto("1508214751196-bcfd4ca60f91", "Люди", "Женщины"),
  buildPhoto("1513201099705-a9746bab22b3", "Люди", "Рынок Кейптауна"),
  buildPhoto("1567765646251-72f1171329a0", "Люди", "Дети деревни"),
  buildPhoto("1544005313-94ddf0286df2", "Люди", "Портрет"),
  buildPhoto("1503919545889-aef636e10ad4", "Люди", "Музыканты"),
  buildPhoto("1476514525535-07fb3b4ae5f1", "Закаты", "Закат в саванне"),
  buildPhoto("1508739773434-c26b3d09e071", "Закаты", "Оранжевый закат"),
  buildPhoto("1495616811223-4d98c6e9c869", "Закаты", "Акация на закате"),
  buildPhoto("1502082553048-f009c37129b9", "Закаты", "Силуэты"),
  buildPhoto("1513002749285-d2d2f1cd9b77", "Закаты", "Огненное небо"),
  buildPhoto("1500534314209-a25ddb2bd429", "Закаты", "Закат у водопада"),
  buildPhoto("1470252649378-9c29740c9fa8", "Закаты", "Пурпурный закат"),
  buildPhoto("1504701954957-2010ec3bcec1", "Закаты", "Закат над горами"),
  buildPhoto("1522204523234-8729aa6a3d39", "Закаты", "Золотой час"),
  buildPhoto("1516912481800-0f8f4f3e2a37", "Закаты", "Звёздное небо"),
  buildPhoto("1505118380757-91f5f5632de0", "Закаты", "Рассвет"),
  buildPhoto("1519046904884-53103b34b206", "Океан", "Атлантика"),
  buildPhoto("1518859531710-9519f40e8b9d", "Океан", "Волны"),
  buildPhoto("1507525428034-b723cf961d3e", "Океан", "Пляж"),
  buildPhoto("1511300636408-a63a89df3482", "Океан", "Прибой"),
  buildPhoto("1505459668311-8dfac7952bf0", "Океан", "Закат над морем"),
  buildPhoto("1471922694854-ff1b63b20054", "Океан", "Скалы и море"),
  buildPhoto("1505459668311-8dfac7952bf0", "Океан", "Бухта"),
  buildPhoto("1507746212228-c45b46fad262", "Океан", "Серфинг"),
  buildPhoto("1437719417032-8595fd9e9dc6", "Океан", "Горизонт"),
  buildPhoto("1518791841217-8f162f1912fa", "Океан", "Морские птицы"),
];

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

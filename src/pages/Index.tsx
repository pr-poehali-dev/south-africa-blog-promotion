import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/6304529a-c8b4-435e-aa43-429aa3c665eb/files/e4ac2b08-3aae-426d-8a8d-5a22b4314c54.jpg";
const ELEPHANT_IMG = "https://cdn.poehali.dev/projects/6304529a-c8b4-435e-aa43-429aa3c665eb/files/b9988101-71aa-41dc-9a8c-d4538f335604.jpg";
const CAPETOWN_IMG = "https://cdn.poehali.dev/projects/6304529a-c8b4-435e-aa43-429aa3c665eb/files/acdb17c2-4cd7-4ffb-af60-5a406c1f94bb.jpg";

const NAV_LINKS = ["Главная", "Блог", "Видео", "Галерея", "GeoSafe SA", "Контакты"];

const BLOG_POSTS = [
  {
    img: ELEPHANT_IMG,
    tag: "Дикая природа",
    date: "14 фев 2026",
    title: "Большая пятёрка Крюгера: что нужно знать перед сафари",
    excerpt: "Крюгер — одно из крупнейших заповедников мира. Делюсь маршрутом, советами и лучшими точками для наблюдения за животными.",
  },
  {
    img: CAPETOWN_IMG,
    tag: "Города",
    date: "2 фев 2026",
    title: "Кейптаун: город у двух океанов и одной горы",
    excerpt: "Столовая гора, Bo-Kaap, мыс Доброй Надежды — всё, что нужно увидеть в южной столице ЮАР за 5 дней.",
  },
  {
    img: HERO_IMG,
    tag: "Экспедиция",
    date: "20 янв 2026",
    title: "Драконовы горы: трекинг на краю Африки",
    excerpt: "Шесть дней пешком по горному массиву uKhahlamba. Высота, холод и абсолютная дикость — репортаж с маршрута.",
  },
];

const GALLERY_IMGS = [HERO_IMG, ELEPHANT_IMG, CAPETOWN_IMG, HERO_IMG, ELEPHANT_IMG, CAPETOWN_IMG];

const VIDEOS = [
  {
    platform: "YouTube",
    icon: "Youtube",
    color: "#FF0000",
    embedId: "dQw4w9WgXcQ",
    title: "Сафари в Крюгере — видео с маршрута",
    source: "youtube",
  },
  {
    platform: "TikTok",
    icon: "Music2",
    color: "#00F2EA",
    embedId: "7000000000000000000",
    title: "Слон остановил наш джип — реакция",
    source: "tiktok",
  },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState("Главная");
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [sent, setSent] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const sectionMap: Record<string, string> = {
    Главная: "hero",
    Блог: "blog",
    Видео: "video",
    Галерея: "gallery",
    "GeoSafe SA": "geosafe",
    Контакты: "contact",
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setContactName("");
    setContactEmail("");
    setContactMsg("");
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🦁</span>
            <span className="font-heading text-xl font-bold tracking-wider text-primary uppercase">
              Wild South Africa
            </span>
          </div>
          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => { setActiveSection(link); scrollTo(sectionMap[link]); }}
                className={`nav-link text-sm font-body font-medium tracking-wide transition-colors ${activeSection === link ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                {link}
              </button>
            ))}
            <a
              href="https://t.me/+qvKkxOoiCLZkMWEy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded text-sm font-heading font-semibold uppercase tracking-wide hover:bg-primary/90 transition-colors"
            >
              <Icon name="Send" size={14} />
              Telegram
            </a>
          </div>
          {/* Mobile burger */}
          <button className="md:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-card border-t border-border px-6 py-4 flex flex-col gap-4 animate-fade-in">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => { setActiveSection(link); scrollTo(sectionMap[link]); }}
                className="text-left text-base font-body text-muted-foreground hover:text-primary transition-colors"
              >
                {link}
              </button>
            ))}
            <a
              href="https://t.me/+qvKkxOoiCLZkMWEy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-3 rounded text-sm font-heading font-semibold uppercase tracking-wide w-full justify-center"
            >
              <Icon name="Send" size={14} />
              Telegram-канал
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img
          src={HERO_IMG}
          alt="Саванна ЮАР"
          className="absolute inset-0 w-full h-full object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-20">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 text-primary px-4 py-1.5 rounded-full text-xs font-heading uppercase tracking-widest mb-8 animate-fade-in">
            <Icon name="MapPin" size={12} />
            Южная Африка • ЮАР
          </div>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-white uppercase leading-tight tracking-tight animate-fade-in delay-100">
            Дикая <span className="text-primary">Африка</span>
            <br />в каждом кадре
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/75 font-body max-w-2xl mx-auto leading-relaxed animate-fade-in delay-200">
            Блог об экспедициях, животных и жизни в ЮАР. Сафари, горы, океаны — всё это здесь, из первых рук.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-300">
            <button
              onClick={() => scrollTo("blog")}
              className="bg-primary text-primary-foreground px-8 py-3.5 rounded font-heading font-semibold uppercase tracking-wide text-sm hover:bg-primary/90 transition-all hover:scale-105"
            >
              Читать блог
            </button>
            <a
              href="https://t.me/+qvKkxOoiCLZkMWEy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-white/30 text-white px-8 py-3.5 rounded font-heading font-semibold uppercase tracking-wide text-sm hover:bg-white/10 transition-all"
            >
              <Icon name="Send" size={16} />
              Telegram-канал
            </a>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
          <Icon name="ChevronDown" size={28} />
        </div>
      </section>

      {/* STATS BAR */}
      <div className="bg-primary/10 border-y border-primary/20">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: "BookOpen" as const, value: "48+", label: "Статей в блоге" },
            { icon: "Video" as const, value: "120+", label: "Видео на YouTube" },
            { icon: "Camera" as const, value: "2000+", label: "Фото в галерее" },
            { icon: "Users" as const, value: "15K+", label: "Подписчиков" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <Icon name={s.icon} size={22} className="text-primary mx-auto mb-2" />
              <div className="font-heading text-3xl font-bold text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground font-body mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* BLOG */}
      <section id="blog" className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-12">
          <p className="text-primary font-heading uppercase tracking-widest text-sm mb-3">Последние записи</p>
          <h2 className="section-heading font-heading text-4xl md:text-5xl font-bold text-foreground uppercase">
            Блог
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post, i) => (
            <article
              key={i}
              className="bg-card rounded-lg overflow-hidden card-hover border border-border cursor-pointer group"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-heading uppercase tracking-wider px-3 py-1 rounded">
                  {post.tag}
                </div>
              </div>
              <div className="p-5">
                <div className="text-xs text-muted-foreground font-body mb-2 flex items-center gap-1.5">
                  <Icon name="Calendar" size={12} />
                  {post.date}
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground uppercase leading-tight mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <span className="text-primary text-sm font-heading uppercase tracking-wide flex items-center gap-1 hover:gap-2 transition-all">
                  Читать <Icon name="ArrowRight" size={14} />
                </span>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <button className="border border-primary text-primary px-8 py-3 rounded font-heading uppercase tracking-wide text-sm hover:bg-primary hover:text-primary-foreground transition-all">
            Все статьи
          </button>
        </div>
      </section>

      {/* VIDEO */}
      <section id="video" className="bg-card border-y border-border py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-primary font-heading uppercase tracking-widest text-sm mb-3">Смотри и подписывайся</p>
            <h2 className="section-heading font-heading text-4xl md:text-5xl font-bold text-foreground uppercase">
              Видео
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* YouTube embed */}
            <div className="bg-background rounded-lg overflow-hidden border border-border card-hover">
              <div className="relative aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="YouTube видео"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <div className="p-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                  <Icon name="Youtube" size={16} className="text-white" />
                </div>
                <div>
                  <div className="font-heading text-sm font-semibold text-foreground uppercase">YouTube</div>
                  <div className="text-xs text-muted-foreground">Сафари в Крюгере — видео с маршрута</div>
                </div>
                <a
                  href="https://youtube.com/@yourchannel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-xs bg-red-600 text-white px-3 py-1.5 rounded font-heading uppercase tracking-wide hover:bg-red-700 transition-colors"
                >
                  Подписаться
                </a>
              </div>
            </div>

            {/* TikTok embed */}
            <div className="bg-background rounded-lg overflow-hidden border border-border card-hover">
              <div className="relative aspect-video bg-black flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-3">🎵</div>
                  <p className="text-white/60 text-sm font-body mb-4">TikTok — откройте в браузере</p>
                  <a
                    href="https://tiktok.com/@youraccount"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded font-heading font-semibold uppercase text-sm tracking-wide hover:bg-white/90 transition-colors"
                  >
                    <Icon name="ExternalLink" size={14} />
                    Смотреть TikTok
                  </a>
                </div>
              </div>
              <div className="p-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-black border border-white/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">🎵</span>
                </div>
                <div>
                  <div className="font-heading text-sm font-semibold text-foreground uppercase">TikTok</div>
                  <div className="text-xs text-muted-foreground">Слон остановил наш джип</div>
                </div>
                <a
                  href="https://tiktok.com/@youraccount"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-xs bg-gradient-to-r from-[#00F2EA] to-[#FF0050] text-black px-3 py-1.5 rounded font-heading uppercase tracking-wide hover:opacity-90 transition-opacity font-semibold"
                >
                  Подписаться
                </a>
              </div>
            </div>
          </div>

          {/* Platforms grid */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "YouTube", icon: "Youtube" as const, href: "https://youtube.com/@yourchannel", color: "bg-red-600", emoji: "", count: "120 видео" },
              { name: "TikTok", icon: "" as const, href: "https://tiktok.com/@youraccount", emoji: "🎵", color: "bg-black", count: "85 роликов" },
              { name: "Telegram", icon: "Send" as const, href: "https://t.me/+qvKkxOoiCLZkMWEy", color: "bg-blue-500", emoji: "", count: "15K подписчиков" },
              { name: "Instagram", icon: "Instagram" as const, href: "https://instagram.com/youraccount", color: "bg-gradient-to-br from-purple-600 to-orange-400", emoji: "", count: "8K подписчиков" },
            ].map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-muted border border-border rounded-lg px-4 py-3 hover:border-primary transition-colors group"
              >
                <div className={`w-9 h-9 rounded-lg ${p.color} flex items-center justify-center flex-shrink-0`}>
                  {p.icon ? <Icon name={p.icon} size={18} className="text-white" /> : <span className="text-lg">{p.emoji}</span>}
                </div>
                <div>
                  <div className="font-heading text-xs font-semibold text-foreground uppercase group-hover:text-primary transition-colors">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.count}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-12">
          <p className="text-primary font-heading uppercase tracking-widest text-sm mb-3">Фотографии из экспедиций</p>
          <h2 className="section-heading font-heading text-4xl md:text-5xl font-bold text-foreground uppercase">
            Галерея
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {GALLERY_IMGS.map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-lg cursor-pointer group ${i === 0 ? "row-span-2" : ""}`}
            >
              <img
                src={img}
                alt={`ЮАР фото ${i + 1}`}
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${i === 0 ? "h-full min-h-[320px]" : "h-48 md:h-56"}`}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <Icon name="ZoomIn" size={28} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <button className="border border-primary text-primary px-8 py-3 rounded font-heading uppercase tracking-wide text-sm hover:bg-primary hover:text-primary-foreground transition-all">
            Вся галерея
          </button>
        </div>
      </section>

      {/* GEOSAFE SA */}
      <section id="geosafe" className="bg-card border-y border-border py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/30 text-primary px-4 py-1.5 rounded-full text-xs font-heading uppercase tracking-widest mb-6">
                <Icon name="Cpu" size={12} />
                Искусственный интеллект
              </div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground uppercase leading-tight mb-4">
                GeoSafe <span className="text-primary">SA</span>
              </h2>
              <p className="text-muted-foreground font-heading text-lg uppercase tracking-wide mb-3">
                Инновационная карта-навигатор
              </p>
              <p className="text-muted-foreground font-body leading-relaxed mb-8">
                Современное решение на основе искусственного интеллекта, призванное сделать ваши путешествия по ЮАР безопаснее и комфортнее. Приложение сейчас на стадии тестирования и доработки — чтобы предложить вам максимально качественный продукт.
              </p>
              <div className="space-y-4 mb-10">
                {[
                  { icon: "Shield" as const, title: "Безопасные маршруты", desc: "Карты опасных районов и тауншипов с построением маршрутов в обход них" },
                  { icon: "Bot" as const, title: "Интеллектуальный помощник", desc: "Голосовой ИИ-ассистент и чат-бот для оперативной помощи в любой ситуации" },
                  { icon: "Phone" as const, title: "Всегда под рукой", desc: "Быстрый доступ к экстренным службам, такси, аренде авто и многому другому" },
                  { icon: "Camera" as const, title: "Ваши рекомендации", desc: "Делитесь фото кафе, заповедников, виноделен и достопримечательностей с оценкой" },
                ].map((f) => (
                  <div key={f.title} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name={f.icon} size={16} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-heading text-sm font-semibold text-foreground uppercase tracking-wide">{f.title}</div>
                      <div className="text-xs text-muted-foreground font-body mt-0.5 leading-relaxed">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contribute form teaser */}
              <div className="bg-primary/10 border border-primary/25 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Icon name="Star" size={16} className="text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-heading text-sm font-semibold text-foreground uppercase tracking-wide mb-1">Помогите наполнить навигатор!</div>
                    <p className="text-xs text-muted-foreground font-body leading-relaxed mb-2">
                      Присылайте данные о местах: город, улица, название заведения, средний чек, фото, оценка по 5-балльной шкале.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["Кафе", "Заповедники", "Виноделни", "Аптеки", "Достопримечательности"].map((tag) => (
                        <span key={tag} className="text-[10px] bg-background border border-border text-muted-foreground px-2 py-0.5 rounded font-heading uppercase tracking-wide">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Partner teaser */}
              <div className="bg-muted border border-border rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Icon name="Handshake" size={16} className="text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-heading text-sm font-semibold text-foreground uppercase tracking-wide mb-1">Ищем партнёров</div>
                    <p className="text-xs text-muted-foreground font-body leading-relaxed">
                      Приглашаем такси и аренду авто к сотрудничеству до выхода приложения. В GeoSafe SA предусмотрены рекламные площадки.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://t.me/+qvKkxOoiCLZkMWEy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded font-heading font-semibold uppercase tracking-wide text-sm hover:bg-primary/90 transition-all hover:scale-105"
                >
                  <Icon name="Send" size={15} />
                  Вступить в группу GeoSafe SA
                </a>
              </div>
            </div>

            {/* Right: mock map UI */}
            <div className="relative">
              <div className="relative bg-background rounded-xl border border-border overflow-hidden shadow-2xl">
                {/* Map header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                      <Icon name="Map" size={12} className="text-primary-foreground" />
                    </div>
                    <span className="font-heading text-xs font-bold uppercase tracking-wider text-foreground">GeoSafe SA</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs text-muted-foreground font-body">Live</span>
                  </div>
                </div>

                {/* Video */}
                <div className="relative bg-black overflow-hidden">
                  <video
                    src="https://ptfiles.storage.yandexcloud.net/pts-ai-video/video_40e92564-f01f-424e-bf35-be7e6b8db124.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full object-cover"
                  />
                </div>

                {/* AI status bar */}
                <div className="px-4 py-3 border-t border-border bg-muted">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center flex-shrink-0">
                      <Icon name="Bot" size={14} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-foreground font-body">
                        <span className="text-primary font-semibold">ИИ GeoSafe:</span> Район Alexandra обозначен как опасный. Строю объездной маршрут 🛡️
                      </div>
                      <div className="flex gap-1 mt-1.5">
                        {["Объехать", "Вызвать такси", "Экстренная помощь"].map((btn) => (
                          <button key={btn} className="text-[10px] bg-background border border-border text-muted-foreground px-2 py-0.5 rounded font-heading uppercase tracking-wide hover:border-primary hover:text-primary transition-colors">
                            {btn}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-xl font-heading text-xs font-bold uppercase tracking-wide rotate-3">
                Beta · Скоро
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TELEGRAM CTA */}
      <section className="relative overflow-hidden py-24">
        <img src={CAPETOWN_IMG} alt="Кейптаун" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <span className="text-4xl mb-4 block">✈️</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white uppercase mb-4">
            Присоединяйся к экспедиции
          </h2>
          <p className="text-white/70 font-body text-lg mb-8 leading-relaxed">
            В Telegram-канале — эксклюзивные фото, истории с маршрутов и советы для путешественников. Уже 15 000 подписчиков!
          </p>
          <a
            href="https://t.me/+qvKkxOoiCLZkMWEy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-4 rounded font-heading font-bold uppercase tracking-widest text-sm hover:bg-primary/90 transition-all hover:scale-105"
          >
            <Icon name="Send" size={18} />
            Открыть Telegram-канал
          </a>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-card border-t border-border py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-primary font-heading uppercase tracking-widest text-sm mb-3">Пишите, отвечу всем</p>
            <h2 className="section-heading font-heading text-4xl md:text-5xl font-bold text-foreground uppercase">
              Контакты
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-muted-foreground font-body leading-relaxed mb-8">
                Есть вопросы об ЮАР, хотите сотрудничество или просто хотите поделиться историей — пишите. Отвечаю лично.
              </p>
              <div className="space-y-5">
                {[
                  { icon: "Send" as const, label: "Telegram", value: "@yoursouthafricachannel", href: "https://t.me/+qvKkxOoiCLZkMWEy" },
                  { icon: "Youtube" as const, label: "YouTube", value: "Wild South Africa", href: "https://youtube.com" },
                  { icon: "Mail" as const, label: "Email", value: "hello@wildsouthafrica.ru", href: "mailto:hello@wildsouthafrica.ru" },
                ].map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                      <Icon name={c.icon} size={18} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-body">{c.label}</div>
                      <div className="text-foreground font-body font-medium group-hover:text-primary transition-colors">{c.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <form onSubmit={handleSend} className="space-y-4">
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 py-12 text-center animate-fade-in">
                  <div className="text-4xl">🦁</div>
                  <h3 className="font-heading text-xl font-semibold text-foreground uppercase">Сообщение отправлено!</h3>
                  <p className="text-muted-foreground font-body">Отвечу в ближайшее время. Асанте саны!</p>
                  <button onClick={() => setSent(false)} className="text-primary text-sm font-heading uppercase tracking-wide mt-2">Отправить ещё</button>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-xs text-muted-foreground font-body mb-1.5 uppercase tracking-wide">Имя</label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      required
                      placeholder="Ваше имя"
                      className="w-full bg-background border border-border rounded px-4 py-3 text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground font-body mb-1.5 uppercase tracking-wide">Email</label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      required
                      placeholder="your@email.com"
                      className="w-full bg-background border border-border rounded px-4 py-3 text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground font-body mb-1.5 uppercase tracking-wide">Сообщение</label>
                    <textarea
                      value={contactMsg}
                      onChange={(e) => setContactMsg(e.target.value)}
                      required
                      rows={4}
                      placeholder="Расскажите, с чем обращаетесь..."
                      className="w-full bg-background border border-border rounded px-4 py-3 text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground py-3.5 rounded font-heading font-semibold uppercase tracking-widest text-sm hover:bg-primary/90 transition-all hover:scale-[1.01]"
                  >
                    Отправить
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-8 bg-background">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🦁</span>
            <span className="font-heading text-sm font-bold uppercase tracking-wider text-foreground">Wild South Africa</span>
          </div>
          <p className="text-xs text-muted-foreground font-body text-center">
            © 2026 Wild South Africa — Блог об экспедициях и дикой природе ЮАР
          </p>
          <div className="flex items-center gap-4">
            {[
              { icon: "Send" as const, href: "https://t.me/+qvKkxOoiCLZkMWEy" },
              { icon: "Youtube" as const, href: "https://youtube.com" },
              { icon: "Instagram" as const, href: "https://instagram.com" },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name={s.icon} size={18} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
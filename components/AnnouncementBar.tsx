const messages = [
  "Free shipping across Cambodia on orders over $35",
  "New Resort '25 — now in stores",
  "Easy 14-day returns • Made in Phnom Penh",
  "Use code SAHM10 for 10% off your first order",
];

const AnnouncementBar = () => {
  return (
    <div className="relative z-announcement bg-primary text-primary-foreground overflow-hidden">
      <div className="flex whitespace-nowrap py-2 text-xs sm:text-sm marquee">
        {[...messages, ...messages].map((m, i) => (
          <span key={i} className="mx-8 inline-flex items-center gap-2 tracking-wide uppercase">
            <span className="h-1 w-1 rounded-full bg-primary-foreground/60" /> {m}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementBar;

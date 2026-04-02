interface StoreButtonsProps {
  onWaitlist: () => void;
  className?: string;
  dark?: boolean;
}

const stores = [
  { label: "App Store", sub: "iOS" },
  { label: "Google Play", sub: "Android" },
  { label: "AppGallery", sub: "Huawei" },
  { label: "RuStore", sub: "Россия" },
];

export default function StoreButtons({ onWaitlist, className = "", dark = false }: StoreButtonsProps) {
  const btn = dark
    ? "border border-white/30 text-white hover:bg-white hover:text-neutral-900"
    : "border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white";

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {stores.map((s) => (
        <button
          key={s.label}
          onClick={onWaitlist}
          className={`flex flex-col items-start px-4 py-2.5 text-left transition-colors duration-300 cursor-pointer ${btn}`}
        >
          <span className="text-[10px] uppercase tracking-widest opacity-60 leading-none mb-0.5">{s.sub}</span>
          <span className="text-sm font-semibold leading-none">{s.label}</span>
        </button>
      ))}
    </div>
  );
}

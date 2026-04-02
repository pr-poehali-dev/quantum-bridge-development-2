import Icon from "@/components/ui/icon";
import StoreButtons from "@/components/StoreButtons";

const features = [
  {
    icon: "HeartHandshake",
    title: "Поддержка",
    desc: "Иногда просто нужно, чтобы кто-то был рядом. Эмоционально или физически — любая форма помощи.",
  },
  {
    icon: "Lightbulb",
    title: "Совет",
    desc: "Сложная ситуация, важное решение, растерянность — рядом всегда найдётся человек с опытом.",
  },
  {
    icon: "Handshake",
    title: "Действие",
    desc: "Любая просьба о помощи — большая или маленькая. Ты сам решаешь, о чём попросить.",
  },
  {
    icon: "MapPin",
    title: "Твой радиус",
    desc: "Ты сам выбираешь, кто увидит просьбу — от ближайших метров до нужного города.",
  },
];

interface FeaturedProps {
  onWaitlist: () => void;
}

export default function Featured({ onWaitlist }: FeaturedProps) {
  return (
    <div id="about" className="flex flex-col lg:flex-row lg:justify-between lg:items-center min-h-screen px-6 py-12 lg:py-0 bg-white">
      <div className="flex-1 h-[400px] lg:h-[800px] mb-8 lg:mb-0 lg:order-2">
        <img
          src="https://cdn.poehali.dev/projects/082bc052-ea5c-4b18-8bb4-ac6e61294045/files/11875cb0-598a-4e3e-97d1-7c697d5a7582.jpg"
          alt="Соседи помогают друг другу"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 text-left lg:h-[800px] flex flex-col justify-center lg:mr-12 lg:order-1">
        <h3 className="uppercase mb-4 text-sm tracking-wide text-neutral-500">Любая просьба — любая помощь</h3>
        <p className="text-2xl lg:text-4xl mb-10 text-neutral-900 leading-tight">
          От «стало плохо на улице» до «нужен совет по жизни» — любой запрос найдёт того, кто откликнется.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {features.map((f) => (
            <div key={f.title} className="flex gap-3 items-start">
              <div className="mt-1 shrink-0 text-neutral-800">
                <Icon name={f.icon} size={20} />
              </div>
              <div>
                <p className="font-semibold text-neutral-900 text-sm uppercase tracking-wide mb-1">{f.title}</p>
                <p className="text-neutral-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <StoreButtons onWaitlist={onWaitlist} />
      </div>
    </div>
  );
}
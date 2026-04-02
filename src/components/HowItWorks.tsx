import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import Icon from "@/components/ui/icon";

const steps = [
  {
    number: "01",
    icon: "MapPin",
    title: "Задай радиус",
    desc: "Открой карту и выбери зону — от нескольких кварталов до целого региона. Только люди в этом радиусе увидят твою просьбу.",
  },
  {
    number: "02",
    icon: "MessageCircle",
    title: "Опиши просьбу",
    desc: "Напиши, что нужно: донести сумки, откопать машину, толкнуть авто или любая другая мелочь. Коротко и ясно.",
  },
  {
    number: "03",
    icon: "HandHeart",
    title: "Получи помощь",
    desc: "Кто-то поблизости откликнется и придёт на помощь. Без лишних слов — просто живые люди рядом.",
  },
];

export default function HowItWorks() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const lineScale = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);

  return (
    <div ref={container} className="bg-neutral-950 px-6 py-24 lg:py-36">
      <div className="max-w-5xl mx-auto">
        <p className="uppercase text-neutral-500 text-sm tracking-widest mb-4">Как это работает</p>
        <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-20">
          Три шага до помощи
        </h2>

        <div className="relative">
          <div className="hidden lg:block absolute left-[2.25rem] top-10 bottom-10 w-px bg-neutral-800 origin-top">
            <motion.div
              style={{ scaleY: lineScale }}
              className="w-full h-full bg-white origin-top"
            />
          </div>

          <div className="flex flex-col gap-16">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col lg:flex-row gap-6 lg:gap-16 items-start">
                <div className="flex items-center gap-4 lg:flex-col lg:gap-2 shrink-0">
                  <div className="w-9 h-9 rounded-full border border-neutral-700 flex items-center justify-center bg-neutral-950 z-10 shrink-0">
                    <Icon name={step.icon} size={16} className="text-white" />
                  </div>
                  <span className="text-neutral-600 text-xs uppercase tracking-widest">{step.number}</span>
                </div>
                <div className="pt-1">
                  <h3 className="text-white text-xl lg:text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-neutral-400 text-base leading-relaxed max-w-lg">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

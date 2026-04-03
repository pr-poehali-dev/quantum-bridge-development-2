import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import StoreButtons from "@/components/StoreButtons";

interface HeroProps {
  onWaitlist: () => void;
}

export default function Hero({ onWaitlist }: HeroProps) {
  const container = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://functions.poehali.dev/2d6e5979-4b1e-41d4-95be-e18cad31630f")
      .then(r => r.json())
      .then(data => setCount(data.total || 0))
      .catch(() => {});
  }, []);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "50vh"]);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="https://cdn.poehali.dev/projects/082bc052-ea5c-4b18-8bb4-ac6e61294045/files/20bc3ee7-a6bd-4a6d-8723-c742883555a8.jpg"
          alt="Соседи помогают друг другу"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
          ПОМОГУ
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto px-6 opacity-90">
          Стало плохо, нужен совет или просто некому помочь? Отправь запрос — и люди в твоём радиусе увидят его прямо сейчас.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <p className="text-white/50 text-xs uppercase tracking-widest">Скоро в магазинах</p>
          <StoreButtons onWaitlist={onWaitlist} dark />
          {count !== null && count > 0 && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-white/60 text-xs mt-1"
            >
              Уже ждут запуска <span className="text-white font-bold">{count}</span> человек
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
}
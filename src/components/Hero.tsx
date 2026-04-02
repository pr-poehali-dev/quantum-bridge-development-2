import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
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
          src="https://cdn.poehali.dev/projects/082bc052-ea5c-4b18-8bb4-ac6e61294045/files/11875cb0-598a-4e3e-97d1-7c697d5a7582.jpg"
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
          Попроси о помощи соседей рядом — донести сумки, откопать машину или убрать снег. Просто и по-человечески.
        </p>
        <button className="mt-8 bg-white text-neutral-900 px-8 py-3 text-sm uppercase tracking-widest font-semibold hover:bg-neutral-200 transition-colors duration-300 cursor-pointer">
          Скачать приложение
        </button>
      </div>
    </div>
  );
}
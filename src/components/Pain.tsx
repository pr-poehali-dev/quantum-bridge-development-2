import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

const moments = [
  "Бабушка тащит тяжёлые сумки по лестнице...",
  "Машина застряла в сугробе, водитель смотрит в растерянности...",
  "Человек упал на льду, прохожие торопятся мимо...",
];

export default function Pain() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0.1, 0.4, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.1, 0.5], [40, 0]);

  return (
    <div ref={container} className="bg-white px-6 py-24 lg:py-36">
      <div className="max-w-5xl mx-auto">
        <motion.div style={{ opacity, y }}>
          <p className="uppercase text-neutral-400 text-sm tracking-widest mb-6">Знакомо?</p>
          <h2 className="text-3xl lg:text-6xl font-bold text-neutral-900 leading-tight mb-12 max-w-3xl">
            Мы видим, что человеку нужна помощь. И проходим мимо.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-neutral-200">
          {moments.map((text, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-white p-8 lg:p-10"
            >
              <p className="text-4xl mb-6 text-neutral-300 font-bold leading-none">0{i + 1}</p>
              <p className="text-neutral-700 text-lg leading-relaxed">{text}</p>
              <p className="mt-4 text-neutral-400 text-sm italic">
                {i === 0 && "Неловко предлагать незнакомой женщине помощь..."}
                {i === 1 && "Хочется помочь, но куда-то спешишь..."}
                {i === 2 && "Остановился бы, но вдруг обидится?"}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 border-l-2 border-neutral-900 pl-8"
        >
          <p className="text-2xl lg:text-3xl text-neutral-900 leading-relaxed max-w-2xl">
            «Помогу» снимает неловкость. Человек сам просит о помощи — а ты просто откликаешься.
            Никакой неловкости. Только люди, которые хотят помочь.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

import { motion } from "framer-motion";
import { useRef } from "react";
import Icon from "@/components/ui/icon";

const points = [
  {
    icon: "Heart",
    title: "Никаких денег",
    desc: "В приложении невозможно ни заплатить, ни попросить оплату. Помощь — только из желания помочь.",
  },
  {
    icon: "ShieldCheck",
    title: "Мошенникам нечего делать",
    desc: "Когда нет денег — нет и смысла мошенничать. Никаких «переводов», «предоплат» и «комиссий».",
  },
  {
    icon: "Users",
    title: "Живые люди рядом",
    desc: "Только реальные соседи в твоём радиусе. Никаких ботов, агентов и сервисных компаний.",
  },
  {
    icon: "Handshake",
    title: "Просто по-человечески",
    desc: "Помог — и пошёл дальше. Без рейтингов, без обязательств, без ожидания ответной услуги.",
  },
];

export default function Trust() {
  const container = useRef<HTMLDivElement>(null);

  return (
    <div ref={container} className="bg-white px-6 py-24 lg:py-36">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="uppercase text-neutral-400 text-sm tracking-widest mb-6">Почему это работает</p>
          <h2 className="text-3xl lg:text-6xl font-bold text-neutral-900 leading-tight mb-4 max-w-3xl">
            Абсолютно бескорыстно.<br />Поэтому — безопасно.
          </h2>
          <p className="text-lg text-neutral-500 max-w-2xl mb-16 leading-relaxed">
            Помогу — не биржа услуг и не маркетплейс. Здесь нет никаких денег вообще. Это делает приложение честным по своей природе — обмануть здесь просто нечем.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-neutral-100">
          {points.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white p-8 lg:p-12"
            >
              <div className="w-12 h-12 rounded-full bg-neutral-950 flex items-center justify-center mb-6">
                <Icon name={point.icon} size={20} className="text-white" />
              </div>
              <h3 className="text-neutral-900 text-xl font-bold mb-3">{point.title}</h3>
              <p className="text-neutral-500 text-base leading-relaxed">{point.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 border-l-4 border-neutral-900 pl-6"
        >
          <p className="text-neutral-900 text-xl lg:text-2xl font-semibold leading-relaxed">
            «Когда за помощь не платят — помогают только те, кто действительно хочет помочь.»
          </p>
        </motion.div>
      </div>
    </div>
  );
}

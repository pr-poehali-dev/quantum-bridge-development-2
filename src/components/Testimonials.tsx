import { motion } from "framer-motion";

const reviews = [
  {
    text: "Стало плохо в метро, написала запрос — через три минуты рядом уже стоял человек и помог добраться до дома. Не верила, что такое возможно.",
    name: "Марина К.",
    city: "Москва",
  },
  {
    text: "Переехал в новый город, никого не знал. Попросил совета где найти хорошего врача — мне ответили пятеро. Это ощущение, что ты не один, бесценно.",
    name: "Артём В.",
    city: "Екатеринбург",
  },
  {
    text: "Было очень тяжело морально, просто написал что нужно поговорить. Незнакомый человек провёл со мной час. До сих пор переписываемся.",
    name: "Дмитрий Л.",
    city: "Санкт-Петербург",
  },
  {
    text: "Мама попросила помощи когда шла домой с тяжёлыми сумками. Молодой парень из соседнего двора помог донести. Она была в слезах от благодарности.",
    name: "Ольга Н.",
    city: "Казань",
  },
];

export default function Testimonials() {
  return (
    <div className="bg-white px-6 py-24 lg:py-36">
      <div className="max-w-5xl mx-auto">
        <p className="uppercase text-neutral-400 text-sm tracking-widest mb-4">Истории</p>
        <h2 className="text-3xl lg:text-5xl font-bold text-neutral-900 leading-tight mb-16 max-w-2xl">
          Люди уже помогают друг другу
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white p-8 lg:p-10 flex flex-col justify-between gap-6"
            >
              <p className="text-neutral-700 text-lg leading-relaxed">«{r.text}»</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-neutral-900 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {r.name[0]}
                </div>
                <div>
                  <p className="text-neutral-900 font-semibold text-sm">{r.name}</p>
                  <p className="text-neutral-400 text-xs">{r.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

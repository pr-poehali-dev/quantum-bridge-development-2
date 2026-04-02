import { motion } from "framer-motion";

const requests = [
  { name: "Анна", time: "2 мин назад", radius: "500 м", text: "Стало плохо, не могу дойти до дома. Нужна помощь или просто кто-то рядом.", color: "bg-red-50 border-red-100" },
  { name: "Михаил", time: "7 мин назад", radius: "2 км", text: "Принимаю важное решение по работе. Нужен совет человека с опытом.", color: "bg-blue-50 border-blue-100" },
  { name: "Светлана", time: "12 мин назад", radius: "1 км", text: "Очень тяжело на душе, хочется просто поговорить с живым человеком.", color: "bg-purple-50 border-purple-100" },
  { name: "Дмитрий", time: "18 мин назад", radius: "5 км", text: "Потерялся в незнакомом районе, телефон садится. Подскажите как добраться до центра.", color: "bg-yellow-50 border-yellow-100" },
  { name: "Олеся", time: "25 мин назад", radius: "300 м", text: "Впервые в этом городе, чувствую себя одиноко. Кто готов показать место?", color: "bg-green-50 border-green-100" },
  { name: "Игорь", time: "31 мин назад", radius: "10 км", text: "Нужна помощь — не знаю как сказать близкому человеку важные слова.", color: "bg-orange-50 border-orange-100" },
];

export default function Feed() {
  return (
    <div className="bg-neutral-50 px-6 py-24 lg:py-36 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <p className="uppercase text-neutral-400 text-sm tracking-widest mb-4">Живая лента</p>
        <h2 className="text-3xl lg:text-5xl font-bold text-neutral-900 leading-tight mb-4">
          Прямо сейчас люди просят о помощи
        </h2>
        <p className="text-neutral-500 text-lg mb-16 max-w-xl">
          Каждый запрос — реальная ситуация. Кто-то в твоём радиусе уже ждёт.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`border rounded-none p-6 ${r.color}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {r.name[0]}
                  </div>
                  <span className="text-neutral-900 font-semibold text-sm">{r.name}</span>
                </div>
                <span className="text-neutral-400 text-xs">{r.time}</span>
              </div>
              <p className="text-neutral-700 text-sm leading-relaxed mb-4">{r.text}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400 uppercase tracking-wide">Радиус: {r.radius}</span>
                <span className="text-xs text-neutral-900 font-semibold uppercase tracking-wide cursor-pointer hover:underline">Откликнуться →</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center text-neutral-400 text-sm mt-10"
        >
          * Примеры запросов для иллюстрации
        </motion.p>
      </div>
    </div>
  );
}

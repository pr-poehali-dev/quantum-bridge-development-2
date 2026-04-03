import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const moments = [
  {
    img: "https://cdn.poehali.dev/projects/082bc052-ea5c-4b18-8bb4-ac6e61294045/files/e1285c68-e546-4357-9d92-09127c949972.jpg",
    text: "Человеку стало плохо на улице...",
    sub: "Рядом люди, но все проходят мимо.",
  },
  {
    img: "https://cdn.poehali.dev/projects/082bc052-ea5c-4b18-8bb4-ac6e61294045/files/02b646f0-2635-4528-a76a-485c154228ec.jpg",
    text: "Сломалась машина на дороге...",
    sub: "Машины едут мимо, никто не останавливается.",
  },
  {
    img: "https://cdn.poehali.dev/projects/082bc052-ea5c-4b18-8bb4-ac6e61294045/files/f2d5a49d-217a-4f68-8e82-f470c5fbbdfd.jpg",
    text: "Одиноко и тяжело на душе, хочется поговорить...",
    sub: "Иногда достаточно одного слова от чужого человека.",
  },
  {
    img: "https://cdn.poehali.dev/projects/082bc052-ea5c-4b18-8bb4-ac6e61294045/files/02dde613-555b-4ede-b72f-1732e30b9ed6.jpg",
    text: "Тяжёлый диван нужно занести на пятый этаж...",
    sub: "А лифт не работает, и сделать это одному невозможно.",
  },
  {
    img: "https://cdn.poehali.dev/projects/082bc052-ea5c-4b18-8bb4-ac6e61294045/files/e6ec9339-4acf-4bac-980b-43770a25ee38.jpg",
    text: "Нужен перфоратор на пару часов...",
    sub: "Покупать ради одного раза — жалко. Сосед есть, но неловко просить.",
  },
  {
    img: "https://cdn.poehali.dev/projects/082bc052-ea5c-4b18-8bb4-ac6e61294045/files/1c3e213f-0cd2-41c9-aa80-19c3d68f964b.jpg",
    text: "Бабушка тащит тяжёлые сумки с продуктами...",
    sub: "Хочется помочь, но вдруг она откажется или обидится?",
  },
  {
    img: "https://cdn.poehali.dev/projects/082bc052-ea5c-4b18-8bb4-ac6e61294045/files/6c4aae88-2ca7-4989-b3b3-ad052029192f.jpg",
    text: "Села батарея — машина не заводится...",
    sub: "Провода для прикурки есть, а попросить незнакомца — неловко.",
  },
  {
    img: "https://cdn.poehali.dev/projects/082bc052-ea5c-4b18-8bb4-ac6e61294045/files/c057c5f6-b3c2-456d-93f4-79a7d2b07cba.jpg",
    text: "Не разобраться с компьютером самому...",
    sub: "Рядом молодые соседи, но не знаешь, к кому обратиться.",
  },
  {
    img: "https://cdn.poehali.dev/projects/082bc052-ea5c-4b18-8bb4-ac6e61294045/files/e643afde-4bef-47d0-bfe9-6575bd6ef15a.jpg",
    text: "Срочно уехал, а собаку выгулять некому...",
    sub: "Сосед наверняка бы помог, но как его найти быстро?",
  },
  {
    img: "https://cdn.poehali.dev/projects/082bc052-ea5c-4b18-8bb4-ac6e61294045/files/5e70b9db-0044-4e30-8346-def697d7f937.jpg",
    text: "Потекла труба, а что делать — непонятно...",
    sub: "Рядом может быть сантехник или просто умелый сосед.",
  },
  {
    img: "https://cdn.poehali.dev/projects/082bc052-ea5c-4b18-8bb4-ac6e61294045/files/09cc7d87-ba2b-44f4-bb01-f119361fc838.jpg",
    text: "Переезд, а грузчики подвели...",
    sub: "Коробок много, лифта нет, а соседи даже не знают что нужна помощь.",
  },
  {
    img: "https://cdn.poehali.dev/projects/082bc052-ea5c-4b18-8bb4-ac6e61294045/files/ecdfaa09-da65-4a6e-8a88-d3454926f748.jpg",
    text: "Нужно срочно добраться, а такси нет...",
    sub: "Может, сосед едет в ту же сторону?",
  },
  {
    img: "https://cdn.poehali.dev/projects/082bc052-ea5c-4b18-8bb4-ac6e61294045/files/c441622f-e18c-4a68-acbd-bf6c8beeb33a.jpg",
    text: "Уезжаю, а цветы засохнут...",
    sub: "Полить раз в неделю — пустяк для соседа, но как попросить?",
  },
  {
    img: "https://cdn.poehali.dev/projects/082bc052-ea5c-4b18-8bb4-ac6e61294045/files/a33963ba-d8b2-4c5f-b464-e6e131c377bd.jpg",
    text: "Ребёнка не с кем оставить на пару часов...",
    sub: "Соседка наверняка бы помогла, но неловко беспокоить.",
  },
  {
    img: "https://cdn.poehali.dev/projects/082bc052-ea5c-4b18-8bb4-ac6e61294045/files/41fa940d-ceb2-47e1-9131-e2e57d0e841c.jpg",
    text: "Машину замело снегом с ночи...",
    sub: "Вдвоём откопать — пять минут. Одному — полчаса.",
  },
];

export default function Pain({ onWaitlist }: { onWaitlist: () => void }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [count, setCount] = useState<number | null>(null);

  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0.1, 0.4, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.1, 0.5], [40, 0]);

  useEffect(() => {
    fetch("https://functions.poehali.dev/2d6e5979-4b1e-41d4-95be-e18cad31630f")
      .then(r => r.json())
      .then(data => setCount(data.total || 0))
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("https://functions.poehali.dev/e14a773f-92ac-4edb-9ca9-58365e7b063d", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
        setCount(c => (c !== null ? c + 1 : c));
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div ref={container} className="bg-white px-6 py-24 lg:py-36">
      <div className="max-w-5xl mx-auto">
        <motion.div style={{ opacity, y }}>
          <p className="uppercase text-neutral-400 text-sm tracking-widest mb-6">Знакомо?</p>
          <h2 className="text-3xl lg:text-6xl font-bold text-neutral-900 leading-tight mb-8 max-w-3xl">
            Мы видим, что человеку нужна помощь. И проходим мимо.
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 mb-12 max-w-3xl">
            <p className="flex-1 text-lg lg:text-xl text-neutral-500 leading-relaxed border-l-2 border-neutral-200 pl-5">
              Вы когда-нибудь <span className="text-neutral-900 font-semibold">сожалели, что не помогли</span> человеку и прошли мимо?
            </p>
            <p className="flex-1 text-lg lg:text-xl text-neutral-500 leading-relaxed border-l-2 border-neutral-200 pl-5">
              Вы когда-нибудь <span className="text-neutral-900 font-semibold">стеснялись предложить помощь</span> — вдруг откажут или обидятся?
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200">
          {moments.map((moment, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative overflow-hidden h-72 group"
            >
              <img src={moment.img} alt={moment.text} className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white text-base leading-snug font-semibold mb-1">{moment.text}</p>
                <p className="text-white/60 text-sm italic">{moment.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 border-l-2 border-neutral-900 pl-8 mb-16"
        >
          <p className="text-2xl lg:text-3xl text-neutral-900 leading-relaxed max-w-2xl">
            «Помогу» снимает неловкость. Человек сам просит о помощи — а ты просто откликаешься.
            Никакой неловкости. Только люди, которые хотят помочь.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-neutral-950 p-8 lg:p-12"
        >
          {status === "success" ? (
            <div className="py-4">
              <p className="text-white text-2xl font-bold mb-2">Вы в списке!</p>
              <p className="text-neutral-400">Напишем, как только приложение выйдет.</p>
              {count !== null && (
                <p className="text-neutral-500 text-sm mt-4">
                  Вместе с вами ждут запуска <span className="text-white font-bold">{count}</span> {declension(count)}
                </p>
              )}
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between flex-wrap gap-4 mb-3">
                <p className="text-neutral-400 uppercase text-xs tracking-widest">Скоро в магазинах</p>
                {count !== null && count > 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-neutral-400 text-xs"
                  >
                    Уже ждут: <span className="text-white font-bold text-sm">{count}</span> {declension(count)}
                  </motion.p>
                )}
              </div>
              <p className="text-white text-2xl lg:text-3xl font-bold leading-tight mb-8 max-w-lg">
                Хочу быть первым, кто поможет — и первым, кому помогут.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input
                  type="email"
                  required
                  placeholder="ваш@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-neutral-800 text-white px-4 py-3 text-sm outline-none focus:bg-neutral-700 transition-colors placeholder:text-neutral-500"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-white text-neutral-900 px-6 py-3 text-sm uppercase tracking-widest font-semibold hover:bg-neutral-200 transition-colors disabled:opacity-50 shrink-0"
                >
                  {status === "loading" ? "..." : "Уведомить меня"}
                </button>
              </form>
              {status === "error" && (
                <p className="text-red-400 text-xs mt-2">Что-то пошло не так. Попробуйте ещё раз.</p>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function declension(n: number) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "человек";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return "человека";
  return "человек";
}
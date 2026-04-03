import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const moments = [
  {
    img: "https://cdn.poehali.dev/projects/082bc052-ea5c-4b18-8bb4-ac6e61294045/files/e1285c68-e546-4357-9d92-09127c949972.jpg",
    text: "Стало плохо на улице — держится за сердце...",
    sub: "Рядом люди, но все проходят мимо.",
  },
  {
    img: "https://cdn.poehali.dev/projects/082bc052-ea5c-4b18-8bb4-ac6e61294045/files/02b646f0-2635-4528-a76a-485c154228ec.jpg",
    text: "Сломалась машина на дороге — канистра, трос...",
    sub: "Машины едут мимо, никто не останавливается.",
  },
  {
    img: "https://cdn.poehali.dev/projects/082bc052-ea5c-4b18-8bb4-ac6e61294045/files/f2d5a49d-217a-4f68-8e82-f470c5fbbdfd.jpg",
    text: "Одиноко и тяжело на душе, хочется поговорить...",
    sub: "Иногда достаточно одного слова от чужого человека.",
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
          <h2 className="text-3xl lg:text-6xl font-bold text-neutral-900 leading-tight mb-12 max-w-3xl">
            Мы видим, что человеку нужна помощь. И проходим мимо.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-neutral-200">
          {moments.map((moment, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-white flex flex-col"
            >
              <div className="h-56 overflow-hidden">
                <img src={moment.img} alt={moment.text} className="w-full h-full object-cover grayscale" />
              </div>
              <div className="p-6 lg:p-8">
                <p className="text-neutral-700 text-base leading-relaxed font-medium mb-2">{moment.text}</p>
                <p className="text-neutral-400 text-sm italic">{moment.sub}</p>
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
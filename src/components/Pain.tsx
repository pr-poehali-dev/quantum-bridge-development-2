import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, useState } from "react";

const moments = [
  {
    text: "Стало плохо на улице — не могу дойти до дома...",
    sub: "Рядом люди, но как попросить незнакомца о помощи?",
  },
  {
    text: "Принимаю важное решение и не знаю, как поступить...",
    sub: "Нужен живой человек, который выслушает и поймёт.",
  },
  {
    text: "Чувствую себя одиноко и просто хочу поговорить...",
    sub: "Иногда достаточно одного слова от чужого человека.",
  },
];

export default function Pain({ onWaitlist }: { onWaitlist: () => void }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

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
      if (res.ok) { setStatus("success"); setEmail(""); }
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };
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
          {moments.map((moment, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-white p-8 lg:p-10"
            >
              <p className="text-4xl mb-6 text-neutral-300 font-bold leading-none">0{i + 1}</p>
              <p className="text-neutral-700 text-lg leading-relaxed">{moment.text}</p>
              <p className="mt-4 text-neutral-400 text-sm italic">{moment.sub}</p>
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
            <div className="text-center py-4">
              <p className="text-white text-2xl font-bold mb-2">Вы в списке!</p>
              <p className="text-neutral-400">Напишем, как только приложение выйдет.</p>
            </div>
          ) : (
            <>
              <p className="text-neutral-400 uppercase text-xs tracking-widest mb-3">Скоро в App Store</p>
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
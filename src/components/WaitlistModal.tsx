import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@/components/ui/icon";

interface WaitlistModalProps {
  open: boolean;
  onClose: () => void;
}

export default function WaitlistModal({ open, onClose }: WaitlistModalProps) {
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
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.3 }}
            className="bg-white w-full max-w-md p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900 transition-colors"
            >
              <Icon name="X" size={20} />
            </button>

            {status === "success" ? (
              <div className="text-center py-6">
                <div className="flex justify-center mb-4 text-neutral-900">
                  <Icon name="CheckCircle" size={48} />
                </div>
                <h2 className="text-2xl font-bold tracking-tight mb-2">Вы в списке!</h2>
                <p className="text-neutral-600 text-sm">
                  Напишем вам, как только приложение появится в App Store.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 bg-black text-white px-6 py-3 text-sm uppercase tracking-widest hover:bg-neutral-800 transition-colors w-full"
                >
                  Закрыть
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold tracking-tight mb-2 uppercase">Скоро в App Store</h2>
                <p className="text-neutral-600 text-sm mb-6 leading-relaxed">
                  Оставьте email — напишем первым, когда «Помогу» появится в магазине.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input
                    type="email"
                    required
                    placeholder="ваш@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-black transition-colors placeholder:text-neutral-400"
                  />
                  {status === "error" && (
                    <p className="text-red-500 text-xs">Что-то пошло не так. Попробуйте ещё раз.</p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="bg-black text-white px-6 py-3 text-sm uppercase tracking-widest hover:bg-neutral-800 transition-colors disabled:opacity-50"
                  >
                    {status === "loading" ? "Отправляем..." : "Уведомить меня"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
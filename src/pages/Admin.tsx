import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

interface WaitlistItem {
  id: number;
  email: string;
  created_at: string;
}

const ADMIN_PASSWORD = "Atm2013!";

export default function Admin() {
  const [auth, setAuth] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const [items, setItems] = useState<WaitlistItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === ADMIN_PASSWORD) {
      setAuth(true);
      setError(false);
    } else {
      setError(true);
      setInput("");
    }
  };

  useEffect(() => {
    if (!auth) return;
    fetch("https://functions.poehali.dev/2d6e5979-4b1e-41d4-95be-e18cad31630f")
      .then((r) => r.json())
      .then((data) => {
        setItems(data.items || []);
        setTotal(data.total || 0);
      })
      .finally(() => setLoading(false));
  }, [auth]);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  if (!auth) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <p className="text-neutral-500 text-xs uppercase tracking-widest mb-2 text-center">Дашборд</p>
          <h1 className="text-3xl font-bold text-white text-center mb-10 tracking-tight">ПОМОГУ</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <input
              type="password"
              placeholder="Введите пароль"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
              className="bg-neutral-900 text-white px-4 py-3 text-sm outline-none focus:bg-neutral-800 transition-colors placeholder:text-neutral-600"
            />
            {error && <p className="text-red-400 text-xs">Неверный пароль</p>}
            <button
              type="submit"
              className="bg-white text-neutral-900 px-6 py-3 text-sm uppercase tracking-widest font-semibold hover:bg-neutral-200 transition-colors"
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-neutral-500 text-xs uppercase tracking-widest mb-1">Дашборд</p>
            <h1 className="text-3xl font-bold tracking-tight">ПОМОГУ</h1>
          </div>
          <a href="/" className="text-neutral-400 hover:text-white text-sm transition-colors flex items-center gap-2">
            <Icon name="ArrowLeft" size={16} />
            На сайт
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-neutral-900 p-6">
            <p className="text-neutral-500 text-xs uppercase tracking-widest mb-2">Всего заявок</p>
            <p className="text-4xl font-bold">{loading ? "—" : total}</p>
          </div>
          <div className="bg-neutral-900 p-6">
            <p className="text-neutral-500 text-xs uppercase tracking-widest mb-2">Сегодня</p>
            <p className="text-4xl font-bold">
              {loading ? "—" : items.filter(i => new Date(i.created_at).toDateString() === new Date().toDateString()).length}
            </p>
          </div>
          <div className="bg-neutral-900 p-6">
            <p className="text-neutral-500 text-xs uppercase tracking-widest mb-2">Последняя</p>
            <p className="text-sm font-medium mt-2 text-neutral-300">
              {loading || !items.length ? "—" : formatDate(items[0].created_at)}
            </p>
          </div>
        </div>

        <div className="bg-neutral-900">
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
            <p className="text-sm font-semibold uppercase tracking-wide">Email-заявки</p>
            <p className="text-neutral-500 text-xs">{total} записей</p>
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-20 text-neutral-500">
              <Icon name="Loader" size={20} className="animate-spin mr-3" />
              Загрузка...
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-20 text-neutral-500">
              <Icon name="Inbox" size={32} className="mx-auto mb-3 opacity-40" />
              <p>Заявок пока нет</p>
            </div>
          ) : (
            <div className="divide-y divide-neutral-800">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-bold text-neutral-400 shrink-0">
                      {item.email[0].toUpperCase()}
                    </div>
                    <span className="text-sm text-white">{item.email}</span>
                  </div>
                  <span className="text-neutral-500 text-xs shrink-0 ml-4">{formatDate(item.created_at)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

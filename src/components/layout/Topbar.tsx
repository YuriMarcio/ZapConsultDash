import { Bell, Search, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function Topbar({ title }: { title?: string }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const initial = stored === "dark";
    setDark(initial);
    document.documentElement.classList.toggle("dark", initial);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-sm flex items-center justify-between px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <div className="flex items-center px-3 py-1.5 bg-muted rounded border border-border">
          <span className="text-xs text-muted-foreground mr-2">Unidade:</span>
          <span className="text-xs font-bold">Jardins, SP</span>
        </div>
        {title && <span className="text-sm text-muted-foreground hidden md:inline">/ {title}</span>}
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-muted rounded border border-border w-72">
          <Search className="size-3.5 text-muted-foreground" />
          <input
            placeholder="Buscar pedidos, clientes…"
            className="bg-transparent text-xs flex-1 outline-none placeholder:text-muted-foreground"
          />
          <span className="text-[10px] font-mono px-1.5 py-0.5 bg-background rounded border border-border text-muted-foreground">
            ⌘K
          </span>
        </div>
        <button
          onClick={toggleTheme}
          className="size-8 rounded border border-border flex items-center justify-center hover:bg-muted transition-colors"
          aria-label="Alternar tema"
        >
          {dark ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
        </button>
        <button className="size-8 rounded border border-border flex items-center justify-center hover:bg-muted transition-colors relative">
          <Bell className="size-3.5" />
          <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-accent" />
        </button>
        <div className="h-8 w-px bg-border" />
        <div className="size-8 rounded-full bg-gradient-to-br from-accent to-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
          MS
        </div>
      </div>
    </header>
  );
}

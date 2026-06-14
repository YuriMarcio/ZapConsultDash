import { Link, useRouterState } from "@tanstack/react-router";
import { UtensilsCrossed, Tag } from "lucide-react";

const TABS = [
  { to: "/produtos", label: "Cardápio", icon: UtensilsCrossed },
  { to: "/promocoes", label: "Promoções", icon: Tag },
] as const;

export function ProdutosTabs() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="mb-6 flex gap-1 p-1 bg-muted rounded-lg w-full sm:w-fit">
      {TABS.map((t) => {
        const active = pathname === t.to;
        const Icon = t.icon;
        return (
          <Link
            key={t.to}
            to={t.to}
            className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition ${
              active
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="size-3.5" />
            {t.label}
          </Link>
        );
      })}
    </div>
  );
}

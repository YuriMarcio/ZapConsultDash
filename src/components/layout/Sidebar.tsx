import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  MessageCircle,
  ClipboardList,
  Wallet,
  UtensilsCrossed,
  Zap,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/conversas", label: "Conversas", icon: MessageCircle, badge: 3 },
  { to: "/pedidos", label: "Pedidos", icon: ClipboardList, badge: 4 },
  { to: "/financeiro", label: "Financeiro", icon: Wallet },
  { to: "/produtos", label: "Produtos", icon: UtensilsCrossed },
] as const;

const CONFIG = [
  { to: "/automacao", label: "Automação", icon: Zap },
  { to: "/ajustes", label: "Ajustes", icon: Settings },
] as const;

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="w-[240px] border-r border-border bg-sidebar flex flex-col shrink-0 h-screen sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-border">
        <div className="size-7 bg-primary rounded-sm flex items-center justify-center mr-3">
          <div className="w-2.5 h-2.5 bg-primary-foreground" />
        </div>
        <span className="font-semibold tracking-tight text-lg uppercase">Sinal</span>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-2 mb-2">
          Menu
        </div>
        {NAV.map((item) => {
          const active = pathname === item.to || pathname.startsWith(item.to + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                active
                  ? "bg-primary/5 text-primary"
                  : "text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground",
              )}
            >
              <Icon className="size-4 shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.badge !== undefined && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-accent/15 text-accent rounded">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        <div className="pt-6">
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-2 mb-2">
            Configuração
          </div>
          {CONFIG.map((item) => {
            const active = pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  active
                    ? "bg-primary/5 text-primary"
                    : "text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground",
                )}
              >
                <Icon className="size-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 p-2 bg-muted rounded-lg border border-black/5 dark:border-white/5">
          <div className="size-8 rounded-full bg-gradient-to-br from-accent to-primary text-primary-foreground shrink-0 flex items-center justify-center text-xs font-bold">
            MS
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-xs font-semibold truncate">Matheus Silva</p>
            <p className="text-[10px] text-muted-foreground truncate">Plano Enterprise</p>
          </div>
          <Link to="/login" className="text-muted-foreground hover:text-foreground transition-colors">
            <LogOut className="size-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}

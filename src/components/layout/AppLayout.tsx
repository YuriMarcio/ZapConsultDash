import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function AppLayout({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <Topbar title={title} />
        <div className="flex-1 p-8">{children}</div>
      </main>
    </div>
  );
}

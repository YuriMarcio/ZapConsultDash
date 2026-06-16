import { useState } from "react";
import { AppLayout } from "@/components/templates/AppLayout";
import { AutomacaoTemplateList } from "@/components/organisms/AutomacaoTemplateList";
import { AutomacaoEditor } from "@/components/organisms/AutomacaoEditor";
import { AUTOMATIONS } from "@/lib/mock-data";

export function AutomacaoPage() {
  const [items, setItems] = useState(AUTOMATIONS.map((a) => ({ ...a })));
  const [selectedId, setSelectedId] = useState(items[0].id);
  const selected = items.find((i) => i.id === selectedId)!;

  const toggle = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, enabled: !i.enabled } : i)));
  };

  const updateBody = (body: string) => {
    setItems((prev) => prev.map((i) => (i.id === selectedId ? { ...i, body } : i)));
  };

  const preview = selected.body
    .replace(/{{nome}}/g, "Ana Clara")
    .replace(/{{pedido}}/g, "10293")
    .replace(/{{valor}}/g, "142,50");

  return (
    <AppLayout title="Automação">
      <div className="mb-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-2">
          Mensagens
        </p>
        <h1 className="text-2xl font-bold tracking-tight">Automações</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Configure respostas automáticas e disparos por evento.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <AutomacaoTemplateList
          items={items}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onToggle={toggle}
        />
        <AutomacaoEditor
          automation={selected}
          preview={preview}
          onBodyChange={updateBody}
        />
      </div>
    </AppLayout>
  );
}

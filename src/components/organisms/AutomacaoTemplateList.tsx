import { TemplateCard } from "@/components/molecules/TemplateCard";

type Automation = {
  id: string;
  title: string;
  enabled: boolean;
  body: string;
};

export function AutomacaoTemplateList({
  items,
  selectedId,
  onSelect,
  onToggle,
}: {
  items: Automation[];
  selectedId: string;
  onSelect: (id: string) => void;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="lg:col-span-5 space-y-2">
      {items.map((a) => (
        <TemplateCard
          key={a.id}
          automation={a}
          selected={selectedId === a.id}
          onSelect={() => onSelect(a.id)}
          onToggle={() => onToggle(a.id)}
        />
      ))}
    </div>
  );
}

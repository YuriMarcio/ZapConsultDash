import { useState, useEffect } from "react";
import type { Promotion } from "@/api/types";
import { useProducts } from "@/api/services/products.service";
import { Plus, X, Save, BadgePercent, Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const TYPE_LABEL: Record<Promotion["type"], string> = {
  percent: "% Desconto",
  fixed: "Preço fixo",
  combo: "Combo",
};

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block">
      {children}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full px-3 py-2 bg-card border border-border rounded text-sm outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition ${props.className || ""}`}
    />
  );
}

export function PromocaoDialog({
  open,
  onOpenChange,
  promotion,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  promotion: Promotion | null;
  onSubmit: (p: Promotion) => void;
}) {
  const { data: productsData } = useProducts();
  const products = productsData?.data ?? [];
  const firstProductId = products[0]?.id ?? "";

  const isEdit = !!promotion;
  const [name, setName] = useState("");
  const [productId, setProductId] = useState(firstProductId);
  const [type, setType] = useState<Promotion["type"]>("percent");
  const [discount, setDiscount] = useState("10");
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10));
  const [active, setActive] = useState(true);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (promotion) {
      setName(promotion.name);
      setProductId(promotion.productId);
      setType(promotion.type);
      setDiscount(String(promotion.discount));
      setStartDate(promotion.startDate);
      setEndDate(promotion.endDate);
      setActive(promotion.active);
      setDescription(promotion.description || "");
    } else if (open) {
      setName("");
      setProductId(firstProductId);
      setType("percent");
      setDiscount("10");
      setStartDate(new Date().toISOString().slice(0, 10));
      setEndDate(new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10));
      setActive(true);
      setDescription("");
    }
  }, [promotion, open]);

  const product = products.find((p) => p.id === productId) ?? products[0];
  const numericDiscount = parseFloat(discount.replace(",", ".")) || 0;
  const promoPrice =
    type === "percent"
      ? Math.max(0, product.price * (1 - numericDiscount / 100))
      : type === "fixed"
        ? numericDiscount
        : Math.max(0, product.price - numericDiscount);
  const savings = Math.max(0, product.price - promoPrice);
  const savingsPct = product.price ? Math.round((savings / product.price) * 100) : 0;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({
      id: promotion?.id || `pr${Date.now()}`,
      name: name.trim(),
      productId: product.id,
      productName: product.name,
      type,
      discount: numericDiscount,
      originalPrice: product.price,
      promoPrice: Number(promoPrice.toFixed(2)),
      startDate,
      endDate,
      active,
      description: description.trim(),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[92vh] overflow-y-auto p-0 gap-0">
        <DialogHeader className="px-5 sm:px-6 pt-6 pb-4 border-b border-border">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-1">Promoção</p>
          <DialogTitle className="text-xl font-bold tracking-tight">
            {isEdit ? "Editar promoção" : "Nova promoção"}
          </DialogTitle>
          <DialogDescription className="text-xs">
            Vincule um produto, defina o desconto e o período da campanha no WhatsApp.
          </DialogDescription>
        </DialogHeader>

        <div className="grid lg:grid-cols-[1fr_280px]">
          <form onSubmit={submit} className="px-5 sm:px-6 py-5 space-y-5 order-2 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label>Nome da promoção *</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Sexta do Bacon" required />
              </div>
              <div className="sm:col-span-2">
                <Label>Produto vinculado *</Label>
                <select
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  className="w-full px-3 py-2 bg-card border border-border rounded text-sm outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — R$ {p.price.toFixed(2).replace(".", ",")}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Tipo de desconto</Label>
                <div className="grid grid-cols-3 gap-1 p-1 bg-muted rounded">
                  {(["percent", "fixed", "combo"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setType(t)}
                      className={`px-2 py-1.5 text-[11px] font-semibold rounded transition ${
                        type === t ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {TYPE_LABEL[t]}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label>
                  {type === "percent" ? "Desconto (%)" : type === "fixed" ? "Preço promocional (R$)" : "Valor abatido (R$)"}
                </Label>
                <Input value={discount} onChange={(e) => setDiscount(e.target.value)} inputMode="decimal" className="font-mono" />
              </div>
              <div>
                <Label>Início da campanha *</Label>
                <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
              </div>
              <div>
                <Label>Fim da campanha *</Label>
                <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} min={startDate} required />
              </div>
              <div className="sm:col-span-2">
                <Label>Mensagem opcional</Label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  placeholder="Aparece no card enviado no WhatsApp"
                  className="w-full px-3 py-2 bg-card border border-border rounded text-sm outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition resize-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="flex items-center gap-3 px-3 py-2 bg-card border border-border rounded cursor-pointer hover:bg-muted/50 transition">
                  <button
                    type="button"
                    onClick={() => setActive(!active)}
                    className={`relative w-9 h-5 rounded-full transition-colors shrink-0 ${active ? "bg-emerald-500" : "bg-muted-foreground/30"}`}
                  >
                    <span className={`absolute top-0.5 size-4 bg-white rounded-full shadow transition-transform ${active ? "translate-x-4" : "translate-x-0.5"}`} />
                  </button>
                  <div className="flex-1">
                    <div className="text-xs font-semibold">{active ? "Promoção ativa" : "Promoção pausada"}</div>
                    <div className="text-[10px] text-muted-foreground">
                      {active ? "Será disparada no atendimento dentro do período" : "Não aparece para o cliente"}
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-5 border-t border-border -mx-5 sm:-mx-6 px-5 sm:px-6">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="px-4 py-2 text-xs font-bold uppercase tracking-widest border border-border rounded hover:bg-muted transition flex items-center justify-center gap-2"
              >
                <X className="size-3.5" /> Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold uppercase tracking-widest bg-primary text-primary-foreground rounded hover:opacity-90 transition flex items-center justify-center gap-2"
              >
                {isEdit ? <><Save className="size-3.5" /> Salvar</> : <><Plus className="size-3.5" /> Criar promoção</>}
              </button>
            </DialogFooter>
          </form>

          <aside className="order-1 lg:order-2 bg-muted/40 border-b lg:border-b-0 lg:border-l border-border p-5 sm:p-6 flex flex-col gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-1 flex items-center gap-1.5">
                <BadgePercent className="size-3" /> Resumo da oferta
              </p>
              <p className="text-[11px] text-muted-foreground">Como o cliente vai enxergar essa promoção.</p>
            </div>

            <div className="bg-background rounded-xl border border-border p-4 ring-1 ring-black/5">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{product.category}</div>
              <div className="font-bold text-sm tracking-tight mt-0.5">{product.name}</div>
              <div className="mt-3 flex items-end gap-2">
                <span className="text-2xl font-bold font-mono text-emerald-600">
                  R$ {promoPrice.toFixed(2).replace(".", ",")}
                </span>
                <span className="text-xs text-muted-foreground line-through mb-1 font-mono">
                  R$ {product.price.toFixed(2).replace(".", ",")}
                </span>
              </div>
              <div className="mt-1 text-[11px] font-semibold text-emerald-600">
                Economia de R$ {savings.toFixed(2).replace(".", ",")} ({savingsPct}%)
              </div>
              <div className="mt-3 pt-3 border-t border-border text-[11px] text-muted-foreground flex items-center gap-1.5">
                <Calendar className="size-3" />
                {formatDate(startDate)} → {formatDate(endDate)}
              </div>
            </div>
          </aside>
        </div>
      </DialogContent>
    </Dialog>
  );
}

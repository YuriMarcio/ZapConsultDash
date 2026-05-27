import { ImagePlus, Tag, MessageCircle, Reply, Plus } from "lucide-react";

export interface WhatsappPreviewProps {
  name: string;
  price: number;
  description?: string;
  imageUrl?: string | null;
  storeName?: string;
}

/**
 * Mimics how the product appears inside a WhatsApp chat bubble
 * (dark green outgoing-style card with image, name, price and description).
 */
export function WhatsappProductPreview({
  name,
  price,
  description,
  imageUrl,
  storeName = "Cantinho Lanches Do Bairro",
}: WhatsappPreviewProps) {
  const displayName = name?.trim() || "Nome do produto";
  const displayDesc =
    description?.trim() ||
    "Adicione uma descrição apetitosa para o cliente — ingredientes, modo de preparo, diferenciais.";
  const priceLabel = `R$ ${(Number.isFinite(price) ? price : 0)
    .toFixed(2)
    .replace(".", ",")}`;

  return (
    <div className="w-full max-w-[300px] mx-auto rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/20 bg-[#0b3b2e] text-white font-sans">
      {/* Image */}
      <div className="aspect-square bg-[#062018] relative">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt={displayName} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-emerald-200/40">
            <ImagePlus className="size-10" />
            <span className="text-[10px] uppercase tracking-widest">Sem foto</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="px-3.5 py-3 space-y-2">
        <p className="text-[15px] font-semibold leading-snug text-white">
          {displayName} <span className="text-base">🍔</span>
        </p>

        <div className="flex items-center gap-1.5 text-[13px] text-emerald-100/90">
          <Tag className="size-3.5 -rotate-90" />
          <span>
            Por: <span className="font-semibold text-white">{priceLabel}</span>
          </span>
        </div>

        <div className="flex items-start gap-1.5 text-[12.5px] text-emerald-50/85 leading-snug">
          <MessageCircle className="size-3.5 mt-0.5 shrink-0" />
          <p className="italic">"{displayDesc}"</p>
        </div>

        {/* Action row */}
        <div className="pt-2 mt-1 border-t border-white/10 flex items-center justify-center gap-5 text-emerald-300 text-[13px] font-medium">
          <button
            type="button"
            className="flex items-center gap-1.5 hover:text-emerald-200 transition-colors"
          >
            <Reply className="size-4" />
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 hover:text-emerald-200 transition-colors"
          >
            <Plus className="size-4" />
            <span>Adicionar 1</span>
          </button>
        </div>
      </div>

      {/* Sender label (tiny) */}
      <div className="px-3.5 pb-2 -mt-1">
        <p className="text-[10px] text-emerald-200/50 truncate">via {storeName}</p>
      </div>
    </div>
  );
}

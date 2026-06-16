import { WhatsappProductPreview } from "@/components/molecules/WhatsappProductPreview";
import type { Product } from "@/api/types";
import { Smartphone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function WhatsappPreviewDialog({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!product} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md p-0 gap-0 bg-card">
        <DialogHeader className="px-5 pt-5 pb-3 border-b border-border">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-600 mb-1 flex items-center gap-1.5">
            <Smartphone className="size-3" /> Pré-visualização WhatsApp
          </p>
          <DialogTitle className="text-base font-bold">Como o cliente vai ver</DialogTitle>
          <DialogDescription className="text-xs">
            Esta é uma simulação fiel do card enviado no chat do WhatsApp.
          </DialogDescription>
        </DialogHeader>
        <div className="p-6 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22><circle cx=%221%22 cy=%221%22 r=%221%22 fill=%22%23d4cdbf%22 opacity=%220.3%22/></svg>')] bg-[#e5ddd5] dark:bg-[#0b141a] flex items-center justify-center">
          {product && (
            <WhatsappProductPreview
              name={product.name}
              price={product.price}
              description={product.description}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

import { cn } from "@/lib/utils";

const sizes = {
  sm: "size-7 text-[9px]",
  md: "size-8 text-xs",
  lg: "size-9 text-[10px]",
};

export function AvatarInitials({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={cn(
        "rounded-full bg-gradient-to-br from-accent/30 to-primary/20 flex items-center justify-center font-bold shrink-0",
        sizes[size],
      )}
    >
      {initials}
    </div>
  );
}

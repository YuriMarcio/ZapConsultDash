export function FormInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full px-3 py-2 bg-card border border-border rounded text-sm outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition ${
        props.className || ""
      }`}
    />
  );
}

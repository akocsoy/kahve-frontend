import clsx from "clsx";

type BadgeVariant = "promo" | "stock";

interface BadgeProps {
  text: string;
  variant: BadgeVariant;
  stockLevel?: number; // only used if variant === "stock"
}

export default function Badge({ text, variant, stockLevel }: BadgeProps) {
  const stockColor =
    stockLevel === undefined
      ? "bg-gray-200 text-gray-700"
      : stockLevel > 20
      ? "bg-green-100 text-green-700"
      : stockLevel > 10
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <span
      className={clsx(
        "inline-flex items-center px-2 py-1 text-xs font-semibold rounded-md",
        variant === "promo" && "bg-red-500 text-white",
        variant === "stock" && stockColor
      )}
    >
      {variant === "stock" && (
        <span className="w-2 h-2 rounded-full bg-current mr-2" />
      )}
      {text}
    </span>
  );
}

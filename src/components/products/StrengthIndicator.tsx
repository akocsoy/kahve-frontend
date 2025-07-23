import { Coffee } from "lucide-react";
import clsx from "clsx";

type Props = {
  value: number; // 1–5
};

const getColor = (index: number) => {
  const colors = ["text-green-600", "text-lime-500", "text-yellow-500", "text-orange-500", "text-red-500"];
  return colors[index] || "text-gray-300";
};

export default function StrengthIndicator({ value }: Props) {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <Coffee
          key={i}
          size={20}
          className={clsx(
            "transition",
            i < value ? getColor(i) : "text-gray-300"
          )}
          fill={i < value ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
}

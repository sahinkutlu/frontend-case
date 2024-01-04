import { X } from "lucide-react";

type CharacterBadgeProps = {
  name: string;
  onRemove: () => void;
};

export default function CharacterBadge({
  name,
  onRemove,
}: CharacterBadgeProps) {
  return (
    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100">
      <span className="ml-2 text-slate-800">{name}</span>
      <button
        onClick={onRemove}
        className="flex items-center justify-center w-6 h-6 rounded-md text-slate-100 bg-slate-400"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

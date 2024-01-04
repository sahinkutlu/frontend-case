import clsx from "clsx";
import { splitWithSearchString } from "../helpers/string";

type CharacterOptionProps = {
  selected: boolean;
  onSelect?: React.InputHTMLAttributes<HTMLInputElement>["onChange"];
  searchString?: string;
  character: {
    name: string;
    image: string;
    episodeCount: number;
  };
  noBorder?: boolean;
};

export default function CharacterOption({
  selected,
  onSelect,
  searchString,
  character,
  noBorder,
}: CharacterOptionProps) {
  return (
    <div
      className={clsx(
        "flex items-center gap-4 px-3 py-4 bg-slate-50 bg-opacity-50",
        !noBorder && " border-b border-slate-400"
      )}
    >
      <input type="checkbox" checked={selected} onChange={onSelect} />
      <img
        src={character.image}
        className="object-cover w-12 h-12 rounded-lg"
      />
      <div className="flex flex-col justify-between">
        <span className="text-lg text-slate-800">
          {splitWithSearchString(character.name, searchString || "").map((s) =>
            s.isBold ? <b>{s.text}</b> : s.text
          )}
        </span>
        <span className="text-sm text-slate-600">
          {character.episodeCount} Episodes
        </span>
      </div>
    </div>
  );
}

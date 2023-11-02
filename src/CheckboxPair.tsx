import clsx from "clsx";
import React, { useRef } from "react";

type CheckboxPairProps = {
  checked: boolean;
  label: string;
  onChange: React.InputHTMLAttributes<HTMLInputElement>["onChange"];
};

export default function CheckboxPair({
  checked,
  label,
  onChange,
}: CheckboxPairProps) {
  const ref = useRef<null | HTMLInputElement>(null);

  return (
    <label
      className={clsx(
        "flex items-center gap-4",
        checked ? "text-blue-700 order-1" : "text-gray-600 order-2"
      )}
    >
      <button
        className="flex w-4 h-4 p-0.5 bg-white border border-gray-300"
        onClick={() => ref.current?.click()}
      >
        {checked && (
          <div className="w-full h-full m-auto bg-blue-700 pointer-events-none" />
        )}
      </button>
      <span dangerouslySetInnerHTML={{ __html: label }} />
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
    </label>
  );
}

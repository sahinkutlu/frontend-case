import React, { ForwardedRef } from "react";
import Spinner from "./Spinner";
import { ChevronDown, ChevronUp, Eye, EyeOff } from "lucide-react";

type SearchInputProps = {
  onChange?: React.InputHTMLAttributes<HTMLInputElement>["onChange"];
  onToggleResults?: () => void;
  onToggleBadges?: () => void;
  showResults?: boolean;
  showBadges?: boolean;
  placeholder: string;
  loading?: boolean;
  children?: React.ReactNode;
};

// ref forwarded for performance
const SearchInput = React.forwardRef(
  (
    {
      onChange,
      placeholder,
      loading,
      children,
      showResults,
      showBadges,
      onToggleResults,
      onToggleBadges,
    }: SearchInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className="flex items-center justify-between gap-4 p-1 border shadow-md rounded-xl border-slate-400">
        <div className="flex flex-1">
          <div className="flex flex-wrap gap-1">
            {children}
            <input
              ref={ref}
              onChange={onChange}
              placeholder={placeholder}
              className="px-2 py-1 border-none outline-none active:border-none "
            />
          </div>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex gap-1 text-slate-800">
            <button
              onClick={onToggleBadges}
              title={`${showBadges ? "Hide" : "Show"} results`}
            >
              {showBadges ? <Eye /> : <EyeOff />}
            </button>
            <button
              onClick={onToggleResults}
              title={`${showResults ? "Hide" : "Show"} results`}
            >
              {showResults ? <ChevronDown /> : <ChevronUp />}
            </button>
          </div>
        )}
      </div>
    );
  }
);

export default SearchInput;

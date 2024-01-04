import React, { useCallback, useRef, useState } from "react";
import SearchInput from "./SearchInput";
import { debounce, throttle } from "lodash";
import CharacterOption from "./CharacterOption";
import CharacterBadge from "./CharacterBadge";
import { getOptions } from "../api/api";
import type { ApiCharacter, ApiInfo, ApiResult } from "../types/api";
import type { Selectable } from "../types/app";

const debounceDelay = 400;

export default function App() {
  const [selected, setSelected] = useState(new Map<number, string>());
  const [options, setOptions] = useState<ApiCharacter[]>([]);
  const [info, setInfo] = useState<ApiInfo>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showBadges, setShowBadges] = useState(true);
  const [showResults, setShowResults] = useState(true);

  const input = useRef<HTMLInputElement | null>(null);

  const inputDebounceCallback = useCallback(
    debounce(fetchOptions, debounceDelay),
    []
  );

  const infiniteScrollCallback = useCallback(
    throttle(fetchMore, debounceDelay, {
      trailing: false,
    }),
    []
  );

  function applySelected(characters: ApiCharacter[]) {
    return characters.map((c) =>
      selected.has(c.id) ? { ...c, selected: true } : { ...c, selected: false }
    ) satisfies Selectable<ApiCharacter>[];
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLoading(true);
    inputDebounceCallback(e.target.value);
  }

  function fetchOptions(value: string) {
    if (!value) {
      setLoading(false);
      setError("");
      setInfo(undefined);
      setOptions([]);
      return;
    }

    getOptions(value)
      .then(async (res) => {
        const { error, info, results } = (await res.json()) as ApiResult;
        if (error !== undefined) {
          setError(error);
          return;
        }

        setError("");
        // seperated because options will increase while info will only change
        setInfo(info);
        setOptions(results);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }

  function fetchMore(url: string) {
    fetch(url)
      .then(async (res) => {
        const { error, info, results } = (await res.json()) as ApiResult;
        if (error !== undefined) {
          setError(error);
          return;
        }

        setError("");
        setInfo(info);
        setOptions((o) => [...o, ...results]);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }

  function handleSelect(
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    name: string
  ) {
    const { checked } = e.target;
    if (checked) {
      setSelected((s) => {
        s.set(id, name);
        return s;
      });
    } else {
      setSelected((s) => {
        s.delete(id);
        return s;
      });
    }

    setOptions((o) =>
      o.map((option) =>
        option.id === id ? { ...option, selected: checked } : option
      )
    );
  }

  function handleScroll(e: React.UIEvent<HTMLDivElement>) {
    if (!info?.next) {
      return;
    }
    const offset = 100;

    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

    if (scrollTop + clientHeight >= scrollHeight - offset) {
      setLoading(true);
      infiniteScrollCallback(info.next);
    }
  }

  function handleRemove(id: number) {
    setSelected((s) => {
      s.delete(id);
      return s;
    });

    setOptions((o) =>
      o.map((option) =>
        option.id === id ? { ...option, selected: false } : option
      )
    );
  }

  return (
    <div className="flex flex-col gap-4 mx-4 my-6 max-w-[480px]">
      <SearchInput
        placeholder="Search..."
        onChange={handleChange}
        loading={loading}
        ref={input}
        onToggleResults={() => setShowResults((s) => !s)}
        onToggleBadges={() => setShowBadges((s) => !s)}
        showBadges={showBadges}
        showResults={showResults}
      >
        {showBadges &&
          [...selected.entries()].map(([k, v]) => (
            <CharacterBadge key={k} name={v} onRemove={() => handleRemove(k)} />
          ))}
      </SearchInput>
      {showResults && options.length > 0 && (
        <div
          className="overflow-y-auto rounded-xl max-h-[540px] border border-slate-400"
          onScroll={handleScroll}
        >
          {applySelected(options).map((o, i) => (
            <CharacterOption
              character={{
                episodeCount: o.episode.length,
                image: o.image,
                name: o.name,
              }}
              searchString={input.current?.value}
              selected={o.selected}
              onSelect={(e) => handleSelect(e, o.id, o.name)}
              noBorder={i == options.length - 1}
            />
          ))}
        </div>
      )}
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}

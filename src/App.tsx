import React, { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import Fuse from "fuse.js";
import CheckboxPair from "./CheckboxPair";
import clsx from "clsx";

type Data = {
  data: string[];
};

type Checkbox = {
  label: string;
  checked: boolean;
};

export default function App() {
  const [checkboxes, setCheckboxes] = useState<Checkbox[]>([]);
  const [indexes, setIndexes] = useState<number[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>("");
  const [error, setError] = useState<string>("");

  const fuse = new Fuse(checkboxes, { keys: ["label"] });

  useEffect(() => {
    function fetchData() {
      return fetch("../assets/items.json")
        .then((res) => res.json())
        .catch(() => {
          setError("Kategoriler alınamadı");
        }) as Promise<Data | undefined>;
    }

    function checkHistory(value: string) {
      if (localStorage.getItem(value) != null) return true;
      return false;
    }

    async function initialize() {
      const data = await fetchData();
      if (!data) return;

      const state: Checkbox[] = data.data.map((s) => ({
        checked: checkHistory(s),
        label: s,
      }));

      setCheckboxes(state);
      setLoading(false);
    }

    initialize();
  }, []);

  function handleFilter(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    const indexes = fuse.search(value).map((v) => v.refIndex);

    setFilter(value);

    if (!value) {
      setIndexes(null);
      return;
    }
    setIndexes(indexes);
  }

  function handleChecked(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    const { checked } = e.target;
    const { label } = checkboxes[index];

    setCheckboxes((prev) =>
      prev.map((p, i) => (i === index ? { checked, label } : p))
    );

    if (checked) {
      localStorage.setItem(label, "true");
      return;
    }

    localStorage.removeItem(label);
  }

  return (
    <div className="px-4 py-10 ">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="border border-gray-300 rounded-xl p-8 flex flex-col items-start gap-6 bg-gray-100 max-w-[400px] font-semibold">
          <h1 className="text-lg leading-4">Kategoriler</h1>
          <SearchInput value={filter} onChange={handleFilter} />
          {indexes && indexes.length == 0 && (
            <p className="italic text-gray-600">
              Kategori "{filter}" bulunamadı
            </p>
          )}
          <div
            className={clsx(
              "flex flex-col w-full gap-4 overflow-y-auto max-h-[264px]",
              loading && "animate-pulse bg-gray-200 rounded>"
            )}
          >
            {checkboxes.map((c, i) =>
              !indexes || c.checked || indexes.includes(i) ? (
                <CheckboxPair
                  key={i}
                  label={c.label}
                  checked={c.checked}
                  onChange={(e) => handleChecked(e, i)}
                />
              ) : (
                <React.Fragment key={i} />
              )
            )}
          </div>
          <button
            className="flex items-center justify-center w-full py-3 text-white transition-all bg-blue-700 border-b-2 rounded hover:bg-blue-600 hover active:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed border-b-gray-800"
            disabled={loading}
          >
            Ara
          </button>
        </div>
      )}
    </div>
  );
}

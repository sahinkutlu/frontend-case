import { useMemo, useState } from "react";
import "./App.css";
import MultiSelect from "./components/multiSelect/MultiSelect.container";
import useFetch from "./hooks/useFetch";
import { CharacterResponse } from "./types/general";
import { MultiSelectOption } from "./components/multiSelect/MultiSelect.types";

const getApiURL = () => process.env.REACT_APP_API_CHARACTER_BASE ?? "";
const buildNameQueryParam = (searchText: string) => `?name=${searchText}`;

function App() {
  const [searchText, setSearchText] = useState("");
  const [selectedCharacters, setSelectedCharacters] = useState<MultiSelectOption[]>([]);
  const { data, loading, error } = useFetch<CharacterResponse>(getApiURL(), buildNameQueryParam(searchText));

  const multiSelectOptions: MultiSelectOption[] = useMemo(() => {
    if (data === null || data.error !== undefined) {
      return [];
    }
    return data.results.map<MultiSelectOption>((character) => {
      const numOfEpisodes = character.episode.length;
      const description = numOfEpisodes === 1 ? `${numOfEpisodes} Episode` : `${numOfEpisodes} Episodes`;
      return {
        id: character.id,
        title: character.name,
        description,
        imageUrl: character.image
      };
    });
  }, [data]);

  return (
    <div className="App">
      <MultiSelect
        searchText={searchText}
        setSearchText={setSearchText}
        options={multiSelectOptions}
        loading={loading}
        error={data?.error ?? error}
        selectedOptions={selectedCharacters}
        setSelectedOptions={setSelectedCharacters}
      />
    </div>
  );
}

export default App;

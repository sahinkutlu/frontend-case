import { useCallback, useState } from "react";

import { MultiSelect } from "@/components/multi-select";

import { CharacterProps } from ".";
import RickAndMortyListItem from "./RickAndMortyListItem";

const RickAndMortySelect = () => {
    // FILTER TEXT
    const [filterText, setFilterText] = useState<string>("");
    const updateFilterText = useCallback(
        (text: string) => setFilterText(text),
        []
    );
    // SELECTED ITEMS
    const [selectedItems, setSelectedItems] = useState<CharacterProps[]>([]);
    const updateSelectedItems = useCallback(
        (items: CharacterProps[]) => setSelectedItems(items),
        []
    );
    const renderCustomDisplay = useCallback(
        (character: CharacterProps) => (
            <RickAndMortyListItem
                character={character}
                filterText={filterText}
            />
        ),
        [filterText]
    );
    return (
        <div className="w-full max-w-lg p-3">
            <MultiSelect
                label="Rick and Morty Character Search"
                aria-label="Rick and Morty Character Search"
                url="https://rickandmortyapi.com/api/character/"
                selectedItems={selectedItems}
                onChange={updateSelectedItems}
                displayValue={renderCustomDisplay}
                listClasses="shadow-lg rounded-lg border border-slate-100"
                listItemClasses="p-0 group"
                filterText={filterText}
                setFilterText={updateFilterText}
            />
        </div>
    );
};

export default RickAndMortySelect;

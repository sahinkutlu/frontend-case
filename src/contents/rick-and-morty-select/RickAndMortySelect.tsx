import { useCallback, useState } from "react";

import { MultiSelect } from "@/components/multi-select";

import { CharacterProps } from ".";

const RickAndMortySelect = () => {
    const [selectedItems, setSelectedItems] = useState<CharacterProps[]>([]);
    const updateSelectedItems = useCallback(
        (items: CharacterProps[]) => setSelectedItems(items),
        []
    );
    return (
        <div className="w-full max-w-lg p-3">
            <MultiSelect
                label="Rick and Morty Character Search"
                aria-label="Rick and Morty Character Search"
                url="https://rickandmortyapi.com/api/character/"
                selectedItems={selectedItems}
                onChange={updateSelectedItems}
            />
        </div>
    );
};

export default RickAndMortySelect;

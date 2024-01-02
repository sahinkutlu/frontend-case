import { useCallback, useState } from "react";

import { MultiSelect } from "@/components/multi-select";
import { rickAndMortyDetailModalEaseDuration } from "@/config/duration";

import { CharacterProps } from ".";
import RickAndMortyListItem from "./RickAndMortyListItem";
import RickAndMortySelectedDialog from "./RickAndMortySelectedDialog";

const RickAndMortySelect = () => {
    /**
     * Filter state
     */
    const [filterText, setFilterText] = useState<string>("");
    const updateFilterText = useCallback(
        (text: string) => setFilterText(text),
        []
    );
    /**
     * Selected characters
     */
    const [selectedItems, setSelectedItems] = useState<CharacterProps[]>([]);
    const updateSelectedItems = useCallback(
        (items: CharacterProps[]) => setSelectedItems(items),
        []
    );
    /**
     * Showing character detail
     */
    const [isTagDetailOpen, setIsTagDetailOpen] = useState<boolean>(false);
    const [selectedTag, setSelectedTag] = useState<CharacterProps>();

    const onTagSelect = useCallback((character: CharacterProps) => {
        setSelectedTag(character);
        setIsTagDetailOpen(true);
    }, []);

    const onDialogClose = useCallback(() => {
        setIsTagDetailOpen(false);
        /**
         * Display data when dialog closing (prevent white modal)
         */
        setTimeout(() => {
            setSelectedTag(undefined);
        }, rickAndMortyDetailModalEaseDuration);
    }, []);
    /**
     * RENDER CUSTOM LIST ITEM
     */
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
        <>
            <RickAndMortySelectedDialog
                isOpen={isTagDetailOpen}
                item={selectedTag}
                onClose={onDialogClose}
            />
            <div className="flex w-full max-w-lg flex-col items-center p-3">
                <img className="max-w-full" src="/rickandmorty.png" />

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
                    onTagSelect={onTagSelect}
                />
            </div>
        </>
    );
};

export default RickAndMortySelect;

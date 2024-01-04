import { useCallback, useMemo, useState } from "react";

import { MultiSelect } from "@/components/multi-select";
import { rickAndMortyDetailModalEaseDuration } from "@/config/duration";
import { rickAndMortyApiUrl } from "@/config/url";

import { CharacterProps } from ".";
import RickAndMortyListItem from "./RickAndMortyListItem";
import RickAndMortySelectedDialog from "./RickAndMortySelectedDialog";
import SelectMode from "./SelectMode";

const RickAndMortySelect = () => {
    const [selected, setSelected] = useState(true);
    const changeSelectMode = useCallback((selected: boolean) => {
        setSelected(selected);
    }, []);
    const selectMode = useMemo(
        () => (selected ? "multiple" : "single"),
        [selected]
    );
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
    /**
     * Multi select classes
     */
    const multiSelectClasses = useMemo(
        () => ({
            label: "[&>.label-line]:bg-white/90",
            list: "border border-slate-100 rounded-lg",
            listItem: "p-0 group selected:bg-green-100/40 cursor-pointer",
            popover: "shadow-lg rounded-lg",
            searchInput: "bg-white/20 border-b-green-100",
            select: "bg-white/50 shadow-none border-slate-200",
            tag: "bg-green-100/10 shadow-none border-green-100",
        }),
        []
    );
    return (
        <>
            <RickAndMortySelectedDialog
                isOpen={isTagDetailOpen}
                item={selectedTag}
                onClose={onDialogClose}
            />
            <div className="relative flex w-full max-w-lg flex-col items-center rounded-lg bg-white/50 p-3">
                <img
                    className="mb-3 h-auto w-48 max-w-full"
                    src="/rickandmorty.png"
                />

                <MultiSelect
                    label="Rick and Morty Character Search"
                    aria-label="Rick and Morty Character Search"
                    placeholder="Search for a character"
                    url={rickAndMortyApiUrl}
                    selectedItems={selectedItems}
                    onChange={updateSelectedItems}
                    displayValue={renderCustomDisplay}
                    classes={multiSelectClasses}
                    filterText={filterText}
                    selectMode={selectMode}
                    setFilterText={updateFilterText}
                    onTagSelect={onTagSelect}
                />
                <img
                    className="h-auto w-64 max-w-full"
                    src="/rick-and-morty-portal.png"
                />
                <SelectMode selected={selected} onChange={changeSelectMode} />
            </div>
        </>
    );
};

export default RickAndMortySelect;

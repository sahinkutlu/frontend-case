import React from "react";

import get from "lodash/get";

import { CheckIcon } from "@heroicons/react/20/solid";

import HighlightFilterText from "@/components/text/HighlightFilterText";

import { CharacterProps } from ".";

interface RickAndMortyListItemProps {
    character: CharacterProps;
    filterText: string;
}
const RickAndMortyListItem: React.FC<RickAndMortyListItemProps> = ({
    character,
    filterText,
}) => {
    /**
     * Computed data
     */
    const imageSrc = get(
        character,
        "image",
        "https://ui-avatars.com/api/?name=Rick+Morty&background=0D8ABC&color=fff"
    );
    const name = get(character, "name", "---");
    const episodes = get(character, "episode", []);
    const episodeLengthText =
        Array.isArray(episodes) && episodes.length > 1
            ? `${episodes.length} Episodes`
            : `${episodes.length} Episode`;

    return (
        <div className="group relative flex items-center gap-3 overflow-hidden px-2 py-1">
            <img
                src={imageSrc}
                alt={name}
                className="h-8 w-8 flex-shrink-0 rounded-full"
            />
            <div className="flex flex-1 flex-col">
                <div className="truncate font-medium">
                    <HighlightFilterText text={name} filterText={filterText} />
                </div>
                <div className="truncate text-sm text-slate-600">
                    {episodeLengthText}
                </div>
            </div>
            <div className="flex-shrink-0 opacity-0 group-selected:opacity-100">
                <CheckIcon className="w-4 text-green-400" />
            </div>
            <div className="absolute bottom-0 left-12 right-2 h-px bg-slate-200 group-selected:bg-white [.group:not([data-selected]):has(+[data-selected])_&]:hidden [.group[data-selected]:has(+:not([data-selected]))_&]:hidden [.group[data-selected]:last-child_&]:hidden" />
        </div>
    );
};

export default RickAndMortyListItem;

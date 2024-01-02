import React from "react";

import get from "lodash/get";

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
        <div className="group relative grid cursor-default auto-cols-max grid-flow-col grid-rows-2 gap-x-3 overflow-hidden rounded px-2 py-1 text-slate-700">
            <img
                src={imageSrc}
                alt={name}
                className="row-span-2 h-8 w-8 place-self-center rounded-full"
            />
            <div slot="label" className="truncate font-medium">
                <HighlightFilterText text={name} filterText={filterText} />
            </div>
            <div slot="description" className="truncate text-sm text-slate-600">
                {episodeLengthText}
            </div>
            <div className="absolute bottom-0 left-12 right-2 h-px bg-slate-200 group-selected:bg-slate-100 [.group:not([data-selected]):has(+[data-selected])_&]:hidden [.group[data-selected]:has(+:not([data-selected]))_&]:hidden [.group[data-selected]:last-child_&]:hidden" />
        </div>
    );
};

export default RickAndMortyListItem;

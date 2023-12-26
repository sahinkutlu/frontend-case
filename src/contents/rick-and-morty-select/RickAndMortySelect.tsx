import { useAsyncList } from "react-stately";

import { Item, MultiSelect } from "@/components/multi-select";

import { CharacterProps } from ".";

const RickAndMortySelect = () => {
    const list = useAsyncList<CharacterProps>({
        async load({ signal, cursor, filterText }) {
            if (cursor) {
                cursor = cursor.replace(/^http:\/\//i, "https://");
            }

            const res = await fetch(
                cursor ||
                    `https://rickandmortyapi.com/api/character/?name=${filterText}`,
                { signal }
            );
            const json = await res.json();

            return {
                items: json.results,
                cursor: json.info.next,
            };
        },
    });
    return (
        <MultiSelect
            label="Rick and Morty Character Search"
            items={list.items}
            inputValue={list.filterText}
            onInputChange={list.setFilterText}
            loadingState={list.loadingState}
            onLoadMore={list.loadMore}
        >
            {item => <Item key={item.name}>{item.name}</Item>}
        </MultiSelect>
    );
};

export default RickAndMortySelect;

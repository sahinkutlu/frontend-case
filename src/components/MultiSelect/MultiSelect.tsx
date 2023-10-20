import React, {useEffect} from "react";
import "../../assets/styles/multiSelect.scss";
import {ReactComponent as Icon} from "../../assets/icons/search.svg";
import MultiSelectItem from "./MultiSelectItem";


type MultiSelectProps = {
    items: {
        data: string[]
    };
    title: string;
    placeholder: string;
    searchText: string;
    errorText: string;
};
const MultiSelect = ({items, title, placeholder, searchText, errorText}: MultiSelectProps) => {
    const queryParameters = new URLSearchParams(window.location.search)
    const [itemsToDisplay, setItemsToDisplay] = React.useState<string[]>(items.data); // [1
    const selectedItemsFromURL = queryParameters.get("selectedItems")
    const [selectedItems, setSelectedItems] = React.useState<string[]>(selectedItemsFromURL ? selectedItemsFromURL.split("|") : []);
    const [search, setSearch] = React.useState<string>("");


    useEffect(() => {
        search.length > 3 ? setItemsToDisplay(
            items.data.filter(
                (searchString) =>
                    searchString.toLowerCase().includes(search.toLowerCase()) ||
                    selectedItems.includes(searchString)
            )
        ): setItemsToDisplay(items.data)
    }, [items.data, search, selectedItems]);

    const handleOnChange = (data: string) => {
        let currentState: string[] = []
        if (selectedItems.includes(data)) {
            currentState = selectedItems.filter((d) => d !== data)

        } else {
            currentState = [...selectedItems, data]
        }
        setSelectedItems(currentState);
        const url = new URL(window.location.href);
        const commaReplacer = /(,(?=\S))/g
        url.searchParams.set("selectedItems", currentState.toString().replace(commaReplacer, "|"));
        window.history.pushState({}, "", url);
    };
    const handleOnSearch = (data: string[]) => {
        console.log(data)
    };
    useEffect(() => {
        setItemsToDisplay(items.data);
    }, [items.data]);


    return (
        <section className="multiselect">
            <div className="title">{title}</div>
            <div className="search">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                />
                <span className="icon">
          <Icon/>
        </span>
            </div>
            <ul className={`${itemsToDisplay.length === 0 ? "no-result" : ""}`}>
                {itemsToDisplay.length === 0 && (
                    <li className="no-result-text">{errorText}</li>
                )}
                {itemsToDisplay.map((item, index) => (
                    <MultiSelectItem
                        index={index}
                        isSelected={selectedItems.includes(item)}
                        key={`item-${index}`}
                        selectItem={item}
                        onChange={handleOnChange}
                    />
                ))}
            </ul>
            <button
                className="btn-default"
                disabled={selectedItems.length === 0}
                onClick={() => {
                    handleOnSearch(selectedItems)
                }}
            >
                {searchText}
            </button>
        </section>
    );
};

export default MultiSelect;

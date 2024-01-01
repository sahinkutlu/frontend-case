import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import debounce from "lodash/debounce";
import get from "lodash/get";
import { Key, type Selection } from "react-stately";

import type { MultiSelectProps } from ".";
import useMultiSelectList from "./useMultiSelectList";

const useMultiSelect = <T extends object>(props: MultiSelectProps<T>) => {
    const {
        displayValue,
        filterParams,
        idValue,
        tagValue,
        textValue,
        url,
        selectedItems,
        onChange,
        setFilterText: setText,
    } = props;

    // REFS
    const textFieldRef = useRef<HTMLInputElement>(null);
    const inputFieldRef = useRef<HTMLInputElement>(null);
    const listBoxRef = useRef<HTMLDivElement>();

    // TEXT FIELD WIDTH
    const [textFieldWidth, setTextFieldWith] = useState<number>();

    // POPOVER STATE
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const openList = useCallback(() => {
        setIsOpen(true);
    }, []);
    const closeList = useCallback(() => setIsOpen(false), []);
    //  ASYNC LIST
    const { error, isLoading, items, loadMore, setFilterText } =
        useMultiSelectList({ filterParams, url });

    /**
     * Fetch more item by scrolling
     */
    const onScroll = useCallback(
        (e: React.UIEvent) => {
            const scrollOffset =
                e.currentTarget.scrollHeight - e.currentTarget.clientHeight * 2;
            if (e.currentTarget.scrollTop > scrollOffset && loadMore) {
                loadMore();
            }
        },
        [loadMore]
    );

    /**
     * Making id value is dynamic
     */
    const getIdValue = useCallback(
        (item: T) => {
            const typeOfIdValue = typeof idValue;
            switch (typeOfIdValue) {
                case "string":
                    return get(item, idValue as string);
                case "function":
                    return (idValue as (item: T) => string)(item);
                default:
                    return get(item, "id");
            }
        },
        [idValue]
    );
    /**
     * Making tag value is dynamic
     */
    const getTagValue = useCallback(
        (item: T) => {
            const typeOfTagValue = typeof tagValue;
            switch (typeOfTagValue) {
                case "string":
                    return get(item, tagValue as string);
                case "function":
                    return (tagValue as (item: T) => string)(item);
                default:
                    return get(item, "name");
            }
        },
        [tagValue]
    );
    /**
     * Making text value is dynamic
     */
    const getTextValue = useCallback(
        (item: T) => {
            const typeOfTextValue = typeof textValue;
            switch (typeOfTextValue) {
                case "string":
                    return get(item, textValue as string);
                case "function":
                    return (textValue as (item: T) => string)(item);
                default:
                    return get(item, "name");
            }
        },
        [textValue]
    );
    /**
     * Making display value is dynamic
     * By this way we can pass component
     */
    const getDisplayValue = useCallback(
        (item: T) => {
            const typeOfDisplayValue = typeof displayValue;
            switch (typeOfDisplayValue) {
                case "string":
                    return get(item, displayValue as string);
                case "function":
                    return (
                        displayValue as (item: T) => string | React.ReactNode
                    )(item);
                default:
                    return get(item, "name");
            }
        },
        [displayValue]
    );

    /**
     * Mapped item list keys
     */
    const selectedItemKeys = useMemo(() => {
        if (selectedItems?.length > 0 && Array.isArray(items)) {
            return selectedItems.map(item => getIdValue(item)) as Iterable<Key>;
        } else {
            return [] as Iterable<Key>;
        }
    }, [getIdValue, items, selectedItems]);
    /**
     * Select item from list
     * Then close popover
     */
    const onItemSelect = useCallback(
        (selection: Selection) => {
            const selectionSize = get(selection, "size", 0);
            if (selectionSize > 0) {
                const fetchItems = [...items];
                const targetItemKey = [...selection][0];

                const targetItem = fetchItems.find(
                    item => getIdValue(item as T) === targetItemKey
                ) as T;
                if (targetItem) {
                    const previousSelectedItems = [...selectedItems];
                    const itemIndex = previousSelectedItems.findIndex(
                        item => getIdValue(item) === targetItemKey
                    );
                    if (itemIndex < 0) {
                        previousSelectedItems.push(targetItem);
                        setIsOpen(false);
                        setFilterText("");
                        setText?.("");
                        onChange(previousSelectedItems);
                    }
                    /**
                     * If you want to delete on list item click
                     * you need to create custom list item that
                     * trigger onItemSelect directly.
                     * ListBox native function is returns first item of selection in single mode
                     */
                    // else {
                    //     previousSelectedItems.splice(itemIndex, 1);
                    // }
                }
            }
        },
        [getIdValue, items, onChange, selectedItems, setFilterText, setText]
    );
    /**
     * Store debounce with useRef instead of useCallback to prevent creating new debounce function on every render
     */
    const debouncedSetFilterText = useRef(
        debounce(value => setFilterText(value), 300)
    ).current;

    /**
     * Remove item by clicking tag
     */
    const removeItem = useCallback(
        (deleteItem: T) => () => {
            const filteredItems = selectedItems?.filter(
                itm =>
                    String(getIdValue(itm)) !== String(getIdValue(deleteItem))
            );
            onChange(filteredItems);
        },
        [getIdValue, onChange, selectedItems]
    );
    /**
     * Focus input when click space in group
     */
    const onClickGroup = useCallback(() => {
        inputFieldRef.current?.focus();
    }, []);
    /**
     * Filtering by input
     */
    const onFilterTextChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = get(event, "target.value", "");
            debouncedSetFilterText(value);
            setText?.(value);
            if (!isOpen) {
                setIsOpen(true);
            }
        },
        [debouncedSetFilterText, isOpen, setText]
    );
    /**
     * Open and focus list box when pressed down key in input
     */
    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent) => {
            if (event.key === "ArrowDown") {
                if (!isOpen) {
                    setIsOpen(true);
                }
                listBoxRef.current?.focus();
            }
        },
        [isOpen]
    );
    /**
     * Set width for popover
     */
    useEffect(() => {
        if (textFieldRef.current) {
            setTextFieldWith(
                textFieldRef.current.getBoundingClientRect().width
            );
        }
    }, [textFieldRef]);

    return {
        error,
        inputFieldRef,
        isLoading,
        isOpen,
        items: items as T[],
        selectedItemKeys,
        listBoxRef,
        textFieldRef,
        textFieldWidth,
        closeList,
        handleKeyDown,
        getDisplayValue,
        getIdValue,
        getTagValue,
        getTextValue,
        onClickGroup,
        onFilterTextChange,
        onItemSelect,
        openList,
        onScroll,
        removeItem,
    };
};

export default useMultiSelect;

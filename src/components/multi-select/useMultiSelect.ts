import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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
        url,
        selectedItems,
        onChange,
    } = props;

    // REFS
    const textFieldRef = useRef<HTMLInputElement>(null);
    const inputFieldRef = useRef<HTMLInputElement>(null);
    const tagsRef = useRef();

    // TEXT FIELD WIDTH
    const [textFieldWidth, setTextFieldWith] = useState<number>();

    // POPOVER STATE
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const openList = useCallback(() => {
        setIsOpen(true);
    }, []);
    const closeList = useCallback(() => setIsOpen(false), []);
    //  ASYNC LIST
    const {
        error,
        filterText,
        isLoading,
        items,
        loadMore,
        selectedKeys,
        setFilterText,
        setSelectedKeys,
    } = useMultiSelectList({ filterParams, url });

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
            console.log({ selection });
            setSelectedKeys(selection);
            setIsOpen(false);
            setFilterText("");
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
                    } else {
                        previousSelectedItems.splice(itemIndex, 1);
                    }

                    onChange(previousSelectedItems);
                }
            }
        },
        [
            getIdValue,
            items,
            onChange,
            selectedItems,
            setFilterText,
            setSelectedKeys,
        ]
    );
    /**
     * Remove item by clicking tag
     */
    const removeItem = useCallback(
        (deleteItem: T) => () => {
            const selectedSize = get(selectedKeys, "size", 0);
            if (selectedSize > 0) {
                setIsOpen(false);
                const itemId = getIdValue(deleteItem);
                const selectedSet = [...selectedKeys].filter(
                    item => String(item) !== String(itemId)
                );
                setSelectedKeys(new Set([...selectedSet]));
                const filteredItems = selectedItems?.filter(
                    itm => String(getIdValue(itm)) !== String(itemId)
                );
                onChange(filteredItems);
            }
        },
        [getIdValue, onChange, selectedItems, selectedKeys, setSelectedKeys]
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
            setFilterText(event.target.value);
            if (!isOpen) {
                setIsOpen(true);
            }
        },
        [isOpen, setFilterText]
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
        filterText,
        inputFieldRef,
        isLoading,
        isOpen,
        items: items as T[],
        selected: selectedKeys,
        selectedItemKeys,
        tagsRef,
        textFieldRef,
        textFieldWidth,
        closeList,
        getDisplayValue,
        getIdValue,
        getTagValue,
        onClickGroup,
        onFilterTextChange,
        onItemSelect,
        openList,
        onScroll,
        removeItem,
    };
};

export default useMultiSelect;

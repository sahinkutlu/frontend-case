import * as React from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useComboBox, useFilter } from "react-aria";
import { useComboBoxState } from "react-stately";

import { MultiSelectProps } from ".";
import ListBox from "./ListBox";
import Popover from "./Popover";

const MultiSelect = <T extends object>(props: MultiSelectProps<T>) => {
    const { contains } = useFilter({ sensitivity: "base" });
    const state = useComboBoxState({ ...props, defaultFilter: contains });

    const inputRef = React.useRef(null);
    const listBoxRef = React.useRef(null);
    const popoverRef = React.useRef(null);

    const { inputProps, listBoxProps, labelProps } = useComboBox(
        {
            ...props,
            inputRef,
            listBoxRef,
            popoverRef,
        },
        state
    );

    return (
        <div className="relative inline-block">
            <label
                {...labelProps}
                className="block text-sm font-medium text-gray-700"
            >
                {props.label}
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                    <MagnifyingGlassIcon className="h-3 w-3 text-gray-400" />
                </div>
                <input
                    {...inputProps}
                    ref={inputRef}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-1.5 pl-5 text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    {props.loadingState === "loading" ||
                    props.loadingState === "filtering" ? (
                        <svg
                            className="h-5 w-5 animate-spin text-blue-400"
                            viewBox="0 0 24 24"
                        ></svg>
                    ) : null}
                </div>
            </div>
            {state.isOpen && (
                <Popover
                    popoverRef={popoverRef}
                    triggerRef={inputRef}
                    state={state}
                    isNonModal
                    placement="bottom start"
                >
                    <ListBox
                        {...listBoxProps}
                        listBoxRef={listBoxRef}
                        state={state}
                        loadingState={props.loadingState}
                        onLoadMore={props.onLoadMore}
                    />
                </Popover>
            )}
        </div>
    );
};

export default MultiSelect;

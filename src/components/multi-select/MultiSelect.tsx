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
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    {...inputProps}
                    ref={inputRef}
                    className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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

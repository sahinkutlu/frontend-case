// Option.tsx
import React from "react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useOption } from "react-aria";
import { OptionProps } from ".";

const Option = ({ item, state }: OptionProps) => {
    const ref = React.useRef<HTMLLIElement>(null);
    const { optionProps, isFocused } = useOption(
        {
            key: item.key,
        },
        state,
        ref
    );

    // Adjust isSelected logic for multiple selection
    const isSelected = state.selectedKeys.has(item.key);

    return (
        <li
            {...optionProps}
            ref={ref}
            className={`px-2 py-2 ${
                isFocused
                    ? "bg-blue-50 text-blue-700"
                    : "bg-white text-gray-700"
            } ${
                isSelected ? "font-bold" : "font-normal"
            } flex cursor-default items-center justify-between`}
        >
            {item.rendered}
            {isSelected && <CheckIcon className="h-5 w-5" />}
        </li>
    );
};

export default Option;

// ListBox.tsx
import React from "react";
import { useListBox } from "react-aria";
import { ListBoxProps } from ".";
import Option from "./Option";

const ListBox = (props: ListBoxProps) => {
    const ref = React.useRef<HTMLUListElement>(null);
    const { listBoxRef = ref, state } = props;
    const { listBoxProps } = useListBox(props, state, listBoxRef);

    const onScroll = (e: React.UIEvent) => {
        const scrollOffset =
            e.currentTarget.scrollHeight - e.currentTarget.clientHeight * 2;
        if (e.currentTarget.scrollTop > scrollOffset && props.onLoadMore) {
            props.onLoadMore();
        }
    };

    return (
        <ul
            {...listBoxProps}
            ref={listBoxRef}
            className="my-1 flex max-h-72 w-full flex-col overflow-auto"
            onScroll={onScroll}
        >
            {[...state.collection].map(item => (
                <Option key={item.key} item={item} state={state} />
            ))}
            {props.loadingState === "loadingMore" && (
                <li role="option" className="flex justify-center pb-2 pt-4">
                    <svg
                        className="h-5 w-5 animate-spin text-blue-400"
                        viewBox="0 0 24 24"
                    ></svg>
                </li>
            )}
        </ul>
    );
};

export default ListBox;

// Popover.tsx
import React from "react";
import { DismissButton, Overlay, usePopover } from "@react-aria/overlays";
import type { PopoverProps } from ".";

const Popover = (props: PopoverProps) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const { popoverRef = ref, state, children, isNonModal } = props;

    const { popoverProps, underlayProps } = usePopover(
        {
            ...props,
            popoverRef,
        },
        state
    );

    return (
        <Overlay>
            {!isNonModal && (
                <div
                    {...underlayProps}
                    style={{ position: "fixed", inset: 0 }}
                />
            )}
            <div
                {...popoverProps}
                ref={popoverRef}
                className="z-10 w-64 rounded-lg border border-gray-200 bg-white text-sm text-gray-500 shadow-sm transition-opacity duration-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
            >
                {!isNonModal && <DismissButton onDismiss={state.close} />}
                {children}
                <DismissButton onDismiss={state.close} />
            </div>
        </Overlay>
    );
};

export default Popover;

// MultiSelect.tsx
import React from "react";
import { ArrowPathIcon } from "@heroicons/react/16/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useComboBox, useFilter } from "react-aria";
import { useMultipleSelectionState } from "react-stately";
import { MultiSelectProps } from ".";
import ListBox from "./ListBox";
import Popover from "./Popover";

const MultiSelect = <T extends object>(props: MultiSelectProps<T>) => {
    const { contains } = useFilter({ sensitivity: "base" });

    // Replace useComboBoxState with useMultipleSelectionState
    const state = useMultipleSelectionState({ ...props, defaultFilter: contains });

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
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-1.5 pl-6 text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    {props.loadingState === "loading" ||
                    props.loadingState === "filtering" ? (
                        <ArrowPathIcon className="h-3 w-3 animate-spin text-blue-400" />
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

// index.ts
import type { AriaPopoverProps } from "@react-aria/overlays";
import type { LoadingState, Node } from "@react-types/shared";
import type { AriaComboBoxProps, AriaListBoxOptions } from "react-aria";
import type { OverlayTriggerState } from "react-stately";
import type { ListState } from "react-stately";

export interface ListBoxProps extends AriaListBoxOptions<unknown> {
    listBoxRef?: React.RefObject<HTMLUListElement>;
    state: ListState<unknown>;
    loadingState?: LoadingState;
    onLoadMore?: () => void;
}
export interface OptionProps {
    item: Node<unknown>;
    state: ListState<unknown>;
}
export interface PopoverProps extends Omit<AriaPopoverProps, "popoverRef"> {
    children: React.ReactNode;
    state: OverlayTriggerState;
    popoverRef?: React.RefObject<HTMLDivElement>;
}
export interface MultiSelectProps<T> extends AriaComboBoxProps<T> {
    loadingState?: LoadingState;
    onLoadMore?: () => void;
}

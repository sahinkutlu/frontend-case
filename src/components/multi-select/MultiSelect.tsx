"use client";

import clsx from "clsx";
import { FocusScope } from "react-aria";
import {
    Button,
    Group,
    Input,
    Label,
    ListBox,
    ListBoxItem,
    Popover,
    TextField,
} from "react-aria-components";
import { ErrorBoundary } from "react-error-boundary";
import { twMerge } from "tailwind-merge";

import { XCircleIcon } from "@heroicons/react/16/solid";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

import { MultiSelectProps } from ".";
import useMultiSelect from "./useMultiSelect";

const MultiSelect = <T extends object>(props: MultiSelectProps<T>) => {
    const {
        autoFocus,
        containFocus = true,
        filterText,
        restoreFocus,
        label,
        listClasses,
        listItemClasses,
        placeholder,
        selectedItems,
        ...rest
    } = props;
    const {
        errorMessage,
        inputFieldRef,
        isLoading,
        isOpen,
        items,
        listBoxRef,
        selectedItemKeys,
        textFieldRef,
        textFieldWidth,
        closeList,
        handleInputKeyDown,
        handleTagKeyDown,
        handleTagClick,
        getDisplayValue,
        getIdValue,
        getTagValue,
        getTextValue,
        onClickGroup,
        onFilterTextChange,
        onItemSelect,
        onScroll,
        openList,
        removeItem,
    } = useMultiSelect(props);
    const listCN = twMerge(
        clsx("max-h-[290px] overflow-auto bg-white max-w-full", listClasses)
    );
    const listItemCN = twMerge(
        clsx(
            "selected:bg-slate-100 relative cursor-default px-2 py-1 outline-none focus-visible:bg-slate-200",
            listItemClasses
        )
    );

    return (
        <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
            <div className="relative w-full">
                {label && (
                    <div
                        className={clsx(
                            "absolute left-0 top-0 z-[2] flex transition-opacity duration-150 ease-in-out",
                            {
                                "pointer-events-none opacity-0": !filterText,
                                "pointer-events-auto opacity-100":
                                    filterText ||
                                    placeholder ||
                                    selectedItems?.length > 0,
                            }
                        )}
                        style={{ transform: "translate(0.5rem, -50%)" }}
                    >
                        <Label className="relative m-0 p-0 px-0.5 text-xs leading-none text-slate-400">
                            {label}
                            <div className="absolute left-0 top-1/2 z-[-1] h-[1px] w-full bg-white"></div>
                        </Label>
                    </div>
                )}
                <TextField
                    ref={textFieldRef}
                    className="relative w-full rounded-md border border-slate-200 bg-white/90 px-1.5 py-2 shadow"
                    aria-label="tag wrapper"
                >
                    <Group
                        className="flex flex-wrap items-center gap-1"
                        onClick={onClickGroup}
                    >
                        <FocusScope
                            contain={containFocus}
                            restoreFocus={restoreFocus}
                            autoFocus={autoFocus}
                        >
                            {selectedItems?.map(tagItem => (
                                <span
                                    tabIndex={0}
                                    role="button"
                                    className="item-center inline-flex gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-sm text-slate-500 selected:border-blue-400"
                                    key={getIdValue(tagItem)}
                                    onKeyDown={handleTagKeyDown(tagItem)}
                                    onClick={handleTagClick(tagItem)}
                                >
                                    {getTagValue(tagItem)}
                                    <Button
                                        onPress={removeItem(tagItem)}
                                        type="button"
                                        aria-label={`tag-${getTagValue(
                                            tagItem
                                        )}`}
                                    >
                                        <XCircleIcon className="h-4 w-4 text-red-400" />
                                    </Button>
                                </span>
                            ))}

                            <Input
                                aria-label="filter text"
                                ref={inputFieldRef}
                                value={filterText}
                                className="w-full min-w-32 flex-1 border-b-blue-400 outline-none focus:border-b"
                                onClick={openList}
                                onChange={onFilterTextChange}
                                onKeyDown={handleInputKeyDown}
                                placeholder={
                                    selectedItems?.length > 0
                                        ? ""
                                        : placeholder || label
                                }
                            />
                        </FocusScope>
                    </Group>
                </TextField>
            </div>
            <Popover
                triggerRef={textFieldRef}
                isOpen={isOpen}
                onOpenChange={closeList}
                style={{ width: `${textFieldWidth}px` }}
                className="max-w-full"
            >
                {isLoading && (
                    <div
                        aria-label="loading spinner"
                        className="absolute left-0 top-0 flex h-full w-full items-center justify-center "
                    >
                        <div className="absolute left-0 top-0 z-10 h-full w-full bg-white/60"></div>
                        <ArrowPathIcon className="z-20 h-8 w-8 animate-spin text-blue-400" />
                    </div>
                )}
                {errorMessage ? (
                    <div className="pb-3 text-sm text-red-400">
                        {errorMessage}
                    </div>
                ) : (
                    <ListBox
                        ref={listBoxRef}
                        aria-label="multi select"
                        selectionMode="single"
                        selectedKeys={selectedItemKeys}
                        onSelectionChange={onItemSelect}
                        items={items}
                        onScroll={onScroll}
                        className={listCN}
                        {...rest}
                    >
                        {item => (
                            <ListBoxItem
                                className={listItemCN}
                                id={getIdValue(item)}
                                textValue={getTextValue(item)}
                                aria-label={getTextValue(item)}
                            >
                                {getDisplayValue(item)}
                            </ListBoxItem>
                        )}
                    </ListBox>
                )}
            </Popover>
        </ErrorBoundary>
    );
};

export default MultiSelect;

"use client";

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

import { XCircleIcon } from "@heroicons/react/16/solid";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

import { MultiSelectProps } from ".";
import useMultiSelect from "./useMultiSelect";
import useMultiSelectClasses from "./useMultiSelectClasses";

const MultiSelect = <T extends object>(props: MultiSelectProps<T>) => {
    /**
     * Destructure props
     */
    const {
        autoFocus,
        classes,
        containFocus = true,
        filterText,
        restoreFocus,
        label,
        placeholder,
        popoverPlacement = "bottom",
        selectedItems,
        ...rest
    } = props;
    /**
     * Destructure hooks
     */
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
    /**
     * Destructure classes
     */
    const {
        labelCN,
        labelWrapperCN,
        listCN,
        listItemCN,
        popoverCN,
        searchInputCN,
        selectCN,
        tagCN,
    } = useMultiSelectClasses({
        classes,
        filterText,
        isOpen,
        selectedItems,
        placeholder,
    });

    return (
        <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
            <div className="relative w-full">
                {/* TODO - Move this to a separate component */}
                {label && (
                    <div
                        className={labelWrapperCN}
                        style={{ transform: "translate(0.5rem, -50%)" }}
                    >
                        <Label className={labelCN}>
                            {label}
                            <div className="label-line absolute left-0 top-1/2 z-[-1] h-[1px] w-full" />
                        </Label>
                    </div>
                )}
                {/* End of component */}
                <TextField
                    ref={textFieldRef}
                    className={selectCN}
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
                            {/* TODO - Move this to a separate component */}
                            {selectedItems?.map(tagItem => (
                                <span
                                    tabIndex={0}
                                    role="button"
                                    className={tagCN}
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
                            {/* End of component */}

                            <Input
                                aria-label="filter text"
                                ref={inputFieldRef}
                                value={filterText}
                                className={searchInputCN}
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
                className={popoverCN}
                placement={popoverPlacement}
            >
                {/* TODO - Conditional rendering with device width */}
                <Input
                    aria-label="filter text"
                    ref={inputFieldRef}
                    value={filterText}
                    className="mb-1 block w-full rounded-md border border-slate-200 outline-none md:hidden"
                    onChange={onFilterTextChange}
                    onKeyDown={handleInputKeyDown}
                    placeholder={
                        selectedItems?.length > 0 ? "" : placeholder || label
                    }
                />
                {/* TODO - Move this to a separate component and make customizable */}
                {isLoading && (
                    <div
                        aria-label="loading spinner"
                        className="absolute left-0 top-0 flex h-full w-full items-center justify-center "
                    >
                        <div className="absolute left-0 top-0 z-10 h-full w-full bg-white/60"></div>
                        <ArrowPathIcon className="z-20 h-8 w-8 animate-spin text-blue-400" />
                    </div>
                )}
                {/* End of component */}
                {errorMessage ? (
                    //    TODO - Move this to a separate component and make customizable
                    <div className="pb-3 text-sm text-red-400">
                        {errorMessage}
                    </div>
                ) : (
                    //   End of component
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
                            //    TODO - Move this to a separate component and make customizable
                            <ListBoxItem
                                className={listItemCN}
                                id={getIdValue(item)}
                                textValue={getTextValue(item)}
                                aria-label={getTextValue(item)}
                            >
                                {getDisplayValue(item)}
                            </ListBoxItem>
                            //   End of component
                        )}
                    </ListBox>
                )}
            </Popover>
        </ErrorBoundary>
    );
};

export default MultiSelect;

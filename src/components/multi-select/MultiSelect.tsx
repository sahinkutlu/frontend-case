import { XCircleIcon } from "@heroicons/react/16/solid";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { FocusScope } from "react-aria";
import {
    Button,
    Group,
    Input,
    ListBox,
    ListBoxItem,
    Popover,
    TextField,
} from "react-aria-components";

import { MultiSelectProps } from ".";
import useMultiSelect from "./useMultiSelect";

const MultiSelect = <T extends object>(props: MultiSelectProps<T>) => {
    const {
        autoFocus,
        containFocus = true,
        restoreFocus,
        listClasses,
        listItemClasses,
        selectedItems,
        ...rest
    } = props;
    const {
        filterText,
        inputFieldRef,
        isLoading,
        isOpen,
        items,
        selectedItemKeys,
        textFieldRef,
        textFieldWidth,
        closeList,
        getDisplayValue,
        getIdValue,
        getTagValue,
        onClickGroup,
        onFilterTextChange,
        onItemSelect,
        onScroll,
        openList,
        removeItem,
    } = useMultiSelect(props);
    return (
        <>
            <TextField
                ref={textFieldRef}
                className="relative w-full rounded-md border border-slate-200 p-1"
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
                                className="item-center inline-flex gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 selected:border-blue-400"
                                key={getIdValue(tagItem)}
                            >
                                {getTagValue(tagItem)}
                                <Button
                                    onPress={removeItem(tagItem)}
                                    type="button"
                                    aria-label={`tag-${getTagValue(tagItem)}`}
                                >
                                    <XCircleIcon className="h-4 w-4 text-red-400" />
                                </Button>
                            </span>
                        ))}

                        <Input
                            ref={inputFieldRef}
                            value={filterText}
                            className="w-full min-w-32 flex-1 border-b-blue-400 outline-none focus:border-b"
                            onClick={openList}
                            onChange={onFilterTextChange}
                        />
                    </FocusScope>
                </Group>
            </TextField>
            <Popover
                triggerRef={textFieldRef}
                isOpen={isOpen}
                onOpenChange={closeList}
                style={{ width: `${textFieldWidth}px` }}
                className="min-w-[450px]"
            >
                {isLoading && (
                    <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center ">
                        <div className="absolute left-0 top-0 z-10 h-full w-full bg-white/60"></div>
                        <ArrowPathIcon className="z-20 h-8 w-8 animate-spin text-blue-400" />
                    </div>
                )}
                <ListBox
                    selectionMode="single"
                    selectedKeys={selectedItemKeys}
                    onSelectionChange={onItemSelect}
                    items={items}
                    onScroll={onScroll}
                    className={clsx("max-h-[290px] overflow-auto", listClasses)}
                    {...rest}
                >
                    {item => (
                        <ListBoxItem
                            className={clsx(
                                "relative cursor-default px-2 py-1 outline-none focus-visible:bg-slate-200 selected:bg-slate-100",
                                listItemClasses
                            )}
                            id={getIdValue(item)}
                        >
                            {getDisplayValue(item)}
                        </ListBoxItem>
                    )}
                </ListBox>
            </Popover>
        </>
    );
};

export default MultiSelect;

import type { AriaPopoverProps } from "@react-aria/overlays";
import type { LoadingState, Node } from "@react-types/shared";
import type { AriaListBoxOptions, AriaListBoxProps } from "react-aria";
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
type WithoutChildren<T> = Omit<T, "children">;
export interface MultiSelectProps<T>
    extends WithoutChildren<AriaListBoxProps<T>> {
    filterParams?: string[];
    url?: string;
    apiResultPath?: string;
    apiResultCursor?: string;
    idValue?: string | ((item: T) => string);
    tagValue?: string | ((item: T) => string);
    textValue?: string | ((item: T) => string);
    displayValue?: string | ((item: T) => string | React.ReactNode);
    listClasses?: string;
    listItemClasses?: string;
    containFocus?: boolean;
    restoreFocus?: boolean;
    autoFocus?: boolean;
    selectedItems: T[];
    filterText?: string;
    setFilterText?: (filterText: string) => void;
    onChange: (selectedItems: T[]) => void;
    onTagSelect?: (item: T) => void;
}

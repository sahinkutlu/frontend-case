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
    idValue?: string | ((item: Record<string, unknown>) => string);
    tagValue?: string | ((item: Record<string, unknown>) => string);
    displayValue?:
        | string
        | ((item: Record<string, unknown>) => string | React.ReactNode);
    listClasses?: string;
    listItemClasses?: string;
    containFocus?: boolean;
    restoreFocus?: boolean;
    autoFocus?: boolean;
    selectedItems: T[];
    onChange: (selectedItems: T[]) => void;
}

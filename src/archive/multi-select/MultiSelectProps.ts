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

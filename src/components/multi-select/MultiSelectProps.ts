import type { AriaListBoxProps, Placement } from "react-aria";

export interface ClassesProps {
    label?: string;
    labelWrapper?: string;
    list?: string;
    listItem?: string;
    popover?: string;
    searchInput?: string;
    select?: string;
    tag?: string;
}
type WithoutChildren<T> = Omit<T, "children">;
export interface MultiSelectProps<T>
    extends WithoutChildren<AriaListBoxProps<T>> {
    apiResultCursor?: string;
    apiResultPath?: string;
    autoFocus?: boolean;
    classes?: ClassesProps;
    containFocus?: boolean;
    displayValue?: string | ((item: T) => string | React.ReactNode);
    filterParams?: string[];
    filterText?: string;
    idValue?: string | ((item: T) => string);
    label?: string;
    placeholder?: string;
    popoverPlacement?: Placement;
    restoreFocus?: boolean;
    selectedItems: T[];
    selectMode?: "single" | "multiple";
    tagValue?: string | ((item: T) => string);
    textValue?: string | ((item: T) => string);
    url?: string;
    onChange: (selectedItems: T[]) => void;
    onTagSelect?: (item: T) => void;
    setFilterText?: (filterText: string) => void;
}

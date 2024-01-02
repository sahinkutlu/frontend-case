import type { AriaListBoxProps } from "react-aria";

type WithoutChildren<T> = Omit<T, "children">;
export interface MultiSelectProps<T>
    extends WithoutChildren<AriaListBoxProps<T>> {
    apiResultCursor?: string;
    apiResultPath?: string;
    autoFocus?: boolean;
    containFocus?: boolean;
    displayValue?: string | ((item: T) => string | React.ReactNode);
    filterParams?: string[];
    filterText?: string;
    idValue?: string | ((item: T) => string);
    listClasses?: string;
    listItemClasses?: string;
    restoreFocus?: boolean;
    selectedItems: T[];
    tagValue?: string | ((item: T) => string);
    textValue?: string | ((item: T) => string);
    url?: string;
    onChange: (selectedItems: T[]) => void;
    onTagSelect?: (item: T) => void;
    setFilterText?: (filterText: string) => void;
}

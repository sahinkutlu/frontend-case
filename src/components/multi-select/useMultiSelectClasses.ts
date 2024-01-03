import clsx from "clsx";
import { twMerge } from "tailwind-merge";

import { ClassesProps } from ".";

interface useMultiSelectClassesProps<T> {
    classes?: ClassesProps;
    filterText?: string;
    placeholder?: string;
    selectedItems: T[];
}
const useMultiSelectClasses = <T extends object>({
    classes,
    filterText,
    placeholder,
    selectedItems,
}: useMultiSelectClassesProps<T>) => {
    const labelCN = twMerge(
        clsx(
            "relative m-0 p-0 px-0.5 text-xs leading-none text-slate-400 [&>.label-line]:bg-white",
            classes?.label
        )
    );
    const labelWrapperCN = twMerge(
        clsx(
            "absolute left-0 top-0 z-[2] flex transition-opacity duration-150 ease-in-out",
            classes?.labelWrapper,
            {
                "pointer-events-none opacity-0": !filterText,
                "pointer-events-auto opacity-100":
                    filterText ||
                    placeholder ||
                    (selectedItems?.length ?? 0) > 0,
            }
        )
    );
    const listCN = twMerge(
        clsx(
            "max-h-[500px] min-h-[150px] h-[calc(100vh/2-100px)] overflow-auto bg-white max-w-full",
            classes?.list
        )
    );
    const listItemCN = twMerge(
        clsx(
            "selected:bg-slate-100 relative cursor-default px-2 py-1 outline-none focus-visible:bg-slate-200",
            classes?.listItem
        )
    );
    const popoverCN = twMerge(clsx("max-w-full", classes?.popover));
    const searchInputCN = twMerge(
        clsx(
            "w-full min-w-32 flex-1 border-b-blue-400 text-sm text-slate-500 outline-none focus:border-b",
            classes?.searchInput
        )
    );
    const selectCN = twMerge(
        clsx(
            "relative max-h-72 w-full overflow-auto rounded-md border border-slate-200 bg-white/90 px-1.5 py-2 shadow",
            classes?.select
        )
    );
    const tagCN = twMerge(
        clsx(
            "item-center inline-flex gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-sm text-slate-500 selected:border-blue-400",
            classes?.tag
        )
    );
    return {
        labelCN,
        labelWrapperCN,
        listCN,
        listItemCN,
        popoverCN,
        searchInputCN,
        selectCN,
        tagCN,
    };
};

export default useMultiSelectClasses;

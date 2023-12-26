import React from "react";

import { CheckIcon } from "@heroicons/react/20/solid";
import { useOption } from "react-aria";

import { OptionProps } from ".";

const Option = ({ item, state }: OptionProps) => {
    const ref = React.useRef<HTMLLIElement>(null);
    const { optionProps, isSelected, isFocused } = useOption(
        {
            key: item.key,
        },
        state,
        ref
    );

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

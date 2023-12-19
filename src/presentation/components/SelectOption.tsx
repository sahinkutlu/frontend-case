import React from "react";

import { TOption } from "@domain/options.dto";

type SelectOptionProps = {
  inputId: string;
  option: TOption;
  checked: boolean;
  onChange: () => void;
};

const SelectOption = React.forwardRef<HTMLLIElement, SelectOptionProps>(
  ({ inputId, option, checked, onChange }, ref) => {
    const itemClass =      "flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600";

    const optionContent = (
      <>
        <input
          id={inputId}
          value={option.value}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
        />
        <label
          htmlFor={inputId}
          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          {option.label}
        </label>
      </>
    );

    const content = ref ? (
      <li className={itemClass} ref={ref}>
        {optionContent}
      </li>
    ) : (
      <li className={itemClass}>{optionContent}</li>
    );

    return content;
  }
);

export default React.memo(SelectOption);

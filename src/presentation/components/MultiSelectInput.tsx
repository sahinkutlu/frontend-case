import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useInView } from "react-intersection-observer";

import { TOption } from "@domain/options.dto";
import SearchIcon from "@presentation/components/Icons/SearchIcon";

import ErrorBox from "./ErrorBox/ErrorBox";
import SelectOption from "./SelectOption";
import Spinner from "./Spinner/Spinner";

interface MultiselectInputProps {
  label: string;
  placeHolder: string;
  selectedOptions: TOption[];
  searchQuery: string;
  errorMessage?: string;
  data: TOption[];
  isLoading: boolean;
  setSelectedOptions: Dispatch<SetStateAction<TOption[]>>;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  inViewHandler: Dispatch<SetStateAction<boolean>>;
}

const MultiselectInput: React.FC<MultiselectInputProps> = ({
  label,
  placeHolder,
  selectedOptions,
  searchQuery,
  errorMessage = undefined,
  isLoading,
  data,
  setSelectedOptions,
  setSearchQuery,
  inViewHandler,
}) => {
  const { ref, inView } = useInView();

  const [selectedValues, setSelectedValues] = useState<string[]>(
    selectedOptions.map(({ value }) => value)
  );

  const handleSelectOption = (option: TOption) => {
    setSelectedOptions([...selectedOptions, option]);
    setSelectedValues((prevState) => [...prevState, option.value]);
  };

  const handleDeselectOption = ({ value }: Pick<TOption, "value">) => {
    setSelectedOptions(
      selectedOptions.filter((selectedOption) => selectedOption.value !== value)
    );
    setSelectedValues((prevState) => prevState.filter((item) => item !== value));
  };

  const updateQuery = useCallback(
    (value: string) => {
      setSearchQuery(value);
    },
    [setSearchQuery]
  );

  const options = [
    ...selectedOptions,
    ...data.filter(({ value }) => !selectedValues.includes(value)),
  ];

  useEffect(() => {
    inViewHandler(inView);
  }, [inViewHandler, inView]);

  const content = options.map((option, i) => {
    const inputId = `checked-checkbox-${label}-${option.value}`;
    const checked = selectedValues.includes(option.value);

    if (options.length >= 3 && options.length - 3 === i) {
      return (
        <SelectOption
          key={inputId}
          ref={ref}
          inputId={inputId}
          option={option}
          checked={checked}
          onChange={() => {
            if (checked) {
              handleDeselectOption(option);
            } else {
              handleSelectOption(option);
            }
          }}
        />
      );
    }

    return (
      <SelectOption
        key={inputId}
        inputId={inputId}
        option={option}
        checked={checked}
        onChange={() => {
          if (checked) {
            handleDeselectOption(option);
          } else {
            handleSelectOption(option);
          }
        }}
      />
    );
  });

  return (
    <section className="z-10 w-60 rounded-lg bg-white shadow dark:bg-gray-700">
      <div className="p-3">
        <label htmlFor="input-group-search">{label}</label>
        <div className="relative mt-2">
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <SearchIcon />
          </div>
          <input
            type="text"
            id="input-group-search"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pr-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder={placeHolder}
            value={searchQuery}
            onChange={(e) => updateQuery(e.target.value)}
          />
        </div>
      </div>
      <ul className="h-48 overflow-y-auto px-3 pb-3 text-sm text-gray-700 dark:text-gray-200">
        {content}
        {errorMessage && <ErrorBox message={errorMessage} />}
        {isLoading && (
          <div>
            <Spinner />
          </div>
        )}
      </ul>
    </section>
  );
};

export default React.memo(MultiselectInput);

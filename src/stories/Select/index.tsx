import React, { useEffect } from "react";
import "./select.css";
import SearchIcon from "./SearchIcon";
import parse from "html-react-parser";

type OptionProps = {
  value: string;
  index: number;
  onToggle: (val: string) => void;
};

const Option = ({ value, onToggle, index }: OptionProps) => (
  <div className="select_option">
    <label htmlFor={`option${index}`} className="select_option_form-control">
      <input
        type="checkbox"
        id={`option${index}`}
        onChange={() => {
          onToggle(value);
        }}
      />
      <span>{parse(value)}</span>
    </label>
  </div>
);

type SelectProps = {
  options: string[];
  title: string;
};

const Select = ({ options, title }: SelectProps) => {
  const [filteredOptions, setFilteredOptions] =
    React.useState<string[]>(options); // [1
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const [search, setSearch] = React.useState<string>("");

  const handleOnToggle = (val: string) => {
    if (selectedOptions.includes(val)) {
      setSelectedOptions(selectedOptions.filter((v) => v !== val));
    } else {
      setSelectedOptions([...selectedOptions, val]);
    }
  };

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  var timeout: any = null;

  useEffect(() => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      setFilteredOptions(
        options.filter((option) =>
          option.toLowerCase().includes(search.toLowerCase())
        )
      );
    }, 500);
  }, [search]);

  return (
    <div className="select_container">
      <div className="select_title">{title}</div>
      <div className="select_search">
        <input
          type="text"
          placeholder="Kategori Ara..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <div className="search_icon">
          <SearchIcon />
        </div>
      </div>
      <div className="select_list">
        {filteredOptions.length === 0 && (
          <div className="select_list_no_option">Seçenek bulunamadı</div>
        )}
        {filteredOptions.map((option, index) => (
          <Option
            index={index}
            key={`option-${index}`}
            value={option}
            onToggle={handleOnToggle}
          />
        ))}
      </div>
      <button
        className="select_search_button"
        onClick={() => {
          console.log(selectedOptions);
        }}
      >
        Ara
      </button>
    </div>
  );
};

export default Select;

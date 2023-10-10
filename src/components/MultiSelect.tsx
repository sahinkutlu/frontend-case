// MultiSelectComponent.tsx
import React from "react";
import Select from "react-select";

interface MultiSelectProps {
  data: string[]; // Ensure data is always an array
  selectedItems: string[];
  onSelectionChange: (selected: string[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  data,
  selectedItems,
  onSelectionChange,
}) => {
  if (!Array.isArray(data)) {
    console.error("Data is not an array:", data);
    return <div>Error: Invalid data</div>;
  }

  const options = data.map((item) => ({ value: item, label: item }));

  const handleChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions.map((option: any) => option.value);
    onSelectionChange(selectedValues);
  };

  return (
    <div className="w-full p-10">
      <Select
        placeholder="Filter categories and select"
        options={options}
        isMulti
        value={options.filter((option) => selectedItems.includes(option.value))}
        onChange={handleChange}
      />
    </div>
  );
};

export default MultiSelect;

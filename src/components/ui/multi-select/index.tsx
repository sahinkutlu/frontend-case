import { FC, useRef, useState } from "react";
import classes from "./styles.module.scss";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import SearchIcon from "@/assets/search.svg";
import { removeDuplicateValues } from "@/lib/utils";
import { getFromLS, saveToLS } from "@/lib/ls";
import { MULTISELECT_SELECTED_KEY } from "@/constants";

export type Item = {
  value: string;
  label: string;
};

interface Props {
  items: Array<Item>;
  title: string;
  buttonText?: string;
  searchText?: string;
}

const MultiSelect: FC<Props> = ({ items, title, buttonText, searchText }) => {
  const [selectedItems, setSelectedItems] = useState<Array<Item["value"]>>(getFromLS(MULTISELECT_SELECTED_KEY) ?? []);
  const searchFilterRef = useRef<HTMLInputElement>(null);
  const [filter, setFilter] = useState("");

  const handleOnClickItem = (value: Item["value"]) => [
    setSelectedItems((currentSelectedItems) => {
      const selectedItems = [...currentSelectedItems];
      const currentItemIndex = selectedItems.indexOf(value);

      if (currentItemIndex === -1) {
        selectedItems.push(value);
      } else {
        selectedItems.splice(currentItemIndex, 1);
      }

      saveToLS(MULTISELECT_SELECTED_KEY, selectedItems)

      return selectedItems;
    }),
  ];

  const handleOnClickSearchButton = () => {
    setFilter(searchFilterRef.current?.value ?? "");
  };

  const cleanData = removeDuplicateValues(items);

  const sortedItems = cleanData.sort((a, b) => {
    if (selectedItems.includes(a.value) && !selectedItems.includes(b.value))
      return -1;
    if (selectedItems.includes(b.value) && !selectedItems.includes(a.value))
      return 1;
    else return a.value.localeCompare(b.value);
  });

  const filteredItems = sortedItems.filter(
    (item) =>
      item.label.toLowerCase().includes(filter.toLowerCase()) ||
      selectedItems.includes(item.value)
  );

  const renderItems = filteredItems.length ? filteredItems.map((item) => {
    const isSelectedItem = selectedItems.includes(item.value);

    return (
      <li
        key={item.value}
        className={`${classes.item} ${isSelectedItem && classes.selected}`}
        onClick={handleOnClickItem.bind(this, item.value)}
      >
        <div className={classes.checkbox}>
          <span className={classes.checkboxTic}></span>
        </div>
        <p>{item.label}</p>
      </li>
    );
  }) : "Sonuç bulunamadı.";

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>{title}</h1>

      <Input
        ref={searchFilterRef}
        placeholder={searchText ?? "Kategori ara..."}
        icon={<img src={SearchIcon} />}
        onClear={() => setFilter("")}
        onEnter={handleOnClickSearchButton}
      />

      <ul className={classes.itemsWrapper}>{renderItems}</ul>

      <Button
        className={classes.submitButton}
        onClick={handleOnClickSearchButton}
      >
        {buttonText ?? "Ara"}
      </Button>
    </div>
  );
};

export default MultiSelect;

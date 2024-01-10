import styles from "./MultiSelect.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useMultiSelectState } from "./MultiSelect.context";
import { useCallback } from "react";
import { MultiSelectOption } from "./MultiSelect.types";

interface MultiSelectSelectedCellsProps {
  setSelectedOptions: React.Dispatch<React.SetStateAction<MultiSelectOption[]>>;
}

function MultiSelectSelectedCells({ setSelectedOptions }: MultiSelectSelectedCellsProps) {
  const state = useMultiSelectState();

  const handleRemove = useCallback(
    (id: number) => {
      setSelectedOptions((options) => options.filter((o) => o.id !== id));
    },
    [setSelectedOptions]
  );

  const renderCell = useCallback(
    (option: MultiSelectOption) => {
      return (
        <div className={styles.selectedCell} key={option.id}>
          <span>{option.title}</span>
          <button className={styles.xMark} onClick={() => handleRemove(option.id)} tabIndex={1}>
            <FontAwesomeIcon fixedWidth icon={faXmark} />
          </button>
        </div>
      );
    },
    [handleRemove]
  );
  return <>{state.selectedOptions.map(renderCell)}</>;
}

export default MultiSelectSelectedCells;

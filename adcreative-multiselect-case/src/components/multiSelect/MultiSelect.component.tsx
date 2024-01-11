import styles from "./MultiSelect.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import MultiSelectMenu from "./MultiSelectMenu.component";
import { useEffect, useRef } from "react";
import { useMultiSelectState, useMultiSelectStateDispatch } from "./MultiSelect.context";
import MultiSelectSelectedCells from "./MultiSelectSelectedCells.components";

// Next iteration would be providing replacable components.
const MultiSelect = () => {
  const { error, searchText, menuExpanded } = useMultiSelectState();
  const { setSearchText, setSelectedOptions, setMenuExpanded } = useMultiSelectStateDispatch();

  // Ensure menu is expanded during search
  useEffect(() => {
    if (!!searchText.length) {
      setMenuExpanded(true);
    }
  }, [setMenuExpanded, searchText]);

  // Handle collapse menu on click outside
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && event.target instanceof Node && !ref.current.contains(event.target)) {
        setMenuExpanded(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setMenuExpanded]);

  const controlClasses = error ? `${styles.control} ${styles.error}` : `${styles.control}`;
  return (
    <div className={controlClasses} ref={ref}>
      <div className={styles.selectionContainer}>
        <MultiSelectSelectedCells setSelectedOptions={setSelectedOptions} />
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            tabIndex={2}
            onChange={(e) => {
              setSearchText(e.target.value);
            }} // debounce would be good
            value={searchText}
          />
        </div>
      </div>
      <button className={styles.controlIcon} onClick={() => setMenuExpanded((prevState) => !prevState)} tabIndex={3}>
        <FontAwesomeIcon fixedWidth icon={faCaretDown} />
      </button>
      {menuExpanded && <MultiSelectMenu setSelectedOptions={setSelectedOptions} />}
    </div>
  );
};

export default MultiSelect;

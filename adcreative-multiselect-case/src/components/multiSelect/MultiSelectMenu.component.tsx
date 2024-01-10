import styles from "./MultiSelect.module.scss";
import { MenuLoading, MenuError } from "./MultiSelectMenuLoadingError.component";
import { MultiSelectOption } from "./MultiSelect.types";
import { useMultiSelectState } from "./MultiSelect.context";
import DOMPurify from "dompurify";

//no-op
const noop = () => {};

const isItemSelected = (selectedOptions: MultiSelectOption[], id: number) =>
  selectedOptions.some((option) => option.id === id);

// toLowerCase suits needs here but would require more enhanced solution if it wasn't this simple
const hasSearchText = (text: string, searchText: string) => text.match(new RegExp(searchText, "i"));

const getHighlightedText = (text: string, searchText: string) => {
  if (!hasSearchText(text, searchText)) {
    return text;
  }
  const higlightedText = text.replace(new RegExp(searchText, "ig"), (match) => `${`<strong>${match}</strong>`}`);
  return higlightedText;
};

const MenuItem = ({
  id,
  title,
  description,
  imageUrl,
  setSelectedOptions,
}: MultiSelectOption & MultiSelectMenuProps) => {
  const state = useMultiSelectState();

  const highlightedTitle = getHighlightedText(title, state.searchText);

  const itemSelected = isItemSelected(state.selectedOptions, id);
  const handleOnChange = () => {
    if (itemSelected) {
      setSelectedOptions((prevState) => prevState.filter((state) => state.id !== id));
    } else {
      setSelectedOptions((prevState) => [...prevState, { id, title, description, imageUrl }]);
    }
  };
  return (
    <div className={styles.menuItem} onClick={handleOnChange}>
      <input type="checkbox" id={`character_${id}`} checked={itemSelected} onChange={noop} />
      <div className={styles.content}>
        <div className={styles.contentImage}>
          <img src={imageUrl} alt={title} />
        </div>
        <div className={styles.contentInfo}>
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(highlightedTitle) }}></div>
          <div className={styles.contentDescription}>{description}</div>
        </div>
      </div>
    </div>
  );
};

interface MultiSelectMenuProps {
  setSelectedOptions: React.Dispatch<React.SetStateAction<MultiSelectOption[]>>;
}
const MultiSelectMenu = ({ setSelectedOptions }: MultiSelectMenuProps) => {
  const state = useMultiSelectState();
  const menuClasses = state.error ? `${styles.menu} ${styles.error}` : `${styles.menu}` 
  return (
    <div className={menuClasses}>
      {state.loading && <MenuLoading />}
      {!state.loading && state.options.length === 0 && <MenuError />}
      {!state.loading &&
        state.options.map((option) => (
          <MenuItem
            key={`${option.id}_${state.searchText}`}
            id={option.id}
            title={option.title}
            description={option.description}
            imageUrl={option.imageUrl}
            setSelectedOptions={setSelectedOptions}
          />
        ))}
    </div>
  );
};

export default MultiSelectMenu;

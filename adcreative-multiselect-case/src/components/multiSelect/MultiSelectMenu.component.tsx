import styles from "./MultiSelect.module.scss";
import MenuLoading from "./MultiSelectMenuLoading.component";
import { MultiSelectOption } from "./MultiSelect.types";
import { useMultiSelectState } from "./MultiSelect.context";

const isItemSelected = (selectedOptions: MultiSelectOption[], id: number) =>
  selectedOptions.some((option) => option.id === id);

const MenuItem = ({ id, title, description, imageUrl, setSelectedOptions }: MultiSelectOption & MultiSelectMenuProps) => {
  const state = useMultiSelectState();
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
      <input type="checkbox" id={`character_${id}`} checked={itemSelected} />
      <div className={styles.content}>
        <div className={styles.contentImage}>
          <img src={imageUrl} alt={title} />
        </div>
        <div className={styles.contentInfo}>
          <div>{title}</div>
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

  return (
    <div className={styles.menu}>
      {!state.loading &&
        state.options.map((option) => (
          <MenuItem
            key={option.id}
            id={option.id}
            title={option.title}
            description={option.description}
            imageUrl={option.imageUrl}
            setSelectedOptions={setSelectedOptions}
          />
        ))}
      {state.loading && <MenuLoading />}
    </div>
  );
};

export default MultiSelectMenu;

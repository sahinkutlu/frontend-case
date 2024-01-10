import styles from "./MultiSelect.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useMultiSelectState } from "./MultiSelect.context";

const MenuLoading = () => {
  return (
    <div className={styles.loadingContainer}>
      <FontAwesomeIcon fixedWidth icon={faSpinner} className={styles.loadingIcon} />
    </div>
  );
};

const MenuError = () => {
  const state = useMultiSelectState();
  return (
    <div className={styles.errorContainer}>
      <FontAwesomeIcon fixedWidth icon={faCircleExclamation} className={styles.errorIcon} />
      <span>{state.error}</span>
    </div>
  );
}

export { MenuLoading, MenuError };

import styles from "./MultiSelect.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const MenuLoading = () => {
  return (
    <div className={styles.loadingContainer}>
      <FontAwesomeIcon fixedWidth icon={faSpinner} className={styles.loadingIcon} />
    </div>
  );
};

export default MenuLoading;

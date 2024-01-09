import styles from "./MultiSelect.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

function MenuLoading() {
  return (
    <div className={styles.loadingContainer}>
      <FontAwesomeIcon
        fixedWidth
        icon={faSpinner}
        className={styles.loadingIcon}
      />
    </div>
  )
}

function MenuItem() {
  return (
    <div className={styles.menuItem}>
      <input type="checkbox" name="" id="" />
      <div className={styles.content}>
        <div className={styles.contentImage}></div>
        <div className={styles.contentInfo}>
          <div>Rick Sanchez</div>
          <div className={styles.contentDescription}>51 Episodes</div>
        </div>
      </div>
    </div>
  )
}

function MultiSelectMenu() {
  return (
    <div className={styles.menu}>
      <MenuItem />
      <MenuItem />
      <MenuItem />
      <MenuItem />
      <MenuItem />
      {/* <MenuLoading /> */}
    </div>
  )
}

export default MultiSelectMenu

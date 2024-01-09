import styles from "./MultiSelect.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown, faXmark } from "@fortawesome/free-solid-svg-icons"
import MultiSelectMenu from "./MultiSelectMenu.component"

function MultiSelect() {
  return (
    <div className={styles.control}>
      <div className={styles.selectionContainer}>
        <div className={styles.selectedCell}><span>Rick Sanchez</span> <span className={styles.xMark}><FontAwesomeIcon fixedWidth icon={faXmark} tabIndex={1} /></span></div>
        <div className={styles.selectedCell}><span>Morty Smith</span> <span className={styles.xMark}><FontAwesomeIcon fixedWidth icon={faXmark} tabIndex={1}/></span></div>
        <div className={styles.searchContainer}><input type="text" className={styles.searchInput} tabIndex={2} /></div>
      </div>
      <div className={styles.controlIcon}>
        <FontAwesomeIcon fixedWidth icon={faCaretDown} tabIndex={3}/>
      </div>
      <MultiSelectMenu />
    </div>
  )
}

export default MultiSelect

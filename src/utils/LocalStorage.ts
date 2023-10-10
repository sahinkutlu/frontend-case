class LocalStorageUtil {
  static saveSelectedItems(selectedItems: string[]): void {
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
  }

  static getSelectedItems(): string[] {
    const storedItems = localStorage.getItem("selectedItems");
    return storedItems ? JSON.parse(storedItems) : [];
  }
}

export default LocalStorageUtil;

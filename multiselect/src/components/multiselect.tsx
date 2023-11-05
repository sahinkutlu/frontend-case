import React, { useState, useEffect, useRef } from "react";
import "./multiselect.css";
import items from "./items.json";

interface MultiSelectDropdownProps {
  options: string[];
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);

  const dropdownRef = useRef(null);

  useEffect(() => {
    try {
      const storedItems = localStorage.getItem("selectedItems");
      if (storedItems) {
        setSelectedItems(JSON.parse(storedItems));
      }
    } catch (error) {
      setError("Local storage hatası: " + error.message);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    } catch (error) {
      setError("Local storage hatası: " + error.message);
    }
  }, [selectedItems]);

  const toggleItemSelection = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const openDropdown = () => {
    setIsOpen(true);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const clearError = () => {
    setError(null);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      openDropdown();
    } else {
      closeDropdown();
    }
  };

  const uniqueOptions = Array.from(new Set(items.data));
  const selectedOptions = uniqueOptions.filter((item) =>
    selectedItems.includes(item)
  );
  const unselectedOptions = uniqueOptions.filter(
    (item) => !selectedItems.includes(item)
  );
  const filteredUnselectedOptions = unselectedOptions.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="multi-select-dropdown" ref={dropdownRef}>
      <div className="search-bar">
        {" "}
        <div className="cursor-pointer" onClick={toggleDropdown}>
          {selectedItems.length === 0
            ? "Kategoriler"
            : `${selectedItems.length} kategori seçildi`}
        </div>
        <input
          type="text"
          placeholder="Ara..."
          value={searchTerm}
          onChange={handleSearchInputChange}
          className="search-input"
        />
      </div>
      {error && (
        <div>
          {error}
          <button onClick={clearError}>Kapat</button>
        </div>
      )}
      {isOpen && (
        <ul className="options">
          {selectedOptions.map((item) => (
            <li key={item}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item)}
                  onChange={() => toggleItemSelection(item)}
                />
                {item}
              </label>
            </li>
          ))}
          {filteredUnselectedOptions.map((item) => (
            <li key={item}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item)}
                  onChange={() => toggleItemSelection(item)}
                />
                {item}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiSelectDropdown;

import React, { useEffect, useState } from "react";
import items from "../assets/items.json";

function MultiSelect() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchedItems, setSearchedItems] = useState<string[]>([]);
  const [searchClicked, setSearchClicked] = useState<boolean>(false);


  const onCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedItems([...selectedItems, e.target.value]);
      localStorage.setItem(
        "selectedItems",
        JSON.stringify([...selectedItems, e.target.value])
      );
    }
    if (e.target.checked === false) {
      setSelectedItems(selectedItems.filter((item) => item !== e.target.value));
      localStorage.setItem(
        "selectedItems",
        JSON.stringify(selectedItems.filter((item) => item !== e.target.value))
      );
    }
  };

  const handleSearch = () => {
    setSearchClicked(true);
    const searchedItems = items.data.filter((item) =>
      item.toLowerCase().includes(searchTerm)
    );
    setSearchedItems(searchedItems);
  };

  useEffect(() => {
    let fetchedItems: any = localStorage.getItem("selectedItems");
    if (fetchedItems !== null) {
      setSelectedItems(JSON.parse(fetchedItems));
  
      // let bufferArr = [...new Set([...filteredItems, ...items.data])]
      // console.log(bufferArr)
      // setFilteredItems(bufferArr)
    }
  }, []);

  return (
    <>
      <div className="relative ">
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const searchTerm = e.target.value.toLowerCase();
            setSearchClicked(false);
            setSearchTerm(searchTerm);
          }}
          className="multiselect-input border-2 border-slate-400 px-2 py-2 rounded-md"

          placeholder="kategori ara..."
        />
        <svg
          className="absolute top-0 right-0 mt-3 mr-3 cursor-pointer"
          onClick={handleSearch}
          width="20"
          height="20"
          viewBox="0 0 14 14"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.8 12.2l-3.9-4c.6-.8 1.1-2 1.1-3.1 0-2.8-2.3-5-5-5-2.8 0-5 2.3-5 5 0 2.8 2.2 5 5 5 .8 0 1.7-.2 2.3-.5l3.9 4.3c.2.2.6.2.8 0l.8-.8c.3-.3.3-.7 0-.9zM6 8.1c-1.7 0-3-1.4-3-3 0-1.7 1.4-3 3-3s3 1.4 3 3-1.4 3-3 3z"
            fillRule="evenodd"
          />
        </svg>
      </div>
      <div className="relative mt-2 overflow-y-auto overflow-x-hidden">
        <ul className="list-none ml-2 mt-2">
        {
            selectedItems.map((item, i) => (
              <li key={i}>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.toLowerCase())}
                  className="checked:text-blue-600 p-2 appearance-none checked:bg-blue-600 checked:bg-none "
                  value={item.toLowerCase()}
                  onChange={onCheck}
                />{" "}
                <span
                  className={`ml-2 ${
                    selectedItems.includes(item.toLowerCase()) &&
                    "text-blue-600"
                  }`}
                  style={{ fontSize: "18px" }}
                >
                  {item}
                </span>
              </li>
            ))}

          {searchTerm !== "" &&
            searchedItems.map((item, i) => (
              <li key={i}>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.toLowerCase())}
                  className="checked:text-blue-600 p-2 appearance-none checked:bg-blue-600 checked:bg-none "
                  value={item.toLowerCase()}
                  onChange={onCheck}
                />{" "}
                <span
                  className={`ml-2 ${
                    selectedItems.includes(item.toLowerCase()) &&
                    "text-blue-600"
                  }`}
                  style={{ fontSize: "18px" }}
                >
                  {item}
                </span>
              </li>
            ))}

          {(searchClicked === false || searchTerm === "") &&
            items.data.map((item, i) => (
              <li key={i}>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.toLowerCase())}
                  className="checked:text-blue-600 p-2 appearance-none checked:bg-blue-600 checked:bg-none "
                  value={item.toLowerCase()}
                  onChange={onCheck}
                />{" "}
                <span
                  className={`ml-2 ${
                    selectedItems.includes(item.toLowerCase()) &&
                    "text-blue-600"
                  }`}
                  style={{ fontSize: "18px" }}
                >
                  {item}
                </span>
              </li>
            ))}
        </ul>
      </div>
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white p-2 rounded-md mt-2"
      >
        Ara
      </button>
    </>
  );
}

export default MultiSelect;

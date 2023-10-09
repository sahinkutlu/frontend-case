import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Select from "./Select";
import itemsJson from "../../../assets/items";

const categoryArray = itemsJson.data;

// Making a new array of objects from categoryArray
let categoryExtend = [];
categoryArray.forEach((categoryName) => {
  const obj = {
    id: uuidv4(),
    name: categoryName,
    isChecked: false,
  };
  categoryExtend.push(obj);
});

const Form = () => {
  const [category, setCategory] = useState(categoryExtend);

  const handleCategoryClick = (e) => {
    // Making copy of state
    const array = [...category];
    if (e.target.checked) {
      array.forEach((item) => {
        if (item.name === e.target.name) {
          // Making a copy of item and than deleting item from array
          const index = array.indexOf(item);
          const element = array[index];
          array.splice(index, 1);

          // Set element's isChecked value to true
          element.isChecked = true;

          // Add element to beginning of array
          array.unshift(element);
        }
        setCategory(array);
      });
    } else {
      array.forEach((item) => {
        if (item.name === e.target.name) {
          item.isChecked = false;
        }
      });
      setCategory(array);
    }
  };
  return (
    <form action="">
      <h2>Kategoriler</h2>
      <div className="search">
        <label htmlFor="search"></label>
        <input
          type="text"
          id="search"
          placeholder="Kategori ara..."
          name="search"
        />
      </div>
      <Select category={category} handleCategoryClick={handleCategoryClick} />
      <button>Ara</button>
    </form>
  );
};

export default Form;

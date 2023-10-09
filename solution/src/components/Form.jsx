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
    checked: false,
  };
  categoryExtend.push(obj);
});
console.log(categoryExtend);

const Form = () => {
  const [category, setCategory] = useState(categoryExtend);
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
      <Select category={category} />
      <button>Ara</button>
    </form>
  );
};

export default Form;

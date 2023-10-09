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
  const [search, setSearch] = useState([]);

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

  const handleSearchClick = (e) => {
    // Making copy of states
    const searchArr = [...search];
    const categoryArr = [...category];
    if (e.target.checked) {
      searchArr.forEach((item) => {
        if (item.name === e.target.name) {
          // Making a copy of item and than deleting item from array
          const index = searchArr.indexOf(item);
          const element = searchArr[index];
          searchArr.splice(index, 1);

          // Set element's isChecked value to true
          element.isChecked = true;

          // Add element to beginning of array
          searchArr.unshift(element);

          // Changing element's isChecked status on category state
          categoryArr.forEach((item) => {
            if (item.id === element.id) {
              // Making copy of state
              const index = categoryArr.indexOf(item);
              // Deleting item from categoryArr
              categoryArr.splice(index, 1);
              // Adding element to begining of the categoryArr
              categoryArr.unshift(element);
            }
          });
        }
        setSearch(searchArr);
        setCategory(categoryArr);
      });
    } else {
      searchArr.forEach((item) => {
        if (item.name === e.target.name) {
          item.isChecked = false;
        }
      });
      categoryArr.forEach((item) => {
        if (item.name === e.target.name) {
          item.isChecked = false;
        }
      });
      setSearch(searchArr);
      setCategory(categoryArr);
    }
  };

  const handleChange = (e) => {
    // If user delete all search str set search as an empty array
    if (e.target.value === "") {
      setSearch([]);
      return;
    }

    let array = [];

    // Getting checked catagories from category state
    let categoryArr = [...category];
    let i = 0;
    categoryArr.forEach((item) => {
      if (item.isChecked) {
        array.push(item);
        i++;
      }
    });
    // Delete checked catagories from categoryArr
    categoryArr.splice(0, i);

    categoryArr.forEach((item) => {
      if (item.name.toLowerCase().startsWith(e.target.value.toLowerCase())) {
        array.push(item);
        const index = categoryArr.indexOf(item);
        categoryArr.splice(index, 1);
      }
    });

    setSearch(array);
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
          onChange={handleChange}
        />
      </div>
      <Select
        category={category}
        handleCategoryClick={handleCategoryClick}
        search={search}
        handleSearchClick={handleSearchClick}
      />
      <button>Ara</button>
    </form>
  );
};

export default Form;

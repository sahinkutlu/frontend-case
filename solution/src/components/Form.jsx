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
  const localCategory = JSON.parse(localStorage.getItem("category"));
  // Sorting localCategory
  if (localCategory) {
    localCategory.sort((a, b) => b.isChecked - a.isChecked);
  }

  const [category, setCategory] = useState(localCategory || categoryExtend);
  const [search, setSearch] = useState([]);
  const [error, setError] = useState(null);

  const handleCategoryClick = (e) => {
    try {
      // Making copy of state
      const array = [...category];
      if (e.target.checked) {
        array.forEach((item) => {
          if (item.name === e.target.name) {
            item.isChecked = true;
          }
        });
      } else {
        array.forEach((item) => {
          if (item.name === e.target.name) {
            item.isChecked = false;
          }
        });
      }
      array.sort((a, b) => b.isChecked - a.isChecked);
      setCategory(array);
      // Saving data to prevent data loss on refresh
      localStorage.setItem("category", JSON.stringify(category));
    } catch (err) {
      setError(err);
    }
  };

  const handleSearchClick = (e) => {
    try {
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
      // Saving data to prevent data loss on refresh
      localStorage.setItem("category", JSON.stringify(category));
    } catch (err) {
      setError(err);
    }
  };

  const handleChange = (e) => {
    try {
      // If user delete all search str set search as an empty array
      if (e.target.value === "") {
        setSearch([]);
        return;
      }

      let array = [];

      // Getting checked catagories from category state
      let categoryArr = [...category];
      let checkedCategories = 0;
      categoryArr.forEach((item) => {
        if (item.isChecked) {
          array.push(item);
          checkedCategories++;
        }
      });
      // Delete checked catagories from categoryArr
      categoryArr.splice(0, checkedCategories);

      categoryArr.forEach((item) => {
        if (item.name.toLowerCase().startsWith(e.target.value.toLowerCase())) {
          array.push(item);
        }
      });

      setSearch(array);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      {error ? (
        <>
          <h2>Sorry, an unexpected error occurred!!!</h2>
          <p>{error}</p>
        </>
      ) : (
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
      )}
    </>
  );
};

export default Form;

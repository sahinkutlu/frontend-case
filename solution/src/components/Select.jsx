import React from "react";

const Select = (props) => {
  const { category, handleCategoryClick, search, handleSearchClick } = props;

  return (
    <div className="categories">
      {search.length
        ? search.map((item) => {
            return (
              <div key={item.id} className="category" id="s">
                <input
                  name={item.name}
                  type="checkbox"
                  defaultChecked={item.isChecked}
                  className="category-input"
                  onClick={handleSearchClick}
                />
                <label htmlFor={item.name}>{item.name}</label>
              </div>
            );
          })
        : category.map((item) => {
            return (
              <div key={item.id} className="category" id="c">
                <input
                  name={item.name}
                  type="checkbox"
                  defaultChecked={item.isChecked}
                  className="category-input"
                  onClick={handleCategoryClick}
                />
                <label htmlFor={item.name}>{item.name}</label>
              </div>
            );
          })}
    </div>
  );
};

export default Select;

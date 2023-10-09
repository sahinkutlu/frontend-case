import React from "react";

const Select = (props) => {
  const { category, handleCategoryClick } = props;

  return (
    <div className="categories">
      {category.map((item) => {
        return (
          <div key={item.id} className="category">
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

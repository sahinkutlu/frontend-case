import React from "react";

const Select = (props) => {
  const { category } = props;

  return (
    <div>
      {category.map((item) => {
        return (
          <div key={item.id}>
            <input name={item.name} type="checkbox" checked={item.checked} />
            <label htmlFor={item.name}>{item.name}</label>
          </div>
        );
      })}
    </div>
  );
};

export default Select;

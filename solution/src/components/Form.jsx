import React from "react";

const Form = () => {
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
    </form>
  );
};

export default Form;

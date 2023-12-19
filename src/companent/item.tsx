import React from "react";

interface ItemProps {
  filtName: string;
}

export const Item: React.FC<ItemProps> = ({ filtName }) => {
  return (
    <div className="select-item">
      <div>
        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
      </div>
      <div>
        <label>{filtName}</label>
      </div>
    </div>
  );
}


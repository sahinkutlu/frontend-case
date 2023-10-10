// App.tsx
import React, { useState, useEffect } from "react";
import DataService from "./services/DataService";
import LocalStorageUtil from "./utils/LocalStorage";
import MultiSelect from "./components/MultiSelect";

const App: React.FC = () => {
  const [data, setData] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await DataService.getData();
        setData(result);
      } catch (error) {
        console.error("Veri alınamadı:", error);
      }
    };

    fetchData();

    const storedSelectedItems = LocalStorageUtil.getSelectedItems();
    setSelectedItems(storedSelectedItems);
  }, []);

  useEffect(() => {}, []);

  const handleSelectionChange = (selected: string[]) => {
    setSelectedItems(selected);
    LocalStorageUtil.saveSelectedItems(selected);
  };

  return (
    <div className="flex justify-center h-screen bg-gray-800">
      {data && (
        <div className="w-full mt-10">
          <MultiSelect
            data={data}
            selectedItems={selectedItems}
            onSelectionChange={handleSelectionChange}
          />
        </div>
      )}
    </div>
  );
};

export default App;

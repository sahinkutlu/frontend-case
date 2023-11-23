import MultiSelect from "@/components/ui/multi-select";
import classes from "./styles.module.scss";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState<string[]>();

  useEffect(() => {
    (async () => {
      const response = await fetch("/items.json");

      if (!response.ok) {
        return window.alert("Bir hata ile karşılaşıldı!");
      }

      const data: { data: string[] } = await response.json();

      setData(data.data);
    })();
  }, []);

  const regulatedData = data?.map((item) => ({ value: item, label: item }));

  return (
    <div className={classes.wrapper}>
      <MultiSelect items={regulatedData ?? []} title="Kategoriler" />
    </div>
  );
}

export default App;

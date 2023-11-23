import { Item } from "@/components/ui/multi-select";

export const removeDuplicateValues = (array: Array<Item>) => {
  const valueSet = new Set();

  return array.filter((item) => {
    if (!valueSet.has(item.value)) {
      valueSet.add(item.value);
      return true;
    }
    
    return false;
  });
};

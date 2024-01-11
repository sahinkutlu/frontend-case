import MultiSelect from "./MultiSelect.component";
import { MultiSelectStateProvider } from "./MultiSelect.context";
import { MultiSelectProps } from "./MultiSelect.types";

function MultiSelectContainer(props: MultiSelectProps) {
  return (
    <MultiSelectStateProvider {...props}>
      <MultiSelect />
    </MultiSelectStateProvider>
  );
}

export default MultiSelectContainer;

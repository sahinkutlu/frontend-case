import MultiSelect, { MultiSelectProps } from "./MultiSelect.component";
import { MultiSelectStateProvider } from "./MultiSelect.context";

function MultiSelectContainer(props: MultiSelectProps) {
  return (
    <MultiSelectStateProvider>
      <MultiSelect {...props} />
    </MultiSelectStateProvider>
  );
}

export default MultiSelectContainer;

import { createContext, useContext, useState } from "react";
import { MultiSelectOption, MultiSelectProps, MultiSelectState } from "./MultiSelect.types";

//no-op
const noop = () => {};

const initialState: MultiSelectState = {
  options: [],
  loading: false,
  error: null,
  selectedOptions: [],
  searchText: '',
  menuExpanded: false
};

// Keep dispatch and state in separate contexts for components that use dispatch only, hence they will not re-render if state changes.
// const StateContext = createContext<MultiSelectState>(initialState);
const StateContext = createContext<MultiSelectState>(initialState);
type StateDispatchContextType = {
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  setSelectedOptions: React.Dispatch<React.SetStateAction<MultiSelectOption[]>>;
  setMenuExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};
const StateDispatchContext = createContext<StateDispatchContextType>({
  setSearchText: noop,
  setSelectedOptions: noop,
  setMenuExpanded: noop
});

export function MultiSelectStateProvider(props: React.PropsWithChildren<MultiSelectProps>) {
  const [menuExpanded, setMenuExpanded] = useState(false);
  const { options, loading, error, selectedOptions, searchText, setSearchText, setSelectedOptions } = props;

  return (
    <StateContext.Provider value={{ options, loading, error, selectedOptions, searchText, menuExpanded }}>
      <StateDispatchContext.Provider value={{ setSearchText, setSelectedOptions, setMenuExpanded }}>
        {props.children}
      </StateDispatchContext.Provider>
    </StateContext.Provider>
  );
}

export function useMultiSelectState() {
  return useContext(StateContext);
}

export function useMultiSelectStateDispatch() {
  return useContext(StateDispatchContext);
}

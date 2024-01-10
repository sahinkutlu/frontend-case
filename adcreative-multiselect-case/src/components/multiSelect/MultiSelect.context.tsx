import { createContext, useContext, useReducer } from "react";
import { Action, MultiSelectState, actions } from "./MultiSelect.types";

const initialState: MultiSelectState = {
  options: [],
  loading: false,
  error: null,
  selectedOptions: [],
  menuExpanded: false,
};

const StateContext = createContext<MultiSelectState>(initialState);

const StateDispatchContext = createContext<React.Dispatch<Action>>(() => null);

export function MultiSelectStateProvider({ children }: any) {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <StateDispatchContext.Provider value={dispatch}>{children}</StateDispatchContext.Provider>
    </StateContext.Provider>
  );
}

export function useMultiSelectState() {
  return useContext(StateContext);
}

export function useMultiSelectStateDispatch() {
  return useContext(StateDispatchContext);
}

function stateReducer(state: MultiSelectState, action: Action): MultiSelectState {
  switch (action.type) {
    case actions.COLLAPSE_MENU: {
      return {
        ...state,
        menuExpanded: false,
      };
    }
    case actions.TOGGLE_MENU: {
      return {
        ...state,
        menuExpanded: !state.menuExpanded,
      };
    }
    case actions.SET_DATA: {
      return {
        ...state,
        options: action.payload.options,
        loading: action.payload.loading,
        error: action.payload.error,
      };
    }
    case actions.SET_SELECTED_OPTIONS: {
      return {
        ...state,
        selectedOptions: action.payload,
      };
    }
    default: {
      throw Error("Unknown action: " + action);
    }
  }
}

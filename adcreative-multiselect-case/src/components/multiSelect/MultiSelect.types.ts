export interface MultiSelectOption {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export interface MultiSelectState {
  options: MultiSelectOption[];
  loading: boolean;
  error: any;
  selectedOptions: MultiSelectOption[];
  menuExpanded: boolean;
}
export const actions = {
  COLLAPSE_MENU: "COLLAPSE_MENU",
  TOGGLE_MENU: "TOGGLE_MENU",
  SET_DATA: "SET_DATA",
  SET_SELECTED_OPTIONS: "SET_SELECTED_OPTIONS",
} as const;

export type Action =
  | { type: typeof actions.COLLAPSE_MENU }
  | { type: typeof actions.TOGGLE_MENU }
  | { type: typeof actions.SET_DATA; payload: Pick<MultiSelectState, "options" | "loading" | "error"> }
  | { type: typeof actions.SET_SELECTED_OPTIONS; payload: MultiSelectOption[] };

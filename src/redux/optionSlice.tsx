import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import items from "../items.json";

export interface optionItem {
  name?: string,
  selected?: boolean,
}

// Define a type for the slice state
export interface optionState {
  list: optionItem[]
}

const json2OptionList = (data: string[]): optionItem[] => {

  return data.map((name: string, i: number) => {
    return { name: name, selected: false };
  });

}


// Define the initial state using that type
const initialState: optionState = {
  list: json2OptionList(items.data),
}

export const optionSlice = createSlice({
  name: "option",
  initialState,
  reducers: {

    /*
    add: (state, action:PayloadAction<IAlert>) => {
      state.list.push(action.payload)
    },

    del: (state) => {
      state.list.pop();
    },
    */
  },
});

//export const { add, del} = optionSlice.actions;

export default optionSlice.reducer;


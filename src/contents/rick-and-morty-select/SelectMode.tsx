import React from "react";

import { Switch } from "react-aria-components";

interface SelectModeProps {
    selected: boolean;
    onChange: (selected: boolean) => void;
}
const SelectMode: React.FC<SelectModeProps> = ({ selected, onChange }) => {
    return (
        <Switch
            onChange={onChange}
            defaultSelected
            className="group absolute bottom-2 right-3 flex items-center gap-2 text-sm font-semibold text-slate-600"
        >
            <div className="box-border flex h-[24px] w-[40px] shrink-0 cursor-default rounded-full border border-solid border-white/30 bg-slate-300 bg-clip-padding p-[3px] shadow-inner outline-none ring-black transition duration-200 ease-in-out group-focus-visible:ring-2 group-pressed:bg-green-300 group-selected:bg-green-400 group-selected:group-pressed:bg-green-500">
                <span className="h-[16px] w-[16px] translate-x-0 transform rounded-full bg-white shadow transition duration-200 ease-in-out group-selected:translate-x-[100%]" />
            </div>
            {selected ? "Multi" : "Single"} Select
        </Switch>
    );
};

export default SelectMode;

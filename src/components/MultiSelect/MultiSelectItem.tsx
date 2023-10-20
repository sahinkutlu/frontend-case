type ItemProps = {
    selectItem: string;
    index: number;
    onChange: (data: string) => void;
    isSelected?: boolean;
};

const MultiSelectItem = ({selectItem, onChange, index, isSelected}: ItemProps) => (
    <li className={`${isSelected ? "selected" : ""}`}>
        <input
            type="checkbox"
            checked={isSelected}
            id={`item-${index}`}
            onChange={() => {
                onChange(selectItem);
            }}
        />
        <label htmlFor={`item-${index}`} dangerouslySetInnerHTML={{__html: selectItem}}/>
    </li>
);

export default MultiSelectItem;
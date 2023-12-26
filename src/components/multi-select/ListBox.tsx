import React from "react";

import { useListBox } from "react-aria";

import { ListBoxProps } from ".";
import Option from "./Option";

const ListBox = (props: ListBoxProps) => {
    const ref = React.useRef<HTMLUListElement>(null);
    const { listBoxRef = ref, state } = props;
    const { listBoxProps } = useListBox(props, state, listBoxRef);

    const onScroll = (e: React.UIEvent) => {
        const scrollOffset =
            e.currentTarget.scrollHeight - e.currentTarget.clientHeight * 2;
        if (e.currentTarget.scrollTop > scrollOffset && props.onLoadMore) {
            props.onLoadMore();
        }
    };

    return (
        <ul
            {...listBoxProps}
            ref={listBoxRef}
            className="my-1 flex max-h-72 w-full flex-col overflow-auto"
            onScroll={onScroll}
        >
            {[...state.collection].map(item => (
                <Option key={item.key} item={item} state={state} />
            ))}
            {props.loadingState === "loadingMore" && (
                <li role="option" className="flex justify-center pb-2 pt-4">
                    <svg
                        className="h-5 w-5 animate-spin text-blue-400"
                        viewBox="0 0 24 24"
                    ></svg>
                </li>
            )}
        </ul>
    );
};
export default ListBox;

import React from "react";

import { DismissButton, Overlay, usePopover } from "@react-aria/overlays";

import type { PopoverProps } from ".";

const Popover = (props: PopoverProps) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const { popoverRef = ref, state, children, isNonModal } = props;

    const { popoverProps, underlayProps } = usePopover(
        {
            ...props,
            popoverRef,
        },
        state
    );

    return (
        <Overlay>
            {!isNonModal && (
                <div
                    {...underlayProps}
                    style={{ position: "fixed", inset: 0 }}
                />
            )}
            <div
                {...popoverProps}
                ref={popoverRef}
                className="z-10 w-64 rounded-lg border border-gray-200 bg-white text-sm text-gray-500 shadow-sm transition-opacity duration-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
            >
                {!isNonModal && <DismissButton onDismiss={state.close} />}
                {children}
                <DismissButton onDismiss={state.close} />
            </div>
        </Overlay>
    );
};
export default Popover;

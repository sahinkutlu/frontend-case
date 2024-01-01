import React from "react";

import { XMarkIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import get from "lodash/get";
import {
    Button,
    Dialog,
    DialogTrigger,
    Modal,
    ModalOverlay,
} from "react-aria-components";

import { CharacterProps } from ".";

interface RickAndMortySelectedDialogProps {
    isOpen: boolean;
    item?: CharacterProps;
    onClose: () => void;
}
const RickAndMortySelectedDialog: React.FC<RickAndMortySelectedDialogProps> = ({
    isOpen,
    item,
    onClose,
}) => {
    const imgSrc = get(item, "image");
    const name = get(item, "name");
    const gender = get(item, "gender");
    const status = get(item, "status");
    const species = get(item, "species");
    const isAlive = status === "Alive";
    return (
        <DialogTrigger isOpen={isOpen} onOpenChange={onClose}>
            <ModalOverlay
                className={({ isEntering, isExiting }) => `
          fixed inset-0 z-10 flex min-h-full items-center justify-center overflow-y-auto bg-black/25 p-4 text-center backdrop-blur
          ${isEntering ? "duration-300 ease-out animate-in fade-in" : ""}
          ${isExiting ? "duration-200 ease-in animate-out fade-out" : ""}
        `}
            >
                <Modal
                    className={({ isEntering, isExiting }) => `
            w-full max-w-sm overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl
            ${isEntering ? "duration-300 ease-out animate-in zoom-in-95" : ""}
            ${isExiting ? "duration-200 ease-in animate-out zoom-out-95" : ""}
          `}
                >
                    <Dialog role="dialog" className="relative outline-none">
                        <div className="px-6 pt-3">
                            <h5
                                className={clsx(
                                    "mb-0 text-xl uppercase leading-3 text-slate-500",
                                    { "line-through": !isAlive }
                                )}
                            >
                                {name}
                            </h5>
                            <span
                                className={clsx(
                                    "text-sm",
                                    isAlive ? "text-green-300" : "text-red-400"
                                )}
                            >
                                {status}
                            </span>
                        </div>
                        <div className="px-6">
                            <img
                                className="w-full rounded-lg"
                                src={imgSrc}
                                alt={name}
                            />
                        </div>
                        <div className="flex justify-end gap-1 px-6 py-1 pb-3 text-xs uppercase text-slate-400">
                            <span>{species}</span>-<span>{gender}</span>
                        </div>

                        <Button
                            onPress={onClose}
                            className={`absolute right-2 top-2 inline-flex cursor-pointer justify-center rounded-md border border-solid border-transparent  font-[inherit] text-base font-semibold outline-none  transition-colors`}
                        >
                            <XMarkIcon className="h-6 w-6 text-slate-300" />
                        </Button>
                    </Dialog>
                </Modal>
            </ModalOverlay>
        </DialogTrigger>
    );
};

export default RickAndMortySelectedDialog;

'use client'
import React from 'react'
import {AnimatePresence, motion} from "framer-motion";

interface PropsSelectedList {
    selectedCategories: Array<string>,
    setSelectedCategories: (value: React.SetStateAction<string[]>) => void
}

export default function SelectedList({selectedCategories, setSelectedCategories}: PropsSelectedList) {
    return (
        <div className="flex flex-wrap">
            <AnimatePresence mode="sync">
                {
                    selectedCategories.map((item, index) => (
                        <motion.div key={item + "-selected"}
                                    initial={{opacity: 0, x: -20}}
                                    animate={{opacity: 1, x: 0}}
                                    exit={{opacity: 0, x: -20}}
                                    onClick={() => setSelectedCategories(selectedCategories.filter(i => i !== item))}
                                    className="bg-[#3064D0] flex gap-4 text-[0.6rem] text-white px-2 py-1 rounded-md mr-2 mt-2">
                            <p> {item.replace(/&amp;/g, '&')}</p>
                        </motion.div>
                    ))
                }
            </AnimatePresence>
        </div>
    )
}

import React from 'react'
import {motion} from 'framer-motion'

interface PropsCategoryItem {
    item: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    index: number;
}

const CategoryItem = ({item, checked, onChange, index}: PropsCategoryItem) => {
    return (
        <motion.li
            initial={{opacity: 0, x: -20}}
            animate={{opacity: 1, x: 0}}
            exit={{opacity: 0, x: -20}}
            whileHover={{x: 5}}
            transition={{duration: 0.1, delay: index * 0.05, type: 'spring', stiffness: 100}}
            className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox"
                   value={item}
                   checked={checked}
                   onChange={onChange}
                   className="w-4 h-4 shrink-0 appearance-none checked:bg-blue-400 border-white border-[3px] ring-[1px] ring-[#D4D3CF] focus:ring-ring-[#D4D3CF]"/>
            <span className="text-[0.8rem]">
                            {item}
                        </span>
        </motion.li>
    )
}

export default CategoryItem
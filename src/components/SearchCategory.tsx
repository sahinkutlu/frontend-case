'use client'

import React, {useEffect, useState} from "react";
import {reorderCategories, syncLocalStorage} from "@/util";
import AlertError from "@/components/AlertError";
import Image from "next/image";
import Loading from "@/components/Loading";
import CategoryItem from "@/components/CategoryItem";
import {AnimatePresence, motion} from "framer-motion";
import dynamic from "next/dynamic";

const SelectedList = dynamic(() => import('@/components/SelectedList'), {ssr: false});

export default function SearchCategory() {
    const getSelectedCategories = () => {
        if (typeof window === 'undefined') return [];
        return JSON.parse(localStorage && localStorage.getItem('selectedCategories') || '[]');
    }

    const [categories, setCategories] = useState<Array<string>>([]);
    const [selectedCategories, setSelectedCategories] = useState<Array<string>>(getSelectedCategories());
    const [loading, setLoading] = useState<boolean>(true);

    const [search, setSearch] = useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        syncLocalStorage(selectedCategories);
    }, [selectedCategories]);

    useEffect(() => {
        setCategories(reorderCategories(categories, selectedCategories));
    }, [selectedCategories]);

    const getCategories = () => {
        setLoading(true);
        fetch('./items.json')
            .then(res => res.json())
            .then(data => setCategories(reorderCategories(data.data, selectedCategories)))
            .catch(() => setError("Kategoriler yüklenirken bir hata oluştu"))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        getCategories();
    }, []);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (e.target.checked) {
            setSelectedCategories([...selectedCategories, e.target.value]);
        } else {
            setSelectedCategories(selectedCategories.filter(item => item !== e.target.value));
        }
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    return (
        <>
            <motion.div
                initial={{scale: 0.8, opacity: 0}}
                animate={{scale: 1, opacity: 1}}
                drag
                dragConstraints={{top: 0, left: 0, right: 0, bottom: 0}}
                dragElastic={0.5}
                transition={{duration: 0.2, type: 'spring', stiffness: 100}}
                className="w-full h-auto max-w-[20rem] p-4 bg-[#F8F8F8] border border-[#D4D3CF] rounded-sm flex flex-col gap-2">
                <h3 className="font-medium"> Kategoriler </h3>
                <div className="bg-white flex items-stretch border border-[#D4D3CF] rounded-md p-1">
                    <input className="w-full bg-transparent border-none outline-none px-2 text-[0.8rem]"
                           placeholder="Kategori Ara..."
                           value={search}
                           onChange={handleSearchChange}
                    />
                    <button className="shrink-0 rounded-sm px-2 py-1">
                        <Image src="/assets/search.svg" alt="Search Icon" width={14} height={14}/>
                    </button>
                </div>
                {loading ? <Loading/>
                    : error ? <AlertError error={error}/>
                        : <ul className="flex flex-col gap-2
                               max-h-[12rem] w-full px-1
                               overflow-x-clip
                               overflow-y-auto scrollbar scrollbar-track-[#E8E6E7] scrollbar-thumb-[#C5C3BE] scrollbar-w-[0.25rem]">

                            {categories.filter(item => item.toLowerCase().includes(search.toLowerCase())).length === 0 ?
                                <AlertError error="Malesef hiç kategori bulunamadı"/> :
                                <AnimatePresence initial={false}>
                                    {categories.filter((item) =>
                                        item.toLowerCase().includes(search.toLowerCase())).map((item: string, index: number) =>
                                        <CategoryItem item={item}
                                                      checked={selectedCategories.includes(item)}
                                                      onChange={handleCategoryChange} key={index} index={index}/>)}
                                </AnimatePresence>}

                        </ul>
                }
                <button className="w-full bg-[#3064D0] text-white py-2 rounded-md">Ara</button>
                <SelectedList selectedCategories={selectedCategories}
                              setSelectedCategories={setSelectedCategories}
                />
            </motion.div>
        </>
    )
}

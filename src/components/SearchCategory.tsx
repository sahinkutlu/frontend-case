'use client'

import React, {useEffect, useState} from "react";
import {reorderCategories, syncLocalStorage} from "@/util";
import AlertError from "@/components/AlertError";
import Image from "next/image";


export default function SearchCategory() {
    const getSelectedCategories = () => {
        if (typeof window === 'undefined') return [];
        return JSON.parse(localStorage && localStorage.getItem('selectedCategories') || '[]');
    }

    const [categories, setCategories] = useState<Array<string>>([]);
    const [selectedCategories, setSelectedCategories] = useState<Array<string>>(getSelectedCategories());

    const [search, setSearch] = useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        syncLocalStorage(selectedCategories);
    }, [selectedCategories]);

    useEffect(() => {
        setCategories(reorderCategories(categories, selectedCategories));
    }, [selectedCategories]);

    const getCategories = () => {
        fetch('./items.json')
            .then(res => res.json())
            .then(data => setCategories(reorderCategories(data.data, selectedCategories)))
            .catch(() => setError("Kategoriler yüklenirken bir hata oluştu"));
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
        <div
            className="w-full h-auto max-w-[20rem] p-4 h-12 bg-[#F8F8F8] border border-[#D4D3CF] rounded-sm flex flex-col gap-2">
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
            {error ? <AlertError error={error}/> : <ul className="flex flex-col gap-2
                               max-h-[12rem] w-full px-1
                               overflow-y-auto scrollbar scrollbar-track-[#E8E6E7] scrollbar-thumb-[#C5C3BE] scrollbar-w-[0.25rem]">
                {categories.filter(item => item.toLowerCase().includes(search.toLowerCase())).length === 0 ?
                    <AlertError error="Malesef hiç kategori bulunamadı"/> :
                    categories.filter(item => item.toLowerCase().includes(search.toLowerCase())).map((item: string, index: number) =>
                        <li key={item + index}
                            className="flex items-center gap-2">
                            <input type="checkbox"
                                   value={item}
                                   checked={selectedCategories.includes(item)}
                                   onChange={handleCategoryChange}
                                   className="w-4 h-4 appearance-none checked:bg-blue-400 border-white border-[3px] ring-[1px] ring-[#D4D3CF] focus:ring-ring-[#D4D3CF]"/>
                            <span className="text-[0.8rem]">
                            {item}
                        </span>
                        </li>)}
            </ul>}
            <button className="w-full bg-[#3064D0] text-white py-2 rounded-md">Ara</button>
        </div>
    )
}

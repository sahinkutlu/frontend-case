import React, { useCallback, useEffect, useId, useState } from 'react'
import { AnimatePresence, motion } from "framer-motion"
import useDebounce from '@/hooks/useDebounce';
import SearchIcon from '@/icons/SearchIcon';
import Checkbox from './Checkbox';
/* 
    2F64D0 
*/
const CustomSelect = () => {
    const [data,setData] = useState<string[]>([]);
    const [errorMessage,setErrorMesage] = useState('');
    const [query,setQuery] = useState('');
    const debouncedSearchQuery = useDebounce(query,900);
    const [selectedOptions,setSelectedOptions] = useState<string[]>([]);
    
    const toggleOption = useCallback((val:string)=>{
        setSelectedOptions(prev=>{
            if(prev.includes(val)){
                return [...prev.filter(v=>v!==val)].sort()
            }
            return [...prev,val].sort()
        })
    },[])

    useEffect(()=>{
        if(!selectedOptions.length) return
        localStorage.setItem('selectedOptions',JSON.stringify(selectedOptions))
    },[selectedOptions]);

    useEffect(()=>{
        const initialOptionsString = localStorage.getItem('selectedOptions')
        fetch('items.json')
        .then(res=>res.json())
        .then((res:{data:string[]})=>{
            setData(([...new Set(res.data)]))
        })
        try {
            setSelectedOptions(JSON.parse(initialOptionsString||'[]'))
        } catch (error) {
            setErrorMesage(JSON.stringify(error))
        }
    },[])

    
    const filterOptions = (data:string[],query:string)=>{
        const resultArray = data.filter(o=>!selectedOptions.includes(o)).sort();
        if(query.trim()){
            return resultArray.filter(q=>q.toLowerCase().includes(query.toLowerCase()))
        }
        return resultArray.filter(o=>!selectedOptions.includes(o))
    }

    const id = useId(); 

    return (
        <>
            {errorMessage&&<span className='p-4 border min-w-[20rem] max-w-[20rem] rounded-xl bg-red-400/90 text-white'>An error occured!</span>}
            <div className='p-6 border rounded-md flex flex-col gap-2 overflow-hidden min-w-[20rem] max-w-[20rem] bg-[#F8F8F8]'>
                <h1 className='font-semibold'>Categories</h1>
                <div className='w-full relative flex items-center border rounded mt-2 overflow-hidden bg-white px-2'>
                    <input 
                        id={id}
                        onChange={e=>setQuery(e.target.value)}
                        className='outline-none focus:outline-none py-2 w-full h-full'
                        placeholder='search category...' 
                        type='text'
                    />
                    <label htmlFor={id}>
                        <SearchIcon 
                            size={20}
                            className="fill-[#615F5E] ml-1"
                        />
                    </label>
                </div>
                <div className='overflow-y-auto min-h-[18rem] max-h-72 my-4'>
                    <AnimatePresence initial={false} mode='sync'>
                        {selectedOptions.map((opt)=>
                        <Checkbox 
                            key={opt} 
                            onToggle={()=>toggleOption(opt)} 
                            label={opt}
                            checked
                        />)}
                    </AnimatePresence>
                    <AnimatePresence>
                        {filterOptions(data,debouncedSearchQuery).map(opt=>
                            <Checkbox 
                                key={opt} 
                                label={opt} 
                                onToggle={()=>toggleOption(opt)} 
                            />
                        )}
                    </AnimatePresence>
                </div>
                <button className='py-2 px-12 bg-blue-600 text-white rounded-md'>Search</button>
            </div>
        </>
            
    )
}

export default CustomSelect
import React, { useEffect, useState } from 'react'
import { Subject, auditTime } from 'rxjs'

interface SearchProps {
    onSearch: (Value: string) => void
}

export default function Search(props: SearchProps) {
    const [onSearch] = useState(() => new Subject<string>())
    const [init, setInit] = useState<boolean>(false)
    const [searchText, setSearchText] = useState<string>("")

    useEffect(() => {
        const pipe = onSearch.pipe(
            auditTime(1000)
        ).subscribe((val: string) => {
            setSearchText((val || '').toLocaleLowerCase())
        })
        setInit(true)

        return () => {
            pipe?.unsubscribe()
        }
    }, [])

    useEffect(()=>{
        if(init){
            props.onSearch(searchText)
        }
    },[searchText])

    return (
        <div className='search'>
            <input className='search-input' placeholder='kategori ara ...' onChange={e => onSearch.next(e.target.value)} />
            <div className='search-icon'></div>
        </div>
    )
}

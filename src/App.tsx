import React, { useLayoutEffect, useState } from 'react'
import ExamCheckbox from './Checkbox'
import Search from './Search'

interface Data {
    checked: boolean
    label: string
}

interface Loader {
    loading: boolean
    loaded: boolean
    data: Data[]
    items: Data[]
    error?: any
}

export default function App() {
    const [loader, setLoader] = useState<Loader>({} as Loader)
    const [searchText, setSearchText] = useState<string>("")

    const proccess = (data: Data[], search: string) => {
        return data.filter(k => k.checked || k.label.toLocaleLowerCase().includes(search))
            .sort((x) => x.checked ? -1 : 1)
    }

    async function load() {
        try {
            setLoader({ loading: true, loaded: false, data: [], items: [], error: null })
            const response = await fetch('../assets/items.json', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
            )
            if (response.status === 200 || response.status === 201) {
                const stored = localStorage.getItem('remember')
                const remember = (stored ? JSON.parse(stored) : []) as string[]
                const data = await response.json()
                const list: Data[] = data.data.map((k) => ({ checked: remember.includes(k), label: k } as Data)).reduce((pv, cv) => {
                    if (!pv.find(l => l.label == cv.label)) {
                        pv.push(cv)
                    }

                    return pv
                }, [] as Data[])
                const items = proccess(list, "")
                setLoader({ loading: false, loaded: true, data: list, items: items, error: null })
            } else {
                throw new Error(response.statusText)
            }
        } catch (error) {
            setLoader({ loading: false, loaded: true, data: [], items: [], error: error })
        }
    }

    function search(value: string) {
        const items = proccess(loader.data || [], value)
        setSearchText(value)
        setLoader(({ ...loader, items: items }))
    }

    function check(value: Data) {
        const data = loader.data
        const index = data.findIndex(k => k.label === value.label)
        data[index] = { ...value, checked: !value.checked }
        const items = proccess(data, searchText)
        localStorage.setItem('remember', JSON.stringify(items.filter(k => k.checked).map(k => k.label)))
        setLoader(({ ...loader, data: data, items: items }))
    }

    useLayoutEffect(() => {
        load()
    }, [])

    return (
        <div className='panel'>
            <label className='label'>
                Kategoriler
            </label>

            <Search onSearch={value => search(value)} />

            <div className='select-list'>
                {loader.loading && "Yükleniyor ..."}
                {loader.error &&
                    <div style={{ display: 'flex', flexDirection: "column", alignItems: 'center' }}>
                        <div>{loader.error?.message || "Bİr hata oluştu. .."}</div>
                        <button className='btn btn-retry' onClick={() => load()}>
                            Tekrar
                        </button>
                    </div>
                }
                {loader.items?.map((item) => (
                    <ExamCheckbox key={item.label} checked={item.checked} onChange={() => check(item)} label={item.label} />
                ))}
            </div>

            <button className='btn btn-search'>
                Ara
            </button>
        </div>
    )
}

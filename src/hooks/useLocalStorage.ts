import { useState } from 'react'

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('Local Storage hatası:', error)
      return initialValue
    }
  })

  const setValue = (value: T) => {
    console.log(value)
    try {
      setStoredValue(value)
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Local Storage kaydetme hatası:', error)
    }
  }

  return [storedValue, setValue]
}

export default useLocalStorage

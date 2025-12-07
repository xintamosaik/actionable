// Localstore.ts
import { useEffect, useState } from 'react'

function useLocalStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(() => {
        const defaultValue = typeof initialValue === 'function'
            ? (initialValue as () => T)()
            : initialValue
        if (typeof window === 'undefined') return defaultValue
        try {
            const item = window.localStorage.getItem(key)
            return item ? (JSON.parse(item) as T) : defaultValue
        } catch {
            console.warn('Could not read from localStorage')
            return defaultValue
        }
    })

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value))
        } catch {
            console.warn('Could not write to localStorage')
        }
    }, [key, value])

    return [value, setValue] as const
}

export default useLocalStorage

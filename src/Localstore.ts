import React from "react";

const useLocalStorage = <T,>(
    key: string,
    initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] => {
    const [storedValue, setStoredValue] = React.useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });

    const setValue = (value: T | ((prev: T) => T)) => {
        try {
            setStoredValue((prev) => {
                const nextValue = value instanceof Function ? (value as (prev: T) => T)(prev) : (value as T);
                window.localStorage.setItem(key, JSON.stringify(nextValue));
                return nextValue;
            });
        } catch (error) {
            console.log(error);
        }
    };

    return [storedValue, setValue];
}

export default useLocalStorage;
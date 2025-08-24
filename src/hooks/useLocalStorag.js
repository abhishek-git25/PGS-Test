import { useEffect, useState } from "react";


const useLocalStorage = (key, initialValue) => {

    const [storedValue, setstoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }

    })

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue))
        } catch (error) {
            console.error("Error setting localStorage item:", error);
        }
    }, [key, storedValue])

    return [storedValue, setstoredValue];

}

export default useLocalStorage;
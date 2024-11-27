import { useState, useEffect } from "react";

/**
 * useStorage hook
 * @param {string} key - Key to store the value in session storage
 * @param {any} initialValue - Initial value to return if the key is not present in session storage
 * @returns {[any, (value: any) => void]} [value, setValue] - The current value and a function to update the value.
 */
const useStorage = (key, initialValue) => {
    const storedValue = sessionStorage.getItem(key) !== "" ? JSON.parse(sessionStorage.getItem(key)) : initialValue;
    // console.log("useStorage => storedValue", storedValue);
    const [value, setValue] = useState(storedValue);

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return { value, setValue };
};

export default useStorage;

/*
import { useState, useEffect } from 'react';

function useSessionStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const storedValue = sessionStorage.getItem(key);   

    return storedValue ? JSON.parse(storedValue) : initialValue;   

  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useSessionStorage; */

import { useState, useEffect } from "react";

/**
 * useStorage hook
 * @param {string} key - Key to store the value in session storage
 * @param {any} initialValue - Initial value to return if the key is not present in session storage
 * @returns {[any, (value: any) => void]} [value, setValue] - The current value and a function to update the value.
 */
const useStorage = (key, initialValue) => {
    const storedValue = localStorage.getItem(key) !== "" ? JSON.parse(localStorage.getItem(key)) : initialValue;
    // console.log("useStorage => storedValue", storedValue);
    const [value, setValue] = useState(storedValue);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return { value, setValue };
};

export default useStorage;

/*
import { useState, useEffect } from 'react';

function uselocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);   

    return storedValue ? JSON.parse(storedValue) : initialValue;   

  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default uselocalStorage; */

import { useState, useEffect } from "react";

type UseLocalStorageStateProps = {
  initialState: any;
  key: string;
};

export function useLocalStorageState({
  initialState,
  key,
}: UseLocalStorageStateProps) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}

import { useEffect, RefObject } from "react";

interface DetectOutsideProps<T extends HTMLElement> {
  ref: RefObject<T>;
  callback: () => void;
}

export function useDetectOutside<T extends HTMLElement>({
  ref,
  callback,
}: DetectOutsideProps<T>) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        callback();
      }
    }
    document.addEventListener("keydown", handleEscKey);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [ref, callback]);
}

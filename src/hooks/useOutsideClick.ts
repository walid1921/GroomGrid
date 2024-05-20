import { useEffect, useRef, RefObject } from "react";

type EventHandler = (event: MouseEvent) => void;

export function useOutsideClick(
  handler: EventHandler,
  listenCapturing: boolean = true
): RefObject<HTMLUListElement> {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler(e);
      }
    }

    document.addEventListener("click", handleClick, listenCapturing);

    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  return ref;
}

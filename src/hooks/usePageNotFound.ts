import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function usePageNotFound(): string {
  const { pathname, search } = useLocation();
  const url = `${pathname}${search}`;

  useEffect(() => {
    console.warn(`[404] Ruta no encontrada: ${url}`);
  }, [url]);

  return url;
}
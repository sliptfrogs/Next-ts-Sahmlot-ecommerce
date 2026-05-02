import { useEffect, useState, useCallback } from "react";
import { getAllProducts, Product } from "@/data/products";

const EVENT = "sahmlot:products-updated";

export const emitProductsUpdated = () => {
  window.dispatchEvent(new CustomEvent(EVENT));
};

export const useProducts = (): Product[] => {
  const [list, setList] = useState<Product[]>(() => getAllProducts());

  const refresh = useCallback(() => setList(getAllProducts()), []);

  useEffect(() => {
    window.addEventListener(EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [refresh]);

  return list;
};

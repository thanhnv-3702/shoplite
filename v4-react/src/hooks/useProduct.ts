import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../api/products";
import { productsQueryKey } from "./useProducts";

export function useProduct(id: number | null) {
  return useQuery({
    queryKey: [...productsQueryKey, id] as const,
    queryFn: () => fetchProductById(id as number),
    enabled: id != null && Number.isFinite(id) && id > 0,
  });
}

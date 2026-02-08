import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { Product, ProductParams } from '@/types';
import { getProducts } from '@/lib/productApi';
export const useProducts = (params: ProductParams = {}): UseQueryResult<Product[], Error> => {
  return useQuery<Product[], Error>({
    queryKey: ['products', params],
    queryFn: () => getProducts(params),
  });
};
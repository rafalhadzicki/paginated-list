import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import apiClient from '../helpers/apiClient';
import { ApiPaths } from '../models/apiPaths';
import {
  GetProductResponse,
  GetProductsResponse,
  Product,
} from '../models/products';
import { QueryKeys } from '../models/queryKeys';

export const useGetProducts = (page: number, perPage: number) => {
  const {
    data: getProductsResponse,
    isFetching: isProductsFetching,
    isError: isProductsError,
    refetch: refetchProducts,
  } = useQuery<GetProductsResponse, AxiosError>({
    queryKey: [QueryKeys.Products, page],
    queryFn: async () => {
      const data = await apiClient.get<GetProductsResponse>(ApiPaths.Products, {
        page,
        per_page: perPage,
      });
      return data;
    },
    placeholderData: keepPreviousData,
  });
  return {
    getProductsResponse,
    isProductsFetching,
    isProductsError,
    refetchProducts,
  };
};

export const useGetProductById = (id?: number) => {
  const {
    data: productById,
    isFetching: isProductFetching,
    isError: isProductError,
    refetch: refetchProduct,
  } = useQuery<Product | undefined, AxiosError>({
    queryKey: [QueryKeys.Product, id],
    queryFn: async () => {
      const response = await apiClient.get<GetProductResponse>(
        `${ApiPaths.Products}/${id}`
      );
      return response.data;
    },
    enabled: !!id,
    placeholderData: keepPreviousData,
  });
  return { productById, isProductFetching, isProductError, refetchProduct };
};

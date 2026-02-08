import { buildQueryParams } from '@/lib/queryParams';
import { productSchema, productsResponseSchema, productFavoriteResponseSchema } from '@/schemas';

import type { Product, ProductParams, User } from '@/types';

import { api, BASE_URL } from './apiClient';
const normalizeImageUrl = (url: string) => {
  if (!url) return url;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
};

const normalizeProduct = (product: Product & { user?: User }) => {
  const owner = product.owner || product.user;
  const ownerNickname = product.ownerNickname || owner?.nickname;
  const isFavorite = product.isFavorite ?? product.isLiked ?? false;
  const images = Array.isArray(product.images)
    ? product.images.map(normalizeImageUrl)
    : [];

  return {
    ...product,
    owner,
    ownerNickname,
    isFavorite,
    images,
  };
};

/**
 * 상품 목록 조회
 */
export const getProducts = async (params: ProductParams = {}): Promise<Product[]> => {
  const query = buildQueryParams({
    page: params.page,
    pageSize: params.pageSize,
    orderBy: params.orderBy,
    keyword: params.keyword,
  });

  const response = await api.get(`/products${query ? `?${query}` : ''}`);
  const validated = productsResponseSchema.parse(response);
  const list = validated.list || validated.products || [];
  return list.map(normalizeProduct);
};

/** 
 * 베스트 상품 조회 (좋아요 많은 순)
 */
export const getBestProducts = async (): Promise<Product[]> => {
  const response = await api.get('/products?orderBy=favorite&pageSize=4');
  const validated = productsResponseSchema.parse(response);
  const list = validated.list || validated.products || [];
  return list.map(normalizeProduct);
};

/**
 * 상품 단건 조회
 */
export const getProduct = async (productId: string | number): Promise<Product> => {
  const response = await api.get(`/products/${productId}`);
  return normalizeProduct(productSchema.parse(response));
};

/**
 * 상품 등록
 */
export const createProduct = async (productData: {
  name: string;
  description: string;
  price: number;
  tags?: string[];
  images?: string[];
}): Promise<Product> => {
  const response = await api.post('/products', productData, { auth: true });
  return normalizeProduct(productSchema.parse(response));
};

/**
 * 상품 수정
 */
export const updateProduct = async (
  productId: string | number,
  productData: {
    name?: string;
    description?: string;
    price?: number;
    tags?: string[];
    images?: string[];
  },
): Promise<Product> => {
  const response = await api.patch(`/products/${productId}`, productData, { auth: true });
  return normalizeProduct(productSchema.parse(response));
};

/**
 * 상품 삭제
 */
export const deleteProduct = async (productId: string | number): Promise<void> => {
  await api.delete(`/products/${productId}`, { auth: true });
};

/**
 * 상품 좋아요 토글
 */
export const toggleProductFavorite = async (
  productId: string | number,
): Promise<{ isFavorite: boolean; favoriteCount: number }> => {
  const response = await api.post(`/products/${productId}/favorite`, {}, { auth: true });
  const parsed = productFavoriteResponseSchema.parse(response);
  return {
    isFavorite: parsed.isLiked ?? false,
    favoriteCount: parsed.favoriteCount,
  };
};
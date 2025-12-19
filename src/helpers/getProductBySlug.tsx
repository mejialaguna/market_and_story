import type { Product } from '@/lib/content-types';
import { seedData } from '@/seed/seed';

type GetProductBySlugResponse = Product | undefined;

export const getProductBySlug = (slug: string):GetProductBySlugResponse => {
  return seedData.find((product) => product.slug === slug);
};

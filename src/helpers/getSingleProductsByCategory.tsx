import type { Product } from '@/seed/seed';

export const getSingleProductsByCategory = (data:Product[], count:number):Product[] => {
  const productsByCategory = data.reduce<Record<string, Product[]>>(
    (acc, product) => {
      acc[product.category] ??= [];
      acc[product.category].push(product);
      return acc;
    },
    {}
  );

  // Pick one random product per category
  const onePerCategory = Object.values(productsByCategory).map(
    (categoryProducts) =>
      categoryProducts[
        Math.floor(Math.random() * categoryProducts.length)
      ]
  );

  // Shuffle categories and take only an specific amount
  return onePerCategory
    .sort(() => Math.random() - 0.9)
    .slice(0, count);
  };

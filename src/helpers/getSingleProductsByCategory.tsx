import { seedData, type Product, type ProductCategory } from '@/seed/seed';

export interface GetRecommendationsResponse {
  message?: string;
  ok: boolean;
  products: Product[];
}

export const getSingleProductsByCategory = (
  data: Product[],
  count: number
): Product[] => {
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
      categoryProducts[Math.floor(Math.random() * categoryProducts.length)]
  );

  // Shuffle categories and take only an specific amount
  return onePerCategory.sort(() => Math.random() - 0.9).slice(0, count);
};

export const getRecommendations = async (
  category: ProductCategory,
  targetCount: number
): Promise<GetRecommendationsResponse> => {
  try {
    const products = seedData
      .filter((products) => products.category === category)
      .sort(() => Math.random() - 0.5)
      .slice(0, targetCount);

    if (!products.length) {
      return {
        message: `Oops, we could not find any products for category ${category}`,
        ok: false,
        products: [],
      };
    }

    return {
      ok: true,
      products,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return {
      message: `something went wrong getting all products from this category ${category}`,
      ok: false,
      products: [],
    };
  }
};

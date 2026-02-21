import 'server-only';

import { prisma } from '@/lib/db';
import type { Product, ProductCategory, ProductDimensions, ProductMeta, ProducReviews } from '@/lib/content-types';

type DbProduct = Awaited<ReturnType<typeof prisma.product.findFirst>> & {
  reviews?: Awaited<ReturnType<typeof prisma.review.findMany>>;
};

function toProduct(dbProduct: NonNullable<DbProduct>): Product {
  const dimensions: ProductDimensions = {
    width: dbProduct.dimensionWidth,
    height: dbProduct.dimensionHeight,
    depth: dbProduct.dimensionDepth,
  };

  const meta: ProductMeta = {
    createdAt: dbProduct.metaCreatedAt,
    updatedAt: dbProduct.metaUpdatedAt,
    barcode: dbProduct.metaBarcode,
    qrCode: dbProduct.metaQrCode,
  };

  const reviews: ProducReviews[] = (dbProduct.reviews ?? []).map((r) => ({
    id: r.id,
    productId: r.productId,
    productSlug: r.productSlug,
    userName: r.userName,
    rating: r.rating,
    date: r.date,
    comment: r.comment,
    verified: r.verified,
  }));

  return {
    id: dbProduct.id,
    title: dbProduct.title,
    slug: dbProduct.slug,
    description: dbProduct.description,
    category: dbProduct.category as ProductCategory,
    price: dbProduct.price,
    discountPercentage: dbProduct.discountPercentage,
    rating: dbProduct.rating,
    stock: dbProduct.stock,
    tags: dbProduct.tags,
    brand: dbProduct.brand,
    sku: dbProduct.sku,
    weight: dbProduct.weight,
    dimensions,
    warrantyInformation: dbProduct.warrantyInformation,
    shippingInformation: dbProduct.shippingInformation,
    availabilityStatus: dbProduct.availabilityStatus as Product['availabilityStatus'],
    reviews,
    returnPolicy: dbProduct.returnPolicy,
    minimumOrderQuantity: dbProduct.minimumOrderQuantity,
    meta,
    images: dbProduct.images,
    thumbnail: dbProduct.thumbnail,
    badge: dbProduct.badge,
    features: dbProduct.features,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    include: { reviews: true },
    orderBy: { id: 'asc' },
  });
  return products.map(toProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { reviews: true },
  });
  return product ? toProduct(product) : undefined;
}

export async function getProductById(id: number): Promise<Product | undefined> {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { reviews: true },
  });
  return product ? toProduct(product) : undefined;
}

export async function getProductsByCategory(
  category: ProductCategory,
  limit?: number
): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { category },
    include: { reviews: true },
    orderBy: { id: 'asc' },
    ...(limit ? { take: limit } : {}),
  });
  return products.map(toProduct);
}

export async function getRecommendations(
  category: ProductCategory,
  targetCount: number,
  excludeSlug?: string
): Promise<{ ok: boolean; message?: string; products: Product[] }> {
  try {
    // Try vector-based similarity first
    if (excludeSlug) {
      try {
        const vectorProducts = await prisma.$queryRawUnsafe<Array<{
          id: number;
          slug: string;
        }>>(
          `SELECT p2.id, p2.slug
           FROM "Product" p1, "Product" p2
           WHERE p1.slug = $1
             AND p2.slug != $1
             AND p1.embedding IS NOT NULL
             AND p2.embedding IS NOT NULL
           ORDER BY p1.embedding <=> p2.embedding
           LIMIT $2`,
          excludeSlug,
          targetCount
        );

        if (vectorProducts.length > 0) {
          const slugs = vectorProducts.map((p) => p.slug);
          const products = await prisma.product.findMany({
            where: { slug: { in: slugs } },
            include: { reviews: true },
          });
          if (products.length > 0) {
            return { ok: true, products: products.map(toProduct) };
          }
        }
      } catch {
        // Vector search not available, fall through to category-based
      }
    }

    // Fallback: category-based recommendations
    const products = await prisma.product.findMany({
      where: {
        category,
        ...(excludeSlug ? { slug: { not: excludeSlug } } : {}),
      },
      include: { reviews: true },
      orderBy: { rating: 'desc' },
      take: targetCount,
    });

    if (!products.length) {
      return {
        message: `No products found for category ${category}`,
        ok: false,
        products: [],
      };
    }

    return { ok: true, products: products.map(toProduct) };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return {
      message: `Error fetching recommendations for ${category}`,
      ok: false,
      products: [],
    };
  }
}

export async function getFeaturedProducts(count: number): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { features: { isEmpty: false } },
    include: { reviews: true },
    orderBy: { rating: 'desc' },
    take: count,
  });
  return products.map(toProduct);
}

export async function getSingleProductsByCategory(count: number): Promise<Product[]> {
  const categories: ProductCategory[] = [
    'Home & Living',
    'Fashion',
    'Technology',
    'Wellness',
    'Accessories',
  ];

  const results: Product[] = [];

  for (const category of categories) {
    if (results.length >= count) {break;}
    const product = await prisma.product.findFirst({
      where: { category },
      include: { reviews: true },
      orderBy: { rating: 'desc' },
    });
    if (product) {
      results.push(toProduct(product));
    }
  }

  return results.slice(0, count);
}

export async function getProductsBySlugs(slugs: string[]): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { slug: { in: slugs } },
    include: { reviews: true },
  });
  return products.map(toProduct);
}

import { prisma } from '@/lib/db';

export async function getRelatedArticlesForProduct(
  productSlug: string,
  limit: number = 3,
): Promise<Array<{
  id: string;
  title: string;
  excerpt: string;
  category: string;
  heroImage: string;
  author: string;
  readTime: string;
}>> {
  try {
    const articles = await prisma.$queryRawUnsafe<Array<{
      id: string;
      title: string;
      excerpt: string;
      category: string;
      heroImage: string;
      author: string;
      readTime: string;
    }>>(
      `SELECT a.id, a.title, a.excerpt, a.category, a."heroImage", a.author, a."readTime"
       FROM "Product" p, "Article" a
       WHERE p.slug = $1
         AND p.embedding IS NOT NULL
         AND a.embedding IS NOT NULL
       ORDER BY p.embedding <=> a.embedding
       LIMIT $2`,
      productSlug,
      limit,
    );

    return articles;
  } catch {
    return [];
  }
}

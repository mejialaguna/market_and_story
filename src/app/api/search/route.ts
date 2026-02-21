import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { prisma } from '@/lib/db';
import { generateEmbedding } from '@/lib/ai/embeddings';

export async function GET(request: NextRequest): Promise<Response> {
  const query = request.nextUrl.searchParams.get('q');

  if (!query || query.trim().length === 0) {
    return NextResponse.json({ products: [], articles: [] });
  }

  try {
    const embedding = await generateEmbedding(query);
    const vectorStr = `[${embedding.join(',')}]`;

    // Semantic search for products
    const products = await prisma.$queryRawUnsafe<Array<{
      id: number;
      title: string;
      slug: string;
      description: string;
      category: string;
      price: number;
      rating: number;
      thumbnail: string;
      badge: string | null;
      similarity: number;
    }>>(
      `SELECT
        id, title, slug, description, category, price, rating, thumbnail, badge,
        1 - (embedding <=> $1::vector) as similarity
      FROM "Product"
      WHERE embedding IS NOT NULL
      ORDER BY embedding <=> $1::vector
      LIMIT 12`,
      vectorStr
    );

    // Semantic search for articles
    const articles = await prisma.$queryRawUnsafe<Array<{
      id: string;
      title: string;
      excerpt: string;
      category: string;
      heroImage: string;
      author: string;
      readTime: string;
      publishedAt: string;
      similarity: number;
    }>>(
      `SELECT
        id, title, excerpt, category, "heroImage", author, "readTime", "publishedAt",
        1 - (embedding <=> $1::vector) as similarity
      FROM "Article"
      WHERE embedding IS NOT NULL
      ORDER BY embedding <=> $1::vector
      LIMIT 6`,
      vectorStr
    );

    return NextResponse.json({
      products: products.map((p) => ({ ...p, similarity: Number(p.similarity) })),
      articles: articles.map((a) => ({ ...a, similarity: Number(a.similarity) })),
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Search error:', error);

    // Fallback to text search if embeddings aren't available
    const products = await prisma.product.findMany({
      where: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { tags: { hasSome: query.toLowerCase().split(' ') } },
        ],
      },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        category: true,
        price: true,
        rating: true,
        thumbnail: true,
        badge: true,
      },
      take: 12,
    });

    const articles = await prisma.article.findMany({
      where: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { excerpt: { contains: query, mode: 'insensitive' } },
          { tags: { hasSome: query.toLowerCase().split(' ') } },
        ],
      },
      select: {
        id: true,
        title: true,
        excerpt: true,
        category: true,
        heroImage: true,
        author: true,
        readTime: true,
        publishedAt: true,
      },
      take: 6,
    });

    return NextResponse.json({ products, articles });
  }
}

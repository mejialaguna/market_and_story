import 'server-only';

import { prisma } from '@/lib/db';
import type { Article, ArticleSection , Product } from '@/lib/content-types';

import { getProductsBySlugs } from './products';

type DbArticle = NonNullable<Awaited<ReturnType<typeof prisma.article.findFirst>>>;

function toArticle(dbArticle: DbArticle): Article {
  return {
    id: dbArticle.id,
    title: dbArticle.title,
    subtitle: dbArticle.subtitle,
    excerpt: dbArticle.excerpt,
    author: dbArticle.author,
    authorBio: dbArticle.authorBio,
    authorImage: dbArticle.authorImage,
    publishedAt: dbArticle.publishedAt,
    readTime: dbArticle.readTime,
    category: dbArticle.category,
    heroImage: dbArticle.heroImage,
    tags: dbArticle.tags,
    featured: dbArticle.featured,
    contentSections: dbArticle.contentSections as unknown as ArticleSection[],
    relatedProductSlugs: dbArticle.relatedProductSlugs,
  };
}

export async function getAllArticles(): Promise<Article[]> {
  const articles = await prisma.article.findMany({
    orderBy: { id: 'asc' },
  });
  return articles.map(toArticle);
}

export async function getArticleById(id: string): Promise<Article | undefined> {
  const article = await prisma.article.findUnique({
    where: { id },
  });
  return article ? toArticle(article) : undefined;
}

export async function getRelatedProducts(articleId: string): Promise<Product[]> {
  const article = await prisma.article.findUnique({
    where: { id: articleId },
    select: { relatedProductSlugs: true },
  });

  if (!article || article.relatedProductSlugs.length === 0) {
    return [];
  }

  return getProductsBySlugs(article.relatedProductSlugs);
}

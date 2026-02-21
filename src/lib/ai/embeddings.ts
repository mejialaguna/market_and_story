import OpenAI from 'openai';

const openai = new OpenAI();

export async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  });

  return response.data[0].embedding;
}

export function buildProductEmbeddingText(product: {
  title: string;
  description: string;
  category: string;
  tags: string[];
  brand: string;
  features?: string[];
}): string {
  const parts = [
    product.title,
    product.description,
    `Category: ${product.category}`,
    `Brand: ${product.brand}`,
    product.tags.length > 0 ? `Tags: ${product.tags.join(', ')}` : '',
    product.features?.length ? `Features: ${product.features.join(', ')}` : '',
  ];

  return parts.filter(Boolean).join('. ');
}

export function buildArticleEmbeddingText(article: {
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  subtitle: string;
}): string {
  const parts = [
    article.title,
    article.subtitle,
    article.excerpt,
    `Category: ${article.category}`,
    article.tags.length > 0 ? `Tags: ${article.tags.join(', ')}` : '',
  ];

  return parts.filter(Boolean).join('. ');
}

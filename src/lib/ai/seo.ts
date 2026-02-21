import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function generateProductSEO(product: {
  title: string;
  description: string;
  category: string;
  brand: string;
  features: string[];
}): Promise<{
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}> {
  const { text } = await generateText({
    model: openai('gpt-4o-mini'),
    prompt: `Generate SEO metadata for this product. Return ONLY valid JSON with no markdown formatting.

Product: ${product.title}
Brand: ${product.brand}
Category: ${product.category}
Description: ${product.description}
Features: ${product.features.join(', ')}

Return JSON: {"metaTitle": "string (max 60 chars)", "metaDescription": "string (max 160 chars)", "keywords": ["array", "of", "keywords"]}`,
  });

  return JSON.parse(text);
}

export async function generateArticleSEO(article: {
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
}): Promise<{
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}> {
  const { text } = await generateText({
    model: openai('gpt-4o-mini'),
    prompt: `Generate SEO metadata for this article. Return ONLY valid JSON with no markdown formatting.

Title: ${article.title}
Category: ${article.category}
Excerpt: ${article.excerpt}
Tags: ${article.tags.join(', ')}

Return JSON: {"metaTitle": "string (max 60 chars)", "metaDescription": "string (max 160 chars)", "keywords": ["array", "of", "keywords"]}`,
  });

  return JSON.parse(text);
}

export async function generateArticleSummary(article: {
  title: string;
  excerpt: string;
  contentSections: Array<{ type: string; content?: string }>;
}): Promise<string> {
  const contentText = article.contentSections
    .filter((s) => s.type === 'text' && s.content)
    .map((s) => s.content)
    .join('\n\n')
    .slice(0, 3000);

  const { text } = await generateText({
    model: openai('gpt-4o-mini'),
    prompt: `Write a concise 2-3 sentence TL;DR summary of this article. Be informative and engaging.

    Title: ${article.title}
    Excerpt: ${article.excerpt}
    Content: ${contentText}`,
  });

  return text;
}

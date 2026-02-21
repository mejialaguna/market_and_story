/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { PrismaClient } from '@prisma/client';

import { generateEmbedding, buildProductEmbeddingText, buildArticleEmbeddingText } from '../src/lib/ai/embeddings';

const prisma = new PrismaClient();

async function main() {
  console.log('Generating embeddings...');

  // Generate product embeddings
  const products = await prisma.product.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      tags: true,
      brand: true,
      features: true,
    },
  });

  console.log(`Generating embeddings for ${products.length} products...`);
  let count = 0;
  for (const product of products) {
    const text = buildProductEmbeddingText(product);
    const embedding = await generateEmbedding(text);

    await prisma.$executeRawUnsafe(
      'UPDATE "Product" SET "embedding" = $1::vector WHERE "id" = $2',
      `[${embedding.join(',')}]`,
      product.id
    );

    count++;
    if (count % 20 === 0) {
      console.log(`  Products: ${count}/${products.length}`);
    }

    // Rate limit: ~3000 RPM for text-embedding-3-small
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  console.log(`Generated embeddings for ${count} products.`);

  // Generate article embeddings
  const articles = await prisma.article.findMany({
    select: {
      id: true,
      title: true,
      excerpt: true,
      category: true,
      tags: true,
      subtitle: true,
    },
  });

  console.log(`Generating embeddings for ${articles.length} articles...`);
  count = 0;
  for (const article of articles) {
    const text = buildArticleEmbeddingText(article);
    const embedding = await generateEmbedding(text);

    await prisma.$executeRawUnsafe(
      'UPDATE "Article" SET "embedding" = $1::vector WHERE "id" = $2',
      `[${embedding.join(',')}]`,
      article.id
    );

    count++;
    if (count % 10 === 0) {
      console.log(`  Articles: ${count}/${articles.length}`);
    }

    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  console.log(`Generated embeddings for ${count} articles.`);

  console.log('All embeddings generated!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

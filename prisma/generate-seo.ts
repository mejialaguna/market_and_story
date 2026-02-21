import { prisma } from '../src/lib/db';
import { generateProductSEO, generateArticleSEO, generateArticleSummary } from '../src/lib/ai/seo';

async function generateSEO() {
  console.log('Generating SEO metadata...\n');

  // Generate product SEO
  const products = await prisma.product.findMany({
    where: { metaTitle: null },
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      brand: true,
      features: true,
    },
  });

  console.log(`Found ${products.length} products without SEO metadata`);

  for (const product of products) {
    try {
      const seo = await generateProductSEO(product);
      await prisma.product.update({
        where: { id: product.id },
        data: {
          metaTitle: seo.metaTitle,
          metaDescription: seo.metaDescription,
          keywords: seo.keywords,
        },
      });
      console.log(`  ✓ ${product.title}`);
    } catch (error) {
      console.error(`  ✗ ${product.title}:`, error);
    }
  }

  // Generate article SEO + summaries
  const articles = await prisma.article.findMany({
    where: { metaTitle: null },
    select: {
      id: true,
      title: true,
      excerpt: true,
      category: true,
      tags: true,
      contentSections: true,
    },
  });

  console.log(`\nFound ${articles.length} articles without SEO metadata`);

  for (const article of articles) {
    try {
      const [seo, summary] = await Promise.all([
        generateArticleSEO(article),
        generateArticleSummary({
          title: article.title,
          excerpt: article.excerpt,
          contentSections: article.contentSections as Array<{ type: string; content?: string }>,
        }),
      ]);

      await prisma.article.update({
        where: { id: article.id },
        data: {
          metaTitle: seo.metaTitle,
          metaDescription: seo.metaDescription,
          keywords: seo.keywords,
          summary,
        },
      });
      console.log(`  ✓ ${article.title}`);
    } catch (error) {
      console.error(`  ✗ ${article.title}:`, error);
    }
  }

  console.log('\nDone!');
  await prisma.$disconnect();
}

generateSEO();

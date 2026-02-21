/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { PrismaClient } from '@prisma/client';

import { seedData } from '../src/seed/seed';
import { ARTICLES } from '../src/seed/articles.data';
import { LIVE_CONTENT } from '../src/seed/live.data.content';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing data
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "WishlistItem", "ReadingListItem", "ArticleProduct", "Review", "LiveContent", "Article", "Product" CASCADE');

  // Sort products by ID to avoid autoincrement conflicts
  const sortedProducts = [...seedData].sort((a, b) => a.id - b.id);

  // Seed products using raw INSERT to bypass autoincrement issues
  console.log(`Seeding ${sortedProducts.length} products...`);
  for (const product of sortedProducts) {
    const thumbnail = Array.isArray(product.thumbnail)
      ? product.thumbnail[0]
      : product.thumbnail;

    // Use raw SQL to insert with explicit ID (bypasses sequence)
    await prisma.$executeRawUnsafe(
      `INSERT INTO "Product" (
        "id", "title", "slug", "description", "category", "price",
        "discountPercentage", "rating", "stock", "tags", "brand", "sku",
        "weight", "dimensionWidth", "dimensionHeight", "dimensionDepth",
        "warrantyInformation", "shippingInformation", "availabilityStatus",
        "returnPolicy", "minimumOrderQuantity", "metaCreatedAt", "metaUpdatedAt",
        "metaBarcode", "metaQrCode", "images", "thumbnail", "badge", "features",
        "keywords", "createdAt", "updatedAt"
      ) VALUES (
        $1, $2, $3, $4, $5, $6,
        $7, $8, $9, $10, $11, $12,
        $13, $14, $15, $16,
        $17, $18, $19,
        $20, $21, $22, $23,
        $24, $25, $26, $27, $28, $29,
        $30, NOW(), NOW()
      )`,
      product.id, product.title, product.slug, product.description, product.category, product.price,
      product.discountPercentage, product.rating, product.stock, product.tags, product.brand, product.sku,
      product.weight, product.dimensions.width, product.dimensions.height, product.dimensions.depth,
      product.warrantyInformation, product.shippingInformation, product.availabilityStatus,
      product.returnPolicy, product.minimumOrderQuantity, product.meta.createdAt, product.meta.updatedAt,
      product.meta.barcode, product.meta.qrCode, product.images, thumbnail, product.badge ?? null, product.features ?? [],
      [] as string[]
    );

    // Seed reviews for this product (let Prisma generate IDs to avoid duplicates)
    for (const review of product.reviews) {
      await prisma.review.create({
        data: {
          productId: product.id,
          productSlug: review.productSlug,
          userName: review.userName,
          rating: review.rating,
          date: review.date,
          comment: review.comment,
          verified: review.verified,
        },
      });
    }
  }

  // Reset product sequence to max id + 1
  const maxProductId = Math.max(...seedData.map((p) => p.id));
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE "Product_id_seq" RESTART WITH ${maxProductId + 1}`);
  console.log('Products seeded.');

  // Seed articles
  console.log(`Seeding ${ARTICLES.length} articles...`);
  for (const article of ARTICLES) {
    await prisma.article.create({
      data: {
        id: article.id,
        title: article.title,
        subtitle: article.subtitle,
        excerpt: article.excerpt,
        author: article.author,
        authorBio: article.authorBio,
        authorImage: article.authorImage,
        publishedAt: article.publishedAt,
        readTime: article.readTime,
        category: article.category,
        heroImage: article.heroImage,
        tags: article.tags,
        featured: article.featured,
        contentSections: article.contentSections as unknown as object[],
        relatedProductSlugs: article.relatedProductSlugs,
      },
    });
  }
  console.log('Articles seeded.');

  // Create ArticleProduct join records
  console.log('Creating article-product relationships...');
  for (const article of ARTICLES) {
    for (const slug of article.relatedProductSlugs) {
      const product = seedData.find((p) => p.slug === slug);
      if (product) {
        await prisma.articleProduct.create({
          data: {
            articleId: article.id,
            productId: product.id,
          },
        }).catch(() => {
          // Skip duplicates silently
        });
      }
    }
  }
  console.log('Article-product relationships created.');

  // Seed live content using raw INSERT
  console.log(`Seeding ${LIVE_CONTENT.length} live content items...`);
  for (const content of LIVE_CONTENT) {
    await prisma.$executeRawUnsafe(
      `INSERT INTO "LiveContent" (
        "id", "type", "videoUrl", "title", "author", "authorAvatar",
        "likes", "comments", "tags", "productLink", "description", "createdAt"
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW())`,
      content.id, content.type, content.videoUrl, content.title, content.author, content.authorAvatar,
      content.likes, content.comments, content.tags, content.productLink, content.description
    );
  }
  const maxLiveId = Math.max(...LIVE_CONTENT.map((c) => c.id));
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE "LiveContent_id_seq" RESTART WITH ${maxLiveId + 1}`);
  console.log('Live content seeded.');

  console.log('Database seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

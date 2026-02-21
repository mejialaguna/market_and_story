/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { streamText, tool, stepCountIs, convertToModelMessages } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

import { prisma } from '@/lib/db';
import { generateEmbedding } from '@/lib/ai/embeddings';

export async function POST(request: Request) {
  const { messages, currentUrl, cartItems } = await request.json();
  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: `You are a helpful assistant for market&story, a curated retail and media platform that has both a product shop and editorial articles/stories.
You help customers find products, read articles, answer questions, and provide personalized recommendations.
You can also add products to the user's shopping cart or wishlist, and save articles to the reading list when they ask.
Be friendly, concise, and knowledgeable about what's available.

IMPORTANT: Distinguish between products (things to buy) and articles/stories (editorial content to read).
- When the user asks about "articles", "stories", "blog posts", or "reads" — use the searchArticles tool, NOT searchProducts.
- When the user asks about products to buy, shop, or purchase — use searchProducts.
- If ambiguous, ask for clarification.

When recommending products, include specific details like price, rating, and key features.
Format product names as links using markdown: [Product Name](/product/product-slug).
Format article titles as links using markdown: [Article Title](/articles/article-id).
If you don't know something, say so honestly rather than making things up.

ARTICLE RELEVANCE: After receiving article search results, check if they are actually relevant to what the user asked by looking at the title, excerpt, and tags. If none of the returned articles are a good match for the user's query, do NOT show irrelevant results. Instead, let the user know we don't have articles on that specific topic and suggest they search the web (e.g. "I don't have any articles about [topic] in our collection, but you might find great reads by searching for '[topic] articles' on Google or Medium.").

The user is currently viewing: ${currentUrl ?? '/'}
If the user is on a product page (URL like /product/<slug>), you already know which product they are looking at. When they say "add this to my cart" or "add this to my wishlist" or similar, extract the slug from the URL and use the addToCart or addToWishlist tool directly — no need to ask which product.
If the user is on an article page (URL like /articles/<id>), you already know which article they are reading. When they say "save this article", "add to reading list", "bookmark this" or similar, extract the id from the URL and use the addToReadingList tool directly.

CART SUMMARY: The user's current cart has ${cartItems?.length ?? 0} item(s).
When the user asks "what's in my cart?", "show my cart", or similar — ALWAYS use the getCartItems tool so the products display as cards with images. For quick questions like "how much is my total?" you can answer from the data the tool returns.

PAGE NAVIGATION: When the user asks where to find something or wants to go to a page, provide the correct link. Here is the site map:
- Home: /
- Shop (all products): /products
- Stories (articles): /articles
- Product Reels: /product-reels
- Store Locations: /locations
- Search: /search
- Shopping Bag: /cart
- Wishlist: /wishlist
- Reading List: /reading-list
- About: /about
Format navigation links as markdown: [Page Name](/path).

PRODUCT COMPARISON: When the user asks to compare products, go directly to the compareProducts tool — do NOT call searchProducts first. If the user is on a product page, include that product's slug in the comparison. If the user says "compare with other headphones" or similar, first use searchProducts to find candidates, pick the most relevant slugs, then call compareProducts with those slugs. Only show the comparison, not the search results separately.`,
    messages: modelMessages,
    tools: {
      searchProducts: tool({
        description: 'Search for products by query. Use this when the user is looking for specific products or asking about what products are available.',
        inputSchema: z.object({
          query: z.string().describe('The search query to find products'),
        }),
        execute: async ({ query }) => {
          try {
            const embedding = await generateEmbedding(query);
            const vectorStr = `[${embedding.join(',')}]`;

            const products = await prisma.$queryRawUnsafe<Array<{
              id: number;
              title: string;
              slug: string;
              description: string;
              category: string;
              price: number;
              rating: number;
              features: string[];
              brand: string;
              thumbnail: string;
            }>>(
              `SELECT id, title, slug, description, category, price, rating, features, brand, thumbnail
              FROM "Product"
              WHERE embedding IS NOT NULL
              ORDER BY embedding <=> $1::vector
              LIMIT 5`,
              vectorStr
            );

            return products;
          } catch {
            // Fallback to text search
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
                features: true,
                brand: true,
                thumbnail: true,
              },
              take: 5,
            });

            return products;
          }
        },
      }),
      getProductDetails: tool({
        description: 'Get detailed information about a specific product by its slug. Use this when the user asks about a specific product.',
        inputSchema: z.object({
          slug: z.string().describe('The product slug'),
        }),
        execute: async ({ slug }) => {
          const product = await prisma.product.findUnique({
            where: { slug },
            include: { reviews: { take: 3, orderBy: { createdAt: 'desc' } } },
          });

          if (!product) {return { error: 'Product not found' };}

          return {
            title: product.title,
            slug: product.slug,
            thumbnail: product.thumbnail,
            description: product.description,
            category: product.category,
            price: product.price,
            rating: product.rating,
            stock: product.stock,
            brand: product.brand,
            features: product.features,
            availabilityStatus: product.availabilityStatus,
            warrantyInformation: product.warrantyInformation,
            shippingInformation: product.shippingInformation,
            returnPolicy: product.returnPolicy,
            reviewCount: product.reviews.length,
            recentReviews: product.reviews.map((r) => ({
              userName: r.userName,
              rating: r.rating,
              comment: r.comment,
            })),
          };
        },
      }),
      addToCart: tool({
        description: 'Add a product to the shopping cart. Use this when the user asks to add a specific product to their cart or bag.',
        inputSchema: z.object({
          slug: z.string().describe('The product slug to add to cart'),
        }),
        execute: async ({ slug }) => {
          const product = await prisma.product.findUnique({
            where: { slug },
            select: { id: true, title: true, slug: true, price: true, thumbnail: true },
          });
          if (!product) {return { error: 'Product not found' };}
          return { action: 'add_to_cart', product };
        },
      }),
      clearCart: tool({
        description: 'Clear all items from the shopping cart. Use this when the user asks to empty, clear, or remove everything from their cart or bag.',
        inputSchema: z.object({}),
        execute: async () => {
          return { action: 'clear_cart' };
        },
      }),
      getCartItems: tool({
        description: 'Get full details of products currently in the shopping cart. Use this when the user asks to see their cart, what is in their cart, or asks about cart contents. This returns product cards with images.',
        inputSchema: z.object({}),
        execute: async () => {
          if (!cartItems || cartItems.length === 0) {
            return [];
          }
          const slugs = cartItems.map((i: { slug: string }) => i.slug).filter(Boolean);
          if (slugs.length === 0) {return [];}

          const products = await prisma.product.findMany({
            where: { slug: { in: slugs } },
            select: {
              id: true,
              title: true,
              slug: true,
              description: true,
              category: true,
              price: true,
              rating: true,
              brand: true,
              thumbnail: true,
            },
          });

          // Attach quantity from cart
          return products.map((p) => {
            const cartItem = cartItems.find((i: { slug: string }) => i.slug === p.slug);
            return { ...p, quantity: cartItem?.quantity ?? 1 };
          });
        },
      }),
      addToWishlist: tool({
        description: 'Add a product to the wishlist. Use this when the user asks to add a product to their wishlist or favorites.',
        inputSchema: z.object({
          slug: z.string().describe('The product slug to add to wishlist'),
        }),
        execute: async ({ slug }) => {
          const product = await prisma.product.findUnique({
            where: { slug },
            select: { id: true, title: true, slug: true, price: true, thumbnail: true },
          });
          if (!product) {return { error: 'Product not found' };}

          // Ensure demo user exists
          await prisma.user.upsert({
            where: { id: 'demo-user' },
            update: {},
            create: { id: 'demo-user', name: 'Guest', email: 'demo@marketandstory.com' },
          });

          const existing = await prisma.wishlistItem.findFirst({
            where: { productId: product.id },
          });
          if (existing) {
            return { action: 'already_in_wishlist', product };
          }

          await prisma.wishlistItem.create({
            data: { userId: 'demo-user', productId: product.id },
          });

          return { action: 'add_to_wishlist', product };
        },
      }),
      addToReadingList: tool({
        description: 'Save an article to the reading list. Use this when the user asks to save an article, bookmark it, or add it to their reading list.',
        inputSchema: z.object({
          articleId: z.string().describe('The article ID to save to reading list'),
        }),
        execute: async ({ articleId }) => {
          const article = await prisma.article.findUnique({
            where: { id: articleId },
            select: { id: true, title: true },
          });
          if (!article) {return { error: 'Article not found' };}

          await prisma.user.upsert({
            where: { id: 'demo-user' },
            update: {},
            create: { id: 'demo-user', name: 'Guest', email: 'demo@marketandstory.com' },
          });

          const existing = await prisma.readingListItem.findFirst({
            where: { articleId: article.id },
          });
          if (existing) {
            return { action: 'already_in_reading_list', article };
          }

          await prisma.readingListItem.create({
            data: { userId: 'demo-user', articleId: article.id },
          });

          return { action: 'add_to_reading_list', article };
        },
      }),
      searchArticles: tool({
        description: 'Search for articles and stories. Use this when the user asks about articles, stories, blog posts, editorial content, or things to read — NOT products to buy.',
        inputSchema: z.object({
          query: z.string().describe('The search query to find articles'),
        }),
        execute: async ({ query }) => {
          try {
            const embedding = await generateEmbedding(query);
            const vectorStr = `[${embedding.join(',')}]`;

            const articles = await prisma.$queryRawUnsafe<Array<{
              id: string;
              title: string;
              excerpt: string;
              author: string;
              category: string;
              heroImage: string;
              readTime: string;
              publishedAt: string;
              tags: string[];
            }>>(
              `SELECT id, title, excerpt, author, category, "heroImage", "readTime", "publishedAt", tags
              FROM "Article"
              WHERE embedding IS NOT NULL
              ORDER BY embedding <=> $1::vector
              LIMIT 5`,
              vectorStr
            );

            return articles;
          } catch {
            // Fallback to text search
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
                author: true,
                category: true,
                heroImage: true,
                readTime: true,
                publishedAt: true,
                tags: true,
              },
              take: 5,
            });

            return articles;
          }
        },
      }),
      getTrendingProducts: tool({
        description: 'Get top-rated and trending products. Use when the user asks about best sellers, trending items, most popular products, or top-rated items.',
        inputSchema: z.object({
          limit: z.number().optional().default(5).describe('Number of products to return'),
          category: z.string().optional().describe('Optional category to filter by'),
        }),
        execute: async ({ limit, category }) => {
          const products = await prisma.product.findMany({
            where: category ? { category: { equals: category, mode: 'insensitive' } } : undefined,
            select: {
              id: true,
              title: true,
              slug: true,
              description: true,
              category: true,
              price: true,
              rating: true,
              brand: true,
              thumbnail: true,
            },
            orderBy: { rating: 'desc' },
            take: limit,
          });
          return products;
        },
      }),
      compareProducts: tool({
        description: 'Compare two or more products side by side. Use when the user asks to compare products.',
        inputSchema: z.object({
          slugs: z.array(z.string()).min(2).max(4).describe('Array of product slugs to compare'),
        }),
        execute: async ({ slugs }) => {
          const products = await prisma.product.findMany({
            where: { slug: { in: slugs } },
            select: {
              id: true,
              title: true,
              slug: true,
              thumbnail: true,
              description: true,
              category: true,
              price: true,
              rating: true,
              brand: true,
              features: true,
              warrantyInformation: true,
              shippingInformation: true,
              returnPolicy: true,
              stock: true,
            },
          });
          if (products.length < 2) {return { error: 'Could not find enough products to compare. Make sure the slugs are correct.' };}
          return { action: 'compare', products };
        },
      }),
    },
    stopWhen: stepCountIs(3),
  });

  return result.toUIMessageStreamResponse();
}

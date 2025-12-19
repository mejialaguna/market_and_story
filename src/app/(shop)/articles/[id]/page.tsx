import type { JSX } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Clock, Bookmark, Share2, MessageCircle, Heart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { seedData } from '@/seed/seed';
import { ARTICLES } from '@/seed/articles.data';
import { ArticleContentRenderer } from '@/components/article-content-renderer';
import ProductImage from '@/components/product-image';

export interface PageProps {
  params: {
    id: string;
  };
}

export default async function ArticleDetailPage({ params }: PageProps):Promise<JSX.Element> {
  const { id } = await params;
  const article = ARTICLES.find((a) => a.id === id) || ARTICLES[0];
  const relatedProducts = seedData.filter((p) => article.relatedProductSlugs.includes(p.slug));

  return (
    <div className='flex min-h-screen flex-col'>
      <main className='flex-1'>
        <article>
          {/* Article Header */}
          <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl'>
            <div className='space-y-6'>
              <span className='text-sm font-medium text-accent uppercase tracking-wide'>{article.category}</span>

              <h1 className='font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-balance'>
                {article.title}
              </h1>

              {article.subtitle && (
                <p className='text-xl text-muted-foreground leading-relaxed text-balance'>{article.subtitle}</p>
              )}

              <div className='flex items-center justify-between py-6'>
                <div className='flex items-center gap-4'>
                  <div className='w-12 h-12 rounded-full bg-muted overflow-hidden'>
                    <Image
                      src={article.authorImage}
                      alt={article.author}
                      width={48}
                      height={48}
                      className='object-cover'
                    />
                  </div>
                  <div>
                    <p className='font-medium'>{article.author}</p>
                    <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                      <span>{article.publishedAt}</span>
                      <span>·</span>
                      <span className='flex items-center gap-1'>
                        <Clock className='h-3 w-3' />
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                </div>

                <div className='flex items-center gap-2'>
                  <Button variant='ghost' size='icon'>
                    <Bookmark className='h-5 w-5' />
                  </Button>
                  <Button variant='ghost' size='icon'>
                    <Share2 className='h-5 w-5' />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className='w-full aspect-21/9 bg-muted relative overflow-hidden'>
            <Image
              src={article.heroImage}
              alt={article.title}
              fill
              className='object-cover'
              priority
            />
          </div>

          {/* Article Content */}
          <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl'>
            <ArticleContentRenderer sections={article.contentSections} />

            {/* Tags */}
            <div className='mt-12 pt-8 border-t border-border'>
              <div className='flex flex-wrap gap-2'>
                {article.tags.map((tag) => (
                  <Link key={tag} href={`/articles?tag=${tag.toLowerCase()}`}>
                    <Button variant='outline' size='sm' className='rounded-full bg-transparent'>
                      {tag}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>

            {/* Author Bio */}
            <Card className='mt-8 p-6 bg-secondary/30'>
              <div className='flex gap-4'>
                <div className='w-16 h-16 rounded-full bg-muted overflow-hidden shrink-0'>
                  <Image
                    src={article.authorImage}
                    alt={article.author}
                    width={64}
                    height={64}
                    className='object-cover'
                  />
                </div>
                <div>
                  <p className='font-semibold mb-1'>{article.author}</p>
                  <p className='text-sm text-muted-foreground'>{article.authorBio}</p>
                </div>
              </div>
            </Card>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div className='mt-12 pt-8 border-t border-border'>
                <h3 className='font-serif text-2xl font-semibold mb-6'>Shop Featured Products</h3>
                <div className='grid md:grid-cols-2 gap-6'>
                  {relatedProducts.map((product) => (
                    <Link key={product.id} href={`/product/${product.slug}`}>
                      <Card className='group overflow-hidden border-border hover:shadow-md transition-all'>
                        <div className='grid grid-cols-2 gap-4 p-4'>
                          <div className='relative aspect-square rounded-lg overflow-hidden bg-muted'>
                            <ProductImage product={product} className='object-cover group-hover:scale-105 transition-transform' priority={false}/>
                          </div>
                          <div className='flex flex-col justify-center'>
                            <p className='font-medium text-balance'>{product.title}</p>
                            <p className='text-sm font-semibold mt-2'>${product.price.toFixed(2)}</p>
                            <Button size='sm' className='mt-4 bg-transparent' variant='outline'>
                              View Product
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Engagement Actions */}
            <div className='mt-12 flex items-center justify-between py-6 border-y border-border'>
              <div className='flex items-center gap-6'>
                <Button variant='ghost' size='sm' className='gap-2'>
                  <Heart className='h-5 w-5' />
                  <span>245</span>
                </Button>
                <Button variant='ghost' size='sm' className='gap-2'>
                  <MessageCircle className='h-5 w-5' />
                  <span>12</span>
                </Button>
              </div>
              <Button variant='ghost' size='sm' className='gap-2'>
                <Share2 className='h-5 w-5' />
                Share
              </Button>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}

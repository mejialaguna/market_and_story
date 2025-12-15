import { type FC, type JSX } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { Product } from '@/seed/seed';
import { seedData } from '@/seed/seed';
import { ProductCard } from '@/components/product-card';
import { getSingleProductsByCategory } from '@/helpers/getSingleProductsByCategory';

const showCaseProducts = getSingleProductsByCategory(seedData, 4);

const showCaseFeatureProducts = getSingleProductsByCategory(seedData.filter((product) => product?.features?.length), 3);

const Home: FC = (): JSX.Element => {
  return (
    <main className='flex-1'>
      {/* Hero Section */}
      <section className='container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20'>
        <div className='grid lg:grid-cols-2 gap-8 items-center'>
          <div className='space-y-6 max-w-2xl'>
            <h1 className='font-serif text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-balance leading-tight'>
              Discover where retail meets inspiration
            </h1>
            <p className='text-lg text-muted-foreground leading-relaxed'>
              Curated products, compelling stories, and live experiences that
              connect you with brands that matter.
            </p>
            <div className='flex flex-wrap gap-3'>
              <Button size='lg' asChild>
                <Link href='/products'>
                  Explore Products
                  <ArrowRight className='ml-2 h-4 w-4' />
                </Link>
              </Button>
              <Button size='lg' variant='outline' asChild>
                <Link href='/articles'>View Stories</Link>
              </Button>
            </div>
          </div>

          <div className='relative aspect-[4/3] lg:aspect-square rounded-lg overflow-hidden bg-muted'>
            <Image
              src='https://res.cloudinary.com/jlml/image/upload/v1765549695/market_and_story/k2lkzqe3s0jnotu2ul6t.webp'
              alt='Curated retail display'
              fill
              className='object-cover'
              priority
            />
          </div>
        </div>
      </section>

      {/* Shop by Category section */}
      <section className='border-y border-border bg-secondary/30'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16'>
          <h2 className='font-serif text-3xl md:text-4xl font-semibold mb-8 text-balance'>
            Shop by Category
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            {showCaseProducts.map((product: Product) => (
              <Link
                key={product.slug}
                href={{
                  pathname: '/products',
                  query: {
                    categoryFilter: `${product.category}`,
                  },
                }}
              >
                <ProductCard
                  product={product}
                  showExtendedInfo={false}
                  categoryStyle='font-medium text-center'
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products section */}
      <section className='container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16'>
        <div className='flex justify-between items-end mb-8'>
          <h2 className='font-serif text-3xl md:text-4xl font-semibold text-balance'>
            Featured Products
          </h2>
          <Button variant='ghost' asChild className='hidden sm:flex'>
            <Link href='/products'>
              View All
              <ArrowRight className='ml-2 h-4 w-4' />
            </Link>
          </Button>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {showCaseFeatureProducts.map((product) => (
            <Link key={product.slug} href={`/product/${product.slug}`}>
              <ProductCard
                product={product}
                showExtendedInfo={false}
                categoryStyle='font-medium text-center'
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Stories section */}
      <section className='bg-secondary/30 border-y border-border'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16'>
          <div className='flex justify-between items-end mb-8'>
            <h2 className='font-serif text-3xl md:text-4xl font-semibold text-balance'>
              Latest Stories
            </h2>
            <Button variant='ghost' asChild className='hidden sm:flex'>
              <Link href='/articles'>
                View All
                <ArrowRight className='ml-2 h-4 w-4' />
              </Link>
            </Button>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            {[
              {
                title: 'The Art of Mindful Living',
                excerpt:
                  'Exploring how intentional design shapes our daily experiences and wellbeing.',
                image: 'serene minimalist interior design',
                category: 'Lifestyle',
                type: 'lifestyle',
              },
              {
                title: 'Sustainable Fashion Forward',
                excerpt:
                  'Meet the designers reimagining fashion with eco-conscious materials and practices.',
                image: 'sustainable fashion design studio',
                category: 'Fashion',
                type: 'fashionStyle',
              },
            ].map((article, idx) => (
              <Link
                key={`${article.title}-${article.category}`}
                href={`/articles/${idx + 1}`}
              >
                <Card className='group overflow-hidden border-border hover:shadow-lg transition-all duration-300 h-full'>
                  <div className='grid md:grid-cols-2 gap-0 h-full'>
                    <div className='relative aspect-video md:aspect-auto overflow-hidden bg-muted'>
                      <Image
                        src={`https://res.cloudinary.com/jlml/image/upload/v1765549902/market_and_story/${article.type}.webp`}
                        alt={article.title}
                        fill
                        className='object-cover group-hover:scale-105 transition-transform duration-300'
                      />
                    </div>
                    <div className='p-6 flex flex-col justify-between'>
                      <div className='space-y-3'>
                        <span className='text-xs font-medium text-accent uppercase tracking-wide'>
                          {article.category}
                        </span>
                        <h3 className='font-serif text-2xl font-semibold leading-tight text-balance'>
                          {article.title}
                        </h3>
                        <p className='text-sm text-muted-foreground leading-relaxed'>
                          {article.excerpt}
                        </p>
                      </div>
                      <div className='mt-4'>
                        <span className='text-sm font-medium group-hover:text-accent transition-colors inline-flex items-center'>
                          Read More
                          <ArrowRight className='ml-2 h-4 w-4' />
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Live Content CTA section*/}
      <section className='container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20'>
        <Card className='overflow-hidden border-border bg-primary text-primary-foreground'>
          <div className='grid lg:grid-cols-2 gap-0'>
            <div className='p-8 md:p-12 flex flex-col justify-center'>
              <h2 className='font-serif text-3xl md:text-4xl font-semibold mb-4 text-balance'>
                Experience Live Content
              </h2>
              <p className='text-lg mb-6 leading-relaxed opacity-90'>
                Swipe through immersive stories, behind-the-scenes moments, and
                product showcases in our vertical feed.
              </p>
              <div>
                <Button size='lg' variant='secondary' asChild>
                  <Link href='/live'>
                    Watch Now
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </Link>
                </Button>
              </div>
            </div>
            <div className='relative aspect-video lg:aspect-auto min-h-[300px] bg-primary-foreground/10'>
              <Image
                src='https://res.cloudinary.com/jlml/image/upload/v1765549801/market_and_story/vibe2bdlgh4rerv56tqe.webp'
                alt='Live content experience'
                fill
                className='object-cover'
              />
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
};

export default Home;

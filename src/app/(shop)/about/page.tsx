/* eslint-disable react/no-unescaped-entities */
import { type JSX } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import { ArrowRight, Heart, Users, Sparkles, Globe } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { placeholderImage } from '@/lib/content-types';

export const metadata = {
  title: 'About market&story',
  description:
    'Discover the story behind market&story - where curated products meet meaningful storytelling.',
};

export default function AboutPage(): JSX.Element {
  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <section className='bg-secondary py-20 md:py-32'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto text-center'>
            <h1 className='font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance'>
              Where Every Product Has a Story
            </h1>
            <p className='text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto'>
              We believe that shopping should be more than a transaction. It's
              about discovering beautiful objects with meaning, crafted by
              artisans who pour their heart into every detail.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className='py-20 md:py-28'>
        <div className='container mx-auto px-4'>
          <div className='grid md:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto'>
            <div className='space-y-6'>
              <h2 className='font-serif text-3xl md:text-5xl font-bold text-foreground text-pretty'>
                Our Mission
              </h2>
              <div className='space-y-4 text-muted-foreground leading-relaxed'>
                <p>
                  Founded in 2024, market&story emerged from a simple
                  observation: the best products come with stories worth
                  telling. We're not just another marketplace—we're a platform
                  that celebrates craftsmanship, sustainability, and the human
                  stories behind the objects we love.
                </p>
                <p>
                  Every item in our curated collection is chosen for its
                  quality, design, and the values it represents. We partner with
                  makers, artisans, and brands who share our commitment to
                  creating products that are built to last and designed with
                  intention.
                </p>
                <p>
                  Through our editorial platform, we go beyond the product
                  catalog to explore the craft, the inspiration, and the people
                  who make beautiful things possible.
                </p>
              </div>
            </div>
            <div className='relative aspect-square rounded-lg overflow-hidden bg-accent-foreground'>
              <Image
                src='https://res.cloudinary.com/jlml/image/upload/v1765990292/market_and_story/our-mission.png'
                alt='Artisan crafting product'
                fill
                className='object-contain'
                sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                loading='eager'
                placeholder='blur'
                blurDataURL={placeholderImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className='bg-muted/30 py-20 md:py-28'>
        <div className='container mx-auto px-4'>
          <div className='max-w-6xl mx-auto'>
            <h2 className='font-serif text-3xl md:text-5xl font-bold text-foreground text-center mb-16'>
              What We Stand For
            </h2>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
              <div className='space-y-4 text-center'>
                <div className='w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto'>
                  <Heart className='w-7 h-7 text-accent' />
                </div>
                <h3 className='font-serif text-xl font-semibold text-foreground'>
                  Quality First
                </h3>
                <p className='text-sm text-muted-foreground leading-relaxed'>
                  Every product is carefully vetted for craftsmanship,
                  materials, and durability. We only feature items we'd proudly
                  use ourselves.
                </p>
              </div>

              <div className='space-y-4 text-center'>
                <div className='w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto'>
                  <Sparkles className='w-7 h-7 text-accent' />
                </div>
                <h3 className='font-serif text-xl font-semibold text-foreground'>
                  Thoughtful Curation
                </h3>
                <p className='text-sm text-muted-foreground leading-relaxed'>
                  We believe less is more. Our collection is intentionally
                  small, focusing on timeless pieces that bring joy and
                  function.
                </p>
              </div>

              <div className='space-y-4 text-center'>
                <div className='w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto'>
                  <Users className='w-7 h-7 text-accent' />
                </div>
                <h3 className='font-serif text-xl font-semibold text-foreground'>
                  People-Centered
                </h3>
                <p className='text-sm text-muted-foreground leading-relaxed'>
                  Behind every product is a person or team with a story. We
                  celebrate makers and build lasting relationships with our
                  partners.
                </p>
              </div>

              <div className='space-y-4 text-center'>
                <div className='w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto'>
                  <Globe className='w-7 h-7 text-accent' />
                </div>
                <h3 className='font-serif text-xl font-semibold text-foreground'>
                  Sustainability
                </h3>
                <p className='text-sm text-muted-foreground leading-relaxed'>
                  We prioritize eco-friendly materials, ethical production, and
                  brands committed to reducing their environmental impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className='py-20 md:py-28'>
        <div className='container mx-auto px-4'>
          <div className='max-w-6xl mx-auto'>
            <div className='text-center mb-16'>
              <h2 className='font-serif text-3xl md:text-5xl font-bold text-foreground mb-4'>
                Meet the Team
              </h2>
              <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
                A small but passionate team dedicated to bringing you the best
                in design, craft, and storytelling.
              </p>
            </div>

            <div className='grid md:grid-cols-3 gap-8'>
              <div className='text-center space-y-4'>
                <div className='relative aspect-square rounded-lg overflow-hidden bg-accent-foreground mx-auto max-w-xs'>
                  <Image
                    src='https://res.cloudinary.com/jlml/image/upload/v1765990218/market_and_story/ceo.png'
                    alt='Team member'
                    fill
                    className='object-contain'
                    sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                loading='eager'
                placeholder='blur'
                blurDataURL={placeholderImage}
                  />
                </div>
                <div>
                  <h3 className='font-serif text-xl font-semibold text-foreground'>
                    Sarah Chen
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    Founder & Curator
                  </p>
                </div>
              </div>

              <div className='text-center space-y-4'>
                <div className='relative aspect-square rounded-lg overflow-hidden bg-accent-foreground mx-auto max-w-xs'>
                  <Image
                    src='https://res.cloudinary.com/jlml/image/upload/v1765990218/market_and_story/editorial-director.png'
                    alt='Team member'
                    fill
                    className='object-contain'
                    sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                loading='eager'
                placeholder='blur'
                blurDataURL={placeholderImage}
                  />
                </div>
                <div>
                  <h3 className='font-serif text-xl font-semibold text-foreground'>
                    Marcus Thompson
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    Editorial Director
                  </p>
                </div>
              </div>

              <div className='text-center space-y-4'>
                <div className='relative aspect-square rounded-lg overflow-hidden bg-accent-foreground mx-auto max-w-xs'>
                  <Image
                    src='https://res.cloudinary.com/jlml/image/upload/v1765990219/market_and_story/product-manager.png'
                    alt='Team member'
                    fill
                    className='object-contain'
                    sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                loading='eager'
                placeholder='blur'
                blurDataURL={placeholderImage}
                  />
                </div>
                <div>
                  <h3 className='font-serif text-xl font-semibold text-foreground'>
                    Elena Rodriguez
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    Product Manager
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className='bg-accent/5 py-20 md:py-28'>
        <div className='container mx-auto px-4'>
          <div className='grid md:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto'>
            <div className='relative aspect-4/5 rounded-lg overflow-hidden bg-muted order-2 md:order-1'>
              <Image
                src='https://res.cloudinary.com/jlml/image/upload/v1765989427/market_and_story/about_page_bottom_section.jpg'
                alt='market&story workspace'
                fill
                className='object-cover'
              />
            </div>
            <div className='space-y-6 order-1 md:order-2'>
              <h2 className='font-serif text-3xl md:text-5xl font-bold text-foreground text-pretty'>
                The Story Continues
              </h2>
              <div className='space-y-4 text-muted-foreground leading-relaxed'>
                <p>
                  What started as a weekend project has grown into a thriving
                  community of conscious consumers and creative makers. We've
                  featured over 200 products, published hundreds of stories, and
                  connected thousands of people with objects that bring meaning
                  to their everyday lives.
                </p>
                <p>
                  Our vision extends beyond commerce. We host workshops, maker
                  interviews, and pop-up experiences in cities around the world.
                  Through our live content platform, we bring you
                  behind-the-scenes access to studios, factories, and the
                  creative process.
                </p>
                <p>
                  The best part? We're just getting started. Join us on this
                  journey to make shopping more meaningful, one story at a time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 md:py-28'>
        <div className='container mx-auto px-4'>
          <div className='max-w-3xl mx-auto text-center space-y-8'>
            <h2 className='font-serif text-3xl md:text-5xl font-bold text-foreground'>
              Explore Our World
            </h2>
            <p className='text-lg text-muted-foreground'>
              Discover curated products, read inspiring stories, and join a
              community that values quality and craftsmanship.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button size='lg' asChild>
                <Link href='/products'>
                  Shop Products
                  <ArrowRight className='ml-2 h-4 w-4' />
                </Link>
              </Button>
              <Button size='lg' variant='outline' asChild>
                <Link href='/articles'>Read Stories</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

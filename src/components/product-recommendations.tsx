import { type FC, type JSX } from 'react';

import Link from 'next/link';

import { Star } from 'lucide-react';

import type { ProductCategory } from '@/lib/content-types';
import { getRecommendations } from '@/lib/dal/products';

import { Card } from './ui/card';
import ProductImage from './product-image';
import { LikesComponent } from './likes-component';

interface ProductRecommendationsProps {
  category: ProductCategory;
  currentSlug?: string;
}

export const RecommendationsSkeleton:FC = (): JSX.Element => (
  <div className='space-y-6'>
    <div className='flex items-center gap-2'>
      <div className='h-8 w-64 bg-muted rounded animate-pulse' />
    </div>
    <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
      {[...Array(4)].map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={i} className='space-y-3'>
          <div className='aspect-square rounded-lg bg-muted animate-pulse' />
          <div className='h-4 bg-muted rounded animate-pulse w-3/4' />
          <div className='h-3 bg-muted rounded animate-pulse w-1/2' />
        </div>
      ))}
    </div>
  </div>
);

export const ProductRecommendations: FC<ProductRecommendationsProps> = async ({
  category,
  currentSlug,
}): Promise<JSX.Element> => {
  const { ok, products } = await getRecommendations(category, 4, currentSlug);

  if (!ok || !products || products.length === 0) {
    return <div />;
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-2'>
        <h2 className='font-serif text-3xl font-semibold'>
          You Might Also Like
        </h2>
        <span className='text-xs px-2 py-1 rounded-full bg-accent/20 text-accent font-medium'>
          AI-Powered
        </span>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
        {products.map((product) => (
              <Card
                key={product.id}
                className='group overflow-hidden border-border'
              >
                <Link href={`/product/${product.slug}`}>
                  <div className='relative aspect-square overflow-hidden bg-muted'>
                    <ProductImage
                      product={product}
                      className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                    />
                    <LikesComponent />
                  </div>
                </Link>

                <div className='p-4 space-y-2'>
                  <div className='flex items-center gap-1'>
                    <Star className='h-3 w-3 fill-accent text-accent' />
                    <span className='text-xs text-muted-foreground'>
                      {product.rating}
                    </span>
                  </div>
                  <Link href={`/product/${product.slug}`}>
                    <h3 className='font-medium text-balance hover:text-accent transition-colors'>
                      {product.title}
                    </h3>
                  </Link>
                  <p className='text-sm font-semibold'>
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </Card>
            ))}
      </div>
    </div>
  );
};

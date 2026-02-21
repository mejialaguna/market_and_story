import { type FC, type JSX } from 'react';

import Link from 'next/link';

import { ShoppingBag } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getProductById } from '@/lib/dal/products';

import ProductImage from './product-image';

interface InlineProductCardProps {
  productId: number;
}

export const InlineProductCard: FC<InlineProductCardProps> = async ({
  productId,
}: InlineProductCardProps): Promise<JSX.Element> => {
  const product = await getProductById(productId);

  if (!product) {
    return <></>;
  }

  return (
    <Card className='my-8 overflow-hidden border-accent/20 bg-secondary/30'>
      <div className='grid md:grid-cols-[200px_1fr] gap-6 p-6'>
        <Link href={`/product/${product.slug}`} className='shrink-0'>
          <div className='relative aspect-square rounded-lg overflow-hidden bg-muted group'>
            <ProductImage
              product={product}
              className='object-cover w-full h-full group-hover:scale-105 transition-transform'
            />
          </div>
        </Link>
        <div className='flex flex-col justify-between'>
          <div className='space-y-2'>
            <div className='flex items-start justify-between gap-4'>
              <div>
                <p className='text-xs text-muted-foreground uppercase tracking-wider mb-1'>
                  {product.category}
                </p>
                <Link href={`/product/${product.slug}`}>
                  <h4 className='font-serif text-xl font-semibold hover:text-accent transition-colors'>
                    {product.title}
                  </h4>
                </Link>
              </div>
              <p className='text-lg font-semibold whitespace-nowrap'>
                ${product.price}
              </p>
            </div>
            {product.badge && (
              <span className='inline-block text-xs px-2 py-1 rounded-full bg-accent/10 text-accent'>
                {product.badge}
              </span>
            )}
          </div>
          <div className='flex gap-2 mt-4'>
            <Link href={`/product/${product.slug}`} className='flex-1'>
              <Button variant='outline' className='w-full bg-transparent'>
                View Details
              </Button>
            </Link>
            <Button size='icon' variant='default'>
              <ShoppingBag className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

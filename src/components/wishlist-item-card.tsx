'use client';

import { useState, type FC, type JSX } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Heart, Star } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface WishlistProduct {
  id: number;
  title: string;
  slug: string;
  price: number;
  thumbnail: string;
  rating: number;
  badge: string | null;
  category: string;
}

export const WishlistItemCard: FC<{ product: WishlistProduct }> = ({ product }): JSX.Element => {
  const router = useRouter();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async (): Promise<void> => {
    setIsRemoving(true);
    await fetch('/api/wishlist', {
      method: 'DELETE',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: product.id }),
    });
    router.refresh();
  };

  return (
    <Card className='overflow-hidden group'>
      <Link href={`/product/${product.slug}`}>
        <div className='aspect-square relative overflow-hidden'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.thumbnail}
            alt={product.title}
            className='h-full w-full object-cover transition-transform group-hover:scale-105'
          />
          {product.badge && (
            <span className='absolute top-2 left-2 bg-accent text-accent-foreground text-xs px-2 py-0.5 rounded-full'>
              {product.badge}
            </span>
          )}
        </div>
      </Link>
      <div className='p-4 space-y-2'>
        <p className='text-xs text-muted-foreground uppercase tracking-wider'>{product.category}</p>
        <Link href={`/product/${product.slug}`}>
          <h3 className='font-medium text-sm line-clamp-2 hover:text-accent transition-colors'>
            {product.title}
          </h3>
        </Link>
        <div className='flex items-center justify-between'>
          <span className='font-semibold text-sm'>${product.price.toFixed(2)}</span>
          <div className='flex items-center gap-1'>
            <Star className='h-3.5 w-3.5 fill-accent text-accent' />
            <span className='text-xs text-muted-foreground'>{product.rating.toFixed(1)}</span>
          </div>
        </div>
        <Button
          variant='ghost'
          size='sm'
          className='w-full text-red-500 hover:text-red-600 hover:bg-red-50'
          onClick={handleRemove}
          disabled={isRemoving}
        >
          <Heart className='h-4 w-4 mr-1 fill-current' />
          {isRemoving ? 'Removing...' : 'Remove'}
        </Button>
      </div>
    </Card>
  );
};

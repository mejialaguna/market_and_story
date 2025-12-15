import { useMemo, useState } from 'react';
import type { FC, JSX } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Heart } from 'lucide-react';

import type { Product } from '@/seed/seed';

import { Badge } from './ui/badge';
import { Card } from './ui/card';

interface ProductCardProps {
  product: Product;
}

const placeholderImage = 'https://res.cloudinary.com/jlml/image/upload/v1765487827/market_and_story/imageplaceholder.svg';

export const ProductCard: FC<ProductCardProps> = ({ product }): JSX.Element => {
  const [imageIndex, setImageIndex] = useState(0);
 
  const currentImage = useMemo(() => {
    if (product.images && product.images.length > 0 && imageIndex < product.images.length) {
      return product.images[imageIndex];
    }
    return placeholderImage;
  }, [product.images, imageIndex]);

  const handleImageError = ():void => {
    // Try next image in array
    if (product.images && imageIndex < product.images.length - 1) {
      setImageIndex(imageIndex + 1);
    } else {
      // All images failed, will use placeholder
      setImageIndex(product.images?.length || 0);
    }
  };

  return (
    <Link href={`/products/${product.id}`}>
      <Card className='group overflow-hidden border-border hover:shadow-lg transition-all duration-300'>
        <div className='relative aspect-square overflow-hidden bg-muted'>
          <Image
            src={currentImage}
            alt={product.title}
            fill
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
            className='object-cover group-hover:scale-105 transition-transform duration-300'
            onError={handleImageError}
          />
          {product.badge && (
            <Badge className='absolute top-3 left-3 bg-accent text-accent-foreground'>
              {product.badge}
            </Badge>
          )}
          <button className='absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100'>
            <Heart className='h-4 w-4' />
          </button>
        </div>
        <div className='p-4 space-y-2'>
          <p className='text-xs text-muted-foreground uppercase tracking-wide'>
            {product.category}
          </p>
          <h3 className='font-medium'>{product.title}</h3>
          <p className='text-sm font-semibold'>${product.price}</p>
        </div>
      </Card>
    </Link>
  );
};

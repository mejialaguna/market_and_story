import type { FC, JSX } from 'react';

import { Heart } from 'lucide-react';

import type { Product } from '@/seed/seed';

import { Badge } from './ui/badge';
import { Card } from './ui/card';
import ProductImage from './product-image';

interface ProductCardProps {
  product: Product;
  showExtendedInfo?: boolean;
  categoryStyle?: string;
}

export const ProductCard: FC<ProductCardProps> = ({
  product,
  showExtendedInfo = true,
  categoryStyle = '',
}): JSX.Element => {

  return (
    <Card className='group overflow-hidden border-border hover:shadow-lg transition-all duration-300'>
      <div className='relative aspect-square overflow-hidden bg-muted'>
        <ProductImage
          product={product}
          className='object-cover group-hover:scale-105 transition-transform duration-300'
        />
        {showExtendedInfo && product.badge && (
          <Badge className='absolute top-3 left-3 bg-accent text-accent-foreground'>
            {product.badge}
          </Badge>
        )}
        {showExtendedInfo && (
          <button className='absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100'>
            <Heart className='h-4 w-4' />
          </button>
        )}
      </div>
      <div className='p-4 space-y-2'>
        <p
          className={
            categoryStyle ||
            'text-xs text-muted-foreground uppercase tracking-wide'
          }
        >
          {product.category}
        </p>
        {showExtendedInfo && (
          <>
            <h3 className='font-medium'>{product.title}</h3>
            <p className='text-sm font-semibold'>${product.price}</p>
          </>
        )}
      </div>
    </Card>
  );
};

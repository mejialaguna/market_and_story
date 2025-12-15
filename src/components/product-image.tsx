'use client';

import {useMemo, type FC, type JSX } from 'react';

import Image from 'next/image';

import type { Product } from '@/seed/seed';
import { handleImage } from '@/helpers/handleImage';

export interface ProductImageProps extends React.HTMLAttributes<HTMLImageElement> {
  product: Product
}

const ProductImage: FC<ProductImageProps> = ({product, className}): JSX.Element => {
  const {currentImage, handleImageError} = useMemo(() => handleImage(product), [product]);

  return (
    <Image
      src={currentImage}
      alt={product.title}
      fill
      sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
      className={className}
      onError={handleImageError}
    />
  );
};

export default ProductImage;

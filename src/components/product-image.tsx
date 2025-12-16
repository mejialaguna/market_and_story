'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useMemo,
  useState,
  type FC,
  type JSX,
} from 'react';

import Image from 'next/image';

import type { Product } from '@/seed/seed';

export interface ProductImageProps
  extends React.HTMLAttributes<HTMLImageElement> {
  product: Product;
  priority?: boolean;
}

const placeholderImage =
  'https://res.cloudinary.com/jlml/image/upload/v1765487827/market_and_story/imageplaceholder.svg';

const ProductImage: FC<ProductImageProps> = ({
  product,
  className,
  priority = false,
}): JSX.Element => {
  const [imageIdx, setImageIdx] = useState(0);
  const [inView, setInView] = useState(priority);
  const images = useMemo(
    () => (product?.images?.length ? product?.images : []),
    [product]
  );
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const handleImageError = useCallback(() => {
    setImageIdx((prev) =>
      prev < images.length - 1 ? prev + 1 : images.length
    );
  }, [images.length]);

  useEffect(() => {
    if (!wrapperRef?.current || inView) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0,
        rootMargin: '150px',
      }
    );

    observer.observe(wrapperRef.current);

    return () => observer.disconnect();
  }, [inView]);

  return (
    <div ref={wrapperRef}>
      {inView && (
        <Image
          src={images[imageIdx] ?? placeholderImage}
          alt={product.title}
          fill
          sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
          className={className}
          onError={handleImageError}
          loading={priority ? 'eager' : 'lazy'}
          placeholder='blur'
          blurDataURL={placeholderImage}
          priority={priority}
        />
      )}
    </div>
  );
};

export default ProductImage;

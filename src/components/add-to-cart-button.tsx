'use client';

import { useState, useRef, useEffect, type FC, type JSX } from 'react';

import { ShoppingBag, Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useCart } from '@/components/providers/cart-provider';

interface AddToCartButtonProps {
  productId: number;
  title: string;
  slug: string;
  price: number;
  thumbnail: string;
}

export const AddToCartButton: FC<AddToCartButtonProps> = ({
  productId,
  title,
  slug,
  price,
  thumbnail,
}): JSX.Element => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleClick = (): void => {
    addToCart({ productId, title, slug, price, thumbnail });
    setAdded(true);
    timeoutRef.current = setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Button size='lg' className='flex-1' onClick={handleClick} disabled={added}>
      {added ? (
        <>
          <Check className='h-5 w-5 mr-2' />
          Added!
        </>
      ) : (
        <>
          <ShoppingBag className='h-5 w-5 mr-2' />
          Add to Bag
        </>
      )}
    </Button>
  );
};

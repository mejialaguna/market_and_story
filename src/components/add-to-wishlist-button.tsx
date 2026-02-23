'use client';

import { useState, useEffect, type FC, type JSX } from 'react';

import { Heart } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface AddToWishlistButtonProps {
  productId: number;
}

export const AddToWishlistButton: FC<AddToWishlistButtonProps> = ({ productId }): JSX.Element => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/wishlist', { signal: controller.signal })
      .then((res) => res.json())
      .then((items) => {
        if (Array.isArray(items)) {
          setIsInWishlist(items.some((item: { productId: number }) => item.productId === productId));
        }
      })
      .catch(() => {});

    return () => controller.abort();
  }, [productId]);

  const handleToggle = async (): Promise<void> => {
    setIsLoading(true);
    try {
      if (isInWishlist) {
        await fetch('/api/wishlist', {
          method: 'DELETE',
          // eslint-disable-next-line @typescript-eslint/naming-convention
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId }),
        });
        setIsInWishlist(false);
      } else {
        const res = await fetch('/api/wishlist', {
          method: 'POST',
          // eslint-disable-next-line @typescript-eslint/naming-convention
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId }),
        });
        if (res.ok || res.status === 409) {
          setIsInWishlist(true);
        }
      }
    } catch {
      // silently fail
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size='lg'
      variant='outline'
      onClick={handleToggle}
      disabled={isLoading}
      aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-accent text-accent' : ''}`} />
    </Button>
  );
};

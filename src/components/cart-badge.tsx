'use client';

import type { FC, JSX } from 'react';

import Link from 'next/link';

import { ShoppingBag } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useCart } from '@/components/providers/cart-provider';

export const CartBadge: FC = (): JSX.Element => {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <Button variant='ghost' size='icon' className='relative' asChild>
      <Link href='/cart'>
        <ShoppingBag className='h-5 w-5' />
        {cartCount > 0 && (
          <span className='absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent text-accent-foreground text-[10px] font-medium flex items-center justify-center'>
            {cartCount > 9 ? '9+' : cartCount}
          </span>
        )}
        <span className='sr-only'>Shopping bag</span>
      </Link>
    </Button>
  );
};

'use client';

import type { JSX } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart } from '@/components/providers/cart-provider';

export default function CartPage(): JSX.Element {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <main className='flex-1'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-20'>
          <div className='text-center space-y-6'>
            <div className='h-20 w-20 rounded-full bg-muted flex items-center justify-center mx-auto'>
              <ShoppingBag className='h-10 w-10 text-muted-foreground' />
            </div>
            <h1 className='font-serif text-3xl font-semibold'>Your bag is empty</h1>
            <p className='text-muted-foreground'>Looks like you haven&apos;t added anything yet.</p>
            <Button asChild>
              <Link href='/products'>Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className='flex-1'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <h1 className='font-serif text-4xl font-semibold mb-8'>Shopping Bag</h1>

        <div className='grid lg:grid-cols-3 gap-8'>
          <div className='lg:col-span-2 space-y-4'>
            {items.map((item) => (
              <Card key={item.productId} className='p-4'>
                <div className='flex gap-4'>
                  <Link href={`/product/${item.slug}`} className='shrink-0'>
                    <div className='relative h-24 w-24 rounded-lg overflow-hidden bg-muted'>
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        className='object-cover'
                        sizes='96px'
                      />
                    </div>
                  </Link>

                  <div className='flex-1 min-w-0'>
                    <Link href={`/product/${item.slug}`} className='hover:underline'>
                      <h3 className='font-semibold text-sm truncate'>{item.title}</h3>
                    </Link>
                    <p className='text-sm text-muted-foreground mt-1'>
                      ${item.price.toFixed(2)}
                    </p>

                    <div className='flex items-center gap-2 mt-3'>
                      <Button
                        variant='outline'
                        size='icon'
                        className='h-8 w-8'
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className='h-3 w-3' />
                      </Button>
                      <span className='text-sm w-8 text-center'>{item.quantity}</span>
                      <Button
                        variant='outline'
                        size='icon'
                        className='h-8 w-8'
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      >
                        <Plus className='h-3 w-3' />
                      </Button>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='h-8 w-8 ml-auto text-muted-foreground hover:text-destructive'
                        onClick={() => removeFromCart(item.productId)}
                      >
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </div>
                  </div>

                  <div className='text-sm font-semibold shrink-0'>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              </Card>
            ))}

            <Button variant='ghost' size='sm' onClick={clearCart} className='text-muted-foreground'>
              Clear bag
            </Button>
          </div>

          <div className='lg:col-span-1'>
            <Card className='p-6 space-y-4 sticky top-24'>
              <h2 className='font-semibold text-lg'>Order Summary</h2>

              <div className='space-y-2 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Shipping</span>
                  <span className='text-muted-foreground'>Calculated at checkout</span>
                </div>
              </div>

              <div className='border-t pt-4'>
                <div className='flex justify-between font-semibold'>
                  <span>Total</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
              </div>

              <Button className='w-full' size='lg'>
                Checkout
              </Button>

              <Button variant='outline' className='w-full' asChild>
                <Link href='/products'>Continue Shopping</Link>
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}

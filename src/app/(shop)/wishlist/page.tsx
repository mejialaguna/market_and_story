import Link from 'next/link';

import { Heart } from 'lucide-react';

import { prisma } from '@/lib/db';
import { Card } from '@/components/ui/card';
import { WishlistItemCard } from '@/components/wishlist-item-card';

export default async function WishlistPage(): Promise<React.JSX.Element> {
  const items = await prisma.wishlistItem.findMany({
    include: {
      product: {
        select: {
          id: true,
          title: true,
          slug: true,
          price: true,
          thumbnail: true,
          rating: true,
          badge: true,
          category: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className='flex-1'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='max-w-4xl mx-auto'>
          <div className='flex items-center gap-3 mb-8'>
            <Heart className='h-6 w-6 text-accent' />
            <h1 className='font-serif text-3xl font-semibold'>Your Wishlist</h1>
          </div>

          {items.length === 0 ? (
            <Card className='p-12 text-center'>
              <Heart className='h-12 w-12 mx-auto mb-4 text-muted-foreground/30' />
              <h2 className='font-serif text-xl font-semibold mb-2'>Your wishlist is empty</h2>
              <p className='text-muted-foreground text-sm mb-6'>
                Start adding products you love to keep track of them here.
              </p>
              <Link
                href='/products'
                className='inline-flex items-center justify-center rounded-md bg-accent text-accent-foreground px-6 py-2 text-sm font-medium hover:bg-accent/90 transition-colors'
              >
                Browse Products
              </Link>
            </Card>
          ) : (
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              {items.map((item) => (
                <WishlistItemCard key={item.id} product={item.product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

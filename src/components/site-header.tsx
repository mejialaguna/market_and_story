import type { FC, JSX } from 'react';

import Link from 'next/link';

import { Search, Menu, Heart, BookOpen } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CartBadge } from '@/components/cart-badge';


export const SiteHeader: FC = (): JSX.Element => {
  return (
    <header className='sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          <div className='flex items-center gap-8'>
            <Link href='/' className='flex items-center space-x-2'>
              <span className='font-serif text-[24px] font-semibold tracking-tight'>
                market&story
              </span>
            </Link>

            <nav className='hidden md:flex items-center gap-6'>
              <Link
                href='/products'
                className='text-[14px] font-medium text-foreground/80 hover:text-foreground transition-colors'
              >
                Shop
              </Link>
              <Link
                href='/articles'
                className='text-[14px] font-medium text-foreground/80 hover:text-foreground transition-colors'
              >
                Stories
              </Link>
              <Link
                href='/product-reels'
                className='text-[14px] font-medium text-foreground/80 hover:text-foreground transition-colors'
              >
                Product Reels
              </Link>
              <Link
                href='/locations'
                className='text-[14px] font-medium text-foreground/80 hover:text-foreground transition-colors'
              >
                Locations
              </Link>
            </nav>
          </div>

          <div className='flex items-center gap-2'>
            <Button
              variant='ghost'
              size='icon'
              className='hidden sm:flex'
              asChild
            >
              <Link href='/search'>
                <Search className='h-5 w-5' />
                <span className='sr-only'>Search</span>
              </Link>
            </Button>

            <Button variant='ghost' size='icon' asChild>
              <Link href='/wishlist'>
                <Heart className='h-5 w-5' />
                <span className='sr-only'>Wishlist</span>
              </Link>
            </Button>

            <Button variant='ghost' size='icon' asChild>
              <Link href='/reading-list'>
                <BookOpen className='h-5 w-5' />
                <span className='sr-only'>Reading List</span>
              </Link>
            </Button>

            <CartBadge />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon' className='md:hidden'>
                  <Menu className='h-5 w-5' />
                  <span className='sr-only'>Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-56'>
                <DropdownMenuItem asChild>
                  <Link href='/products'>Shop</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href='/articles'>Stories</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href='/product-reels'>Product Reels</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href='/locations'>Locations</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className='sm:hidden'>
                  <Link href='/search'>Search</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>


      </div>
    </header>
  );
};

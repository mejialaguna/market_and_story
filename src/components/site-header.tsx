'use client';

import { useState } from 'react';
import type { FC, JSX } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';


import { Search, ShoppingBag, Menu, User, Heart, BookOpen } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';


export const SiteHeader: FC = (): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();

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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon'>
                  <User className='h-5 w-5' />
                  <span className='sr-only'>User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-48'>
                <DropdownMenuItem asChild>
                  <Link href='/account'>My Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href='/wishlist' className='flex items-center'>
                    <Heart className='h-4 w-4 mr-2' />
                    Wishlist
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href='/reading-list' className='flex items-center'>
                    <BookOpen className='h-4 w-4 mr-2' />
                    Reading List
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href='/auth/login'>Sign In</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant='ghost' size='icon' asChild>
              <Link href='/cart'>
                <ShoppingBag className='h-5 w-5' />
                <span className='sr-only'>Shopping bag</span>
              </Link>
            </Button>
            <Button
              variant='ghost'
              size='icon'
              className='md:hidden'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className='h-5 w-5' />
              <span className='sr-only'>Menu</span>
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className='md:hidden py-4 border-t border-border'>
            <div className='flex flex-col gap-4'>
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
              <Link
                href='/search'
                className='text-[14px] font-medium text-foreground/80 hover:text-foreground transition-colors'
              >
                Search
              </Link>
              <Link
                href='/account'
                className='text-[14px] font-medium text-foreground/80 hover:text-foreground transition-colors'
              >
                My Account
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

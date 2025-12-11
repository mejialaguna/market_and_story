import type { FC, JSX } from 'react';

import Link from 'next/link';


export const SiteFooter:FC = (): JSX.Element => {
  return (
    <footer className='border-t border-border bg-background'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div className='space-y-4'>
            <Link href='/' className='inline-block'>
              <span className='font-serif text-2xl font-semibold tracking-tight'>
                market&story
              </span>
            </Link>
            <p className='text-sm text-muted-foreground leading-relaxed'>
              Curating exceptional products and inspiring stories for the modern
              lifestyle.
            </p>
          </div>

          <div>
            <h3 className='font-medium mb-4'>Shop</h3>
            <ul className='space-y-3'>
              <li>
                <Link
                  href='/products'
                  className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href='/products/new'
                  className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href='/products/featured'
                  className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                >
                  Featured
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='font-medium mb-4'>Content</h3>
            <ul className='space-y-3'>
              <li>
                <Link
                  href='/articles'
                  className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                >
                  Stories
                </Link>
              </li>
              <li>
                <Link
                  href='/live'
                  className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                >
                  Live Content
                </Link>
              </li>
              <li>
                <Link
                  href='/locations'
                  className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                >
                  Store Locations
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='font-medium mb-4'>Company</h3>
            <ul className='space-y-3'>
              <li>
                <Link
                  href='/about'
                  className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href='/contact'
                  className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href='/careers'
                  className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className='mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4'>
          <p className='text-sm text-muted-foreground'>
            © 2025 market&story. All rights reserved.
          </p>
          <div className='flex gap-6'>
            <Link
              href='/privacy'
              className='text-sm text-muted-foreground hover:text-foreground transition-colors'
            >
              Privacy
            </Link>
            <Link
              href='/terms'
              className='text-sm text-muted-foreground hover:text-foreground transition-colors'
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

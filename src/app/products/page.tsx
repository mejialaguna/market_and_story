import type { FC, JSX } from 'react';

import { MainLayout } from '@/components/mainLayout';
import { ProductWrapper } from '@/components/product-wrapper';

const page: FC = (): JSX.Element => {
  return (
    <MainLayout>
      <main className='flex-1 my-auto'>
        <div className='border-b border-border bg-secondary/30'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8'>
            <h1 className='font-serif text-4xl md:text-5xl font-semibold text-balance'>Shop All Products</h1>
            <p className='mt-2 text-muted-foreground'>Curated for quality, designed for life</p>
          </div>
        </div>

        <ProductWrapper />
      </main>
    </MainLayout>
  );
};

export default page;

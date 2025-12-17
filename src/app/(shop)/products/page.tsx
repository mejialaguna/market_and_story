import type { FC, JSX } from 'react';

import { ProductWrapper } from '@/components/product-wrapper';

export interface PageProps {
  searchParams: {
    categoryFilter?: string;
    sortBy?: string;
  };
}

const page: FC<PageProps> = async ({searchParams}): Promise<JSX.Element> => {
  const { categoryFilter, sortBy } = await searchParams;

  return (
    <main className='flex-1 my-auto'>
      <div className='border-b border-border bg-secondary/30'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <h1 className='font-serif text-4xl md:text-5xl font-semibold text-balance'>
            Shop All Products
          </h1>
          <p className='mt-2 text-muted-foreground'>
            Curated for quality, designed for life
          </p>
        </div>
      </div>

      <ProductWrapper categoryFilter={categoryFilter} sortBy={sortBy}/>
    </main>
  );
};

export default page;

'use client';
import { useState } from 'react';
import type { FC, JSX } from 'react';

import { ProductFilters } from './product-filters';

export const ProductWrapper: FC = (): JSX.Element => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('featured');

  return (
    <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='grid lg:grid-cols-4 gap-8'>
            <aside className='lg:col-span-1'>
              <ProductFilters
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedFeatures={selectedFeatures}
                setSelectedFeatures={setSelectedFeatures}
              />
            </aside>
            <div className='lg:col-span-3'>
              {/* <ProductGrid
                selectedCategories={selectedCategories}
                priceRange={priceRange}
                selectedFeatures={selectedFeatures}
                sortBy={sortBy}
                setSortBy={setSortBy}
              /> */}
            </div>
          </div>
        </div>
  );
};

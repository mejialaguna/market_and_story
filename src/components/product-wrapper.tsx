'use client';
import { useCallback, useMemo, useState } from 'react';
import type { FC, JSX } from 'react';

import { useRouter } from 'next/navigation';

import { ProductFilters } from './product-filters';
import { ProductGrid } from './product-grid';

interface ProductWrapperProps {
  categoryFilter: string;
}

export const ProductWrapper: FC<ProductWrapperProps> = ({
  categoryFilter,
}): JSX.Element => {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryFilter !== undefined ? [categoryFilter] : []
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('featured');
  const hasActiveFilters = useMemo(
    () =>
      selectedCategories.length > 0 ||
      priceRange[0] > 0 ||
      priceRange[1] < 1000 ||
      selectedFeatures.length > 0,
    [priceRange, selectedCategories.length, selectedFeatures.length]
  );

  const handleClearAll = useCallback((): void => {
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
    setSelectedFeatures([]);

    if (categoryFilter) {
      router.replace('/products');
    }
  }, [categoryFilter, router]);

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
          <ProductGrid
            selectedCategories={selectedCategories}
            priceRange={priceRange}
            selectedFeatures={selectedFeatures}
            sortBy={sortBy}
            setSortBy={setSortBy}
            handleClearAll={handleClearAll}
            hasActiveFilters={hasActiveFilters}
          />
        </div>
      </div>
    </div>
  );
};

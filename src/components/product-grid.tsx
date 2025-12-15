import { useMemo } from 'react';
import type { FC, JSX } from 'react';

import Link from 'next/link';

import { seedData } from '@/seed/seed';

import { Button } from './ui/button';
import { ProductCard } from './product-card';

interface ProductGridProps {
  selectedCategories: string[];
  priceRange: [number, number];
  selectedFeatures: string[];
  sortBy: string;
  setSortBy: (sort: string) => void;
  handleClearAll: () => void;
  hasActiveFilters: boolean;
}

export const ProductGrid: FC<ProductGridProps> = ({
  selectedCategories,
  priceRange,
  selectedFeatures,
  sortBy,
  setSortBy,
  handleClearAll,
  hasActiveFilters,
}): JSX.Element => {
  const filteredProducts = useMemo(() => {
    let filtered = seedData;

    // Filter by features
    if (selectedFeatures.length > 0) {
      filtered = filtered.filter((product) =>
        selectedFeatures.some((feature) => product?.features?.includes(feature))
      );
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    const sorted = [...filtered];

    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sorted.sort((a, b) => b.id - a.id);
        break;
      case 'featured':
        sorted.sort((a, b) => {
          const aFeatured = a.features?.length ? 1 : 0;
          const bFeatured = b.features?.length ? 1 : 0;
          return bFeatured - aFeatured;
        });
        break;
    }

    return sorted;
  }, [selectedCategories, priceRange, selectedFeatures, sortBy]);

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-muted-foreground'>
          {filteredProducts.length}{' '}
          {filteredProducts.length === 1 ? 'product' : 'products'}
        </p>
        <div className='flex gap-3.5'>
        {hasActiveFilters && (
        <Button
          variant='outline'
          size='sm'
          onClick={handleClearAll}
          className='bg-transparent'
        >
          Clear All Filters
        </Button>
      )}
      <select
          className='text-sm border border-border rounded-md px-3 py-1.5 bg-background cursor-pointer'
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value='featured'>Sort by: Featured</option>
          <option value='price-low'>Price: Low to High</option>
          <option value='price-high'>Price: High to Low</option>
          <option value='newest'>Newest</option>
        </select>
        </div>
        
      </div>

      {filteredProducts.length === 0 ? (
        <div className='text-center py-12'>
          <p className='text-muted-foreground'>
            No products match your filters. Try adjusting your selection.
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.slug}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

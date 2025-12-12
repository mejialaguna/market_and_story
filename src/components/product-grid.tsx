import { useMemo } from 'react';
import type { FC, JSX } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Heart } from 'lucide-react';

import { seedData } from '@/seed/seed';

import { Badge } from './ui/badge';
import { Card } from './ui/card';

interface ProductGridProps {
  selectedCategories: string[];
  priceRange: [number, number];
  selectedFeatures: string[];
  sortBy: string;
  setSortBy: (sort: string) => void;
}

const ProductGrid: FC<ProductGridProps> = ({
  selectedCategories,
  priceRange,
  selectedFeatures,
  sortBy,
  setSortBy,
}): JSX.Element => {
  const filteredProducts = useMemo(() => {
    let filtered = seedData;

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

    // Filter by features
    if (selectedFeatures.length > 0) {
      filtered = filtered.filter((product) =>
        selectedFeatures.some((feature) => product.features.includes(feature))
      );
    }

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
      default:
        // Keep default order
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

      {filteredProducts.length === 0 ? (
        <div className='text-center py-12'>
          <p className='text-muted-foreground'>
            No products match your filters. Try adjusting your selection.
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <Card className='group overflow-hidden border-border hover:shadow-lg transition-all duration-300'>
                <div className='relative aspect-square overflow-hidden bg-muted'>
                  <Image
                    src={
                      product.images[0] ||
                      '/placeholder.svg?height=400&width=400'
                    }
                    alt={product.name}
                    fill
                    className='object-cover group-hover:scale-105 transition-transform duration-300'
                  />
                  {product.badge && (
                    <Badge className='absolute top-3 left-3 bg-accent text-accent-foreground'>
                      {product.badge}
                    </Badge>
                  )}
                  <button className='absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100'>
                    <Heart className='h-4 w-4' />
                  </button>
                </div>
                <div className='p-4 space-y-2'>
                  <p className='text-xs text-muted-foreground uppercase tracking-wide'>
                    {product.category}
                  </p>
                  <h3 className='font-medium'>{product.name}</h3>
                  <p className='text-sm font-semibold'>${product.price}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;

import { useCallback } from 'react';
import type { FC, JSX } from 'react';

import { Card } from './ui/card';
import { Slider } from './ui/slider';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';

interface ProductFiltersProps {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedFeatures: string[];
  setSelectedFeatures: (features: string[]) => void;
}

export const ProductFilters: FC<ProductFiltersProps> = ({
  selectedCategories,
  setSelectedCategories,
  priceRange,
  setPriceRange,
  selectedFeatures,
  setSelectedFeatures,
}): JSX.Element => {
  const handleCategoryToggle = useCallback(
    (category: string): void => {
      if (selectedCategories.includes(category)) {
        setSelectedCategories(selectedCategories.filter((c) => c !== category));
      } else {
        setSelectedCategories([...selectedCategories, category]);
      }
    }, [selectedCategories, setSelectedCategories]);

  const handleFeatureToggle = useCallback(
    (feature: string): void => {
      if (selectedFeatures.includes(feature)) {
        setSelectedFeatures(selectedFeatures.filter((f) => f !== feature));
      } else {
        setSelectedFeatures([...selectedFeatures, feature]);
      }
    }, [selectedFeatures, setSelectedFeatures]);

  return (
    <div className='space-y-6'>
      <Card className='p-6'>
        <h3 className='font-semibold mb-4'>Categories</h3>
        <div className='space-y-3'>
          {[
            'Home & Living',
            'Fashion',
            'Technology',
            'Wellness',
            'Accessories',
          ].map((category) => (
            <div key={category} className='flex items-center space-x-2'>
              <Checkbox
                id={category.toLowerCase()}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryToggle(category)}
              />
              <Label
                htmlFor={category.toLowerCase()}
                className='text-sm font-normal cursor-pointer'
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </Card>

      <Card className='p-6'>
        <h3 className='font-semibold mb-4'>Price Range</h3>
        <div className='space-y-4'>
          <Slider
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            max={1000}
            step={10}
            className='cursor-pointer'
          />
          <div className='flex items-center justify-between text-sm text-muted-foreground'>
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </Card>

      <Card className='p-6'>
        <h3 className='font-semibold mb-4'>Features</h3>
        <div className='space-y-3'>
          {['Sustainable', 'Handmade', 'Limited Edition', 'New Arrival'].map(
            (feature) => (
              <div key={feature} className='flex items-center space-x-2'>
                <Checkbox
                  id={feature.toLowerCase().replace(' ', '-')}
                  checked={selectedFeatures.includes(feature)}
                  onCheckedChange={() => handleFeatureToggle(feature)}
                />
                <Label
                  htmlFor={feature.toLowerCase().replace(' ', '-')}
                  className='text-sm font-normal cursor-pointer'
                >
                  {feature}
                </Label>
              </div>
            )
          )}
        </div>
      </Card>
    </div>
  );
};

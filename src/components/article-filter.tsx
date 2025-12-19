'use client';

import { useEffect, useMemo, type FC, type JSX } from 'react';

import { useSearchParams } from 'next/navigation';

import { X } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Article } from '@/seed/articles.data';

const categories = [
  { id: 'lifestyle', label: 'Lifestyle', count: 45 },
  { id: 'design', label: 'Design', count: 38 },
  { id: 'fashion', label: 'Fashion', count: 29 },
  { id: 'wellness', label: 'Wellness', count: 22 },
  { id: 'technology', label: 'Technology', count: 18 },
  { id: 'culture', label: 'Culture', count: 31 },
];

const topics = [
  { id: 'sustainability', label: 'Sustainability' },
  { id: 'work-space', label: 'Work Space' },
  { id: 'productivity', label: 'Productivity' },
  { id: 'minimalism', label: 'Minimalism' },
];

interface ArticleFiltersProps {
  selectedCategories: string[];
  selectedTopics: string[];
  sortBy: string;
  onCategoriesChange: (categories: string[]) => void;
  onTopicsChange: (topics: string[]) => void;
  onSortChange: (sort: string) => void;
  onClearFilters: () => void;
  resultCount: number;
  articles: Article[];
}

export const ArticleFilters: FC<ArticleFiltersProps> = ({
  selectedCategories,
  selectedTopics,
  sortBy,
  onCategoriesChange,
  onTopicsChange,
  onSortChange,
  onClearFilters,
  resultCount,
  articles,
}): JSX.Element => {
  const searchParams = useSearchParams();
  const tag:string = useMemo(() => searchParams.get('tag') || '', [searchParams]);
  const hasActiveFilters = useMemo(
    () => selectedCategories.length > 0 || selectedTopics.length > 0,
    [selectedCategories.length, selectedTopics.length]
  );

  useEffect(() => {
    if (!tag) {
      return;
    }

    const isTopic = topics.some(topic => tag.includes(topic.id));

    if(isTopic){
      onTopicsChange([tag]);
    } else {
      onCategoriesChange([tag]);
    }
  }, [onCategoriesChange, onTopicsChange, tag]);

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between gap-2'>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className='w-[50%] pt-0 pb-0 pr-2 pl-2 h-9!'>
            <SelectValue placeholder='Sort by' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='newest'>Newest First</SelectItem>
            <SelectItem value='oldest'>Oldest First</SelectItem>
            <SelectItem value='popular'>Most Popular</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <div className='flex items-center justify-between bg-accent/10 rounded-lg border border-accent/20'>
            <Button
              variant='ghost'
              size='sm'
              onClick={onClearFilters}
              className='h-8 text-xs gap-1 pt-0 pb-0 pr-2 pl-2'
            >
              Clear {resultCount} results
              <X className='h-3 w-3' />
            </Button>
          </div>
        )}
      </div>

      <Card className='p-6 bg-card'>
        <h3 className='font-semibold mb-4'>Categories</h3>
        <div className='space-y-3'>
          {categories.map((category) => (
            <div
              key={category.id}
              className='flex items-center justify-between'
            >
              <div className='flex items-center space-x-2'>
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onCategoriesChange([...selectedCategories, category.id]);
                    } else {
                      onCategoriesChange(
                        selectedCategories.filter((c) => c !== category.id)
                      );
                    }
                  }}
                />
                <Label
                  htmlFor={category.id}
                  className='text-sm font-normal cursor-pointer hover:text-foreground transition-colors'
                >
                  {category.label}
                </Label>
              </div>
              {selectedCategories.includes(category.id) && (
                <span className='text-xs text-muted-foreground'>
                  {
                    articles.filter(
                      (article) => article?.category === category?.label
                    )?.length
                  }
                </span>
              )}
            </div>
          ))}
        </div>
      </Card>

      <Card className='p-6 bg-card'>
        <h3 className='font-semibold mb-4'>Topics</h3>
        <div className='space-y-3'>
          {topics.map((topic) => (
            <div key={topic.id} className='flex items-center space-x-2'>
              <Checkbox
                id={topic.id}
                checked={selectedTopics.includes(topic.id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onTopicsChange([...selectedTopics, topic.id]);
                  } else {
                    onTopicsChange(
                      selectedTopics.filter((t) => t !== topic.id)
                    );
                  }
                }}
              />
              <Label
                htmlFor={topic.id}
                className='text-sm font-normal cursor-pointer hover:text-foreground transition-colors'
              >
                {topic.label}
              </Label>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

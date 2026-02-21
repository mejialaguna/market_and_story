'use client';

import { useState, useCallback, useMemo, type FC, type JSX } from 'react';

import { ArticleFilters } from '@/components/article-filter';
import { ArticleGrid } from '@/components/article-grid';
import type { Article } from '@/lib/content-types';

interface ArticlesClientProps {
  articles: Article[];
}

export const ArticlesClient: FC<ArticlesClientProps> = ({ articles: allArticles }): JSX.Element => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('newest');

  const handleCategoriesChange = useCallback((categories: string[]) => {
    setSelectedCategories(categories);
  }, []);

  const handleTopicsChange = useCallback((topics: string[]) => {
    setSelectedTopics(topics);
  }, []);

  const handleSortChange = useCallback((sort: string) => {
    setSortBy(sort);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSelectedCategories([]);
    setSelectedTopics([]);
    setSortBy('newest');
  }, []);

  const filteredArticles = useMemo(() => {
    let filtered = [...allArticles];

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((article) => selectedCategories.includes(article.category.toLowerCase()));
    }

    // Filter by topics
    if (selectedTopics.length > 0) {
      filtered = filtered.filter((article) => article.tags?.some((tag) => selectedTopics.includes(tag.toLowerCase())));
    }

    // Sort articles
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
        break;
      case 'popular':
        // Sort by featured first, then by date
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) {return -1;}
          if (!a.featured && b.featured) {return 1;}
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        });
        break;
    }

    return filtered;
  }, [allArticles, selectedCategories, selectedTopics, sortBy]);

  return (
    <div className='flex min-h-screen flex-col'>
      <main className='flex-1'>
        <div className='border-b border-border bg-secondary/30'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8'>
            <h1 className='font-serif text-4xl md:text-5xl font-semibold text-balance'>Stories</h1>
            <p className='mt-2 text-muted-foreground'>Thoughtful perspectives on design, culture, and modern living</p>
          </div>
        </div>

        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='grid lg:grid-cols-4 gap-8'>
            <aside className='lg:col-span-1'>
              <ArticleFilters
                selectedCategories={selectedCategories}
                selectedTopics={selectedTopics}
                sortBy={sortBy}
                onCategoriesChange={handleCategoriesChange}
                onTopicsChange={handleTopicsChange}
                onSortChange={handleSortChange}
                onClearFilters={handleClearFilters}
                resultCount={filteredArticles.length}
                articles={filteredArticles}
              />
            </aside>
            <div className='lg:col-span-3'>
              <ArticleGrid articles={filteredArticles} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

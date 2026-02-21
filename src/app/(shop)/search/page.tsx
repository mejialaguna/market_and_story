'use client';

import { useState, useEffect, useCallback, type JSX } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Search, Star, Clock, ArrowRight } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SearchProduct {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  thumbnail: string;
  badge: string | null;
  similarity?: number;
}

interface SearchArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  heroImage: string;
  author: string;
  readTime: string;
  publishedAt: string;
  similarity?: number;
}

export default function SearchPage(): JSX.Element {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<SearchProduct[]>([]);
  const [articles, setArticles] = useState<SearchArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const search = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setProducts([]);
      setArticles([]);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await response.json();
      setProducts(data.products || []);
      setArticles(data.articles || []);
      setHasSearched(true);
    } catch {
      // Search failed silently
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      void search(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, search]);

  return (
    <main className='flex-1'>
      <div className='border-b border-border bg-secondary/30'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <h1 className='font-serif text-4xl md:text-5xl font-semibold text-balance mb-6'>
            Search
          </h1>
          <div className='relative max-w-2xl'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Search for products, articles, categories...'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className='pl-10 h-12 text-lg'
              autoFocus
            />
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {isLoading && (
          <div className='flex items-center gap-2 text-muted-foreground mb-6'>
            <div className='h-4 w-4 border-2 border-accent border-t-transparent rounded-full animate-spin' />
            Searching...
          </div>
        )}

        {hasSearched && !isLoading && products.length === 0 && articles.length === 0 && (
          <p className='text-muted-foreground text-center py-12'>
            No results found for &ldquo;{query}&rdquo;. Try a different search term.
          </p>
        )}

        {/* Products Results */}
        {products.length > 0 && (
          <section className='mb-12'>
            <h2 className='font-serif text-2xl font-semibold mb-6'>
              Products ({products.length})
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {products.map((product) => (
                <Link key={product.id} href={`/product/${product.slug}`}>
                  <Card className='group overflow-hidden border-border hover:shadow-lg transition-all h-full'>
                    <div className='relative aspect-square overflow-hidden bg-muted'>
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        className='object-cover group-hover:scale-105 transition-transform duration-300'
                      />
                      {product.badge && (
                        <Badge className='absolute top-2 left-2' variant='secondary'>
                          {product.badge}
                        </Badge>
                      )}
                    </div>
                    <div className='p-4 space-y-2'>
                      <p className='text-xs text-muted-foreground uppercase tracking-wider'>
                        {product.category}
                      </p>
                      <h3 className='font-medium text-balance group-hover:text-accent transition-colors'>
                        {product.title}
                      </h3>
                      <div className='flex items-center justify-between'>
                        <span className='font-semibold'>${product.price.toFixed(2)}</span>
                        <div className='flex items-center gap-1'>
                          <Star className='h-3 w-3 fill-accent text-accent' />
                          <span className='text-xs text-muted-foreground'>{product.rating}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Articles Results */}
        {articles.length > 0 && (
          <section>
            <h2 className='font-serif text-2xl font-semibold mb-6'>
              Stories ({articles.length})
            </h2>
            <div className='space-y-4'>
              {articles.map((article) => (
                <Link key={article.id} href={`/articles/${article.id}`}>
                  <Card className='group overflow-hidden border-border hover:shadow-md transition-all'>
                    <div className='grid md:grid-cols-[200px_1fr] gap-0'>
                      <div className='relative aspect-video md:aspect-auto md:min-h-[150px] overflow-hidden bg-muted'>
                        <Image
                          src={article.heroImage}
                          alt={article.title}
                          fill
                          className='object-cover group-hover:scale-105 transition-transform duration-300'
                        />
                      </div>
                      <div className='p-5 flex flex-col justify-between'>
                        <div className='space-y-2'>
                          <div className='flex items-center gap-2'>
                            <span className='text-xs font-medium text-accent uppercase tracking-wide'>
                              {article.category}
                            </span>
                            <span className='text-xs text-muted-foreground flex items-center gap-1'>
                              <Clock className='h-3 w-3' />
                              {article.readTime}
                            </span>
                          </div>
                          <h3 className='font-serif text-xl font-semibold text-balance group-hover:text-accent transition-colors'>
                            {article.title}
                          </h3>
                          <p className='text-sm text-muted-foreground line-clamp-2'>
                            {article.excerpt}
                          </p>
                        </div>
                        <div className='flex items-center justify-between mt-3'>
                          <span className='text-xs text-muted-foreground'>By {article.author}</span>
                          <span className='text-sm font-medium group-hover:text-accent transition-colors inline-flex items-center'>
                            Read More
                            <ArrowRight className='ml-1 h-3 w-3' />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

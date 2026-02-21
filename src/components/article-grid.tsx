import { type FC, type JSX } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Bookmark, Clock } from 'lucide-react';

import { Card } from '@/components/ui/card';
import type { Article } from '@/lib/content-types';

interface ArticleGridProps {
  articles: Article[];
}

export const ArticleGrid: FC<ArticleGridProps> = ({
  articles,
}): JSX.Element => {
  const featuredArticles = articles.filter((article) => article.featured);
  const regularArticles = articles.filter((article) => !article.featured);

  return (
    <div className='space-y-8'>
      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <div className='space-y-6'>
          {featuredArticles.map((article) => (
            <Link key={article.id} href={`/articles/${article.id}`}>
              <Card className='group overflow-hidden border-border hover:shadow-lg transition-all duration-300'>
                <div className='grid md:grid-cols-2 gap-0'>
                  <div className='relative aspect-video md:aspect-auto overflow-hidden bg-muted min-h-[300px]'>
                    <Image
                      src={article.heroImage}
                      alt={article.title}
                      fill
                      className='object-cover group-hover:scale-105 transition-transform duration-300'
                    />
                  </div>
                  <div className='p-6 md:p-8 flex flex-col justify-between'>
                    <div className='space-y-3'>
                      <span className='text-xs font-medium text-accent uppercase tracking-wide'>
                        {article.category}
                      </span>
                      <h2 className='font-serif text-2xl md:text-3xl font-semibold leading-tight text-balance'>
                        {article.title}
                      </h2>
                      <p className='text-muted-foreground leading-relaxed'>
                        {article.excerpt}
                      </p>
                    </div>

                    <div className='mt-6 flex items-center justify-between'>
                      <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 rounded-full bg-muted overflow-hidden'>
                          <Image
                            src={article.authorImage}
                            alt={article.author}
                            width={40}
                            height={40}
                            className='object-cover'
                          />
                        </div>
                        <div className='text-sm'>
                          <p className='font-medium'>{article.author}</p>
                          <div className='flex items-center gap-2 text-muted-foreground'>
                            <span>{article.publishedAt}</span>
                            <span>·</span>
                            <span className='flex items-center gap-1'>
                              <Clock className='h-3 w-3' />
                              {article.readTime}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Bookmark className='h-4 w-4 text-muted-foreground' />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Regular Articles Grid */}
      {regularArticles.length > 0 && (
        <div className='grid md:grid-cols-2 gap-6'>
          {regularArticles.map((article) => (
            <Link key={article.id} href={`/articles/${article.id}`}>
              <Card className='group overflow-hidden border-border hover:shadow-lg transition-all duration-300 h-full flex flex-col'>
                <div className='relative aspect-video overflow-hidden bg-muted'>
                  <Image
                    src={article.heroImage}
                    alt={article.title}
                    fill
                    className='object-cover group-hover:scale-105 transition-transform duration-300'
                  />
                </div>
                <div className='p-6 flex flex-col flex-1'>
                  <div className='space-y-3 flex-1'>
                    <span className='text-xs font-medium text-accent uppercase tracking-wide'>
                      {article.category}
                    </span>
                    <h3 className='font-serif text-xl font-semibold leading-tight text-balance'>
                      {article.title}
                    </h3>
                    <p className='text-sm text-muted-foreground leading-relaxed'>
                      {article.excerpt}
                    </p>
                  </div>

                  <div className='mt-4 flex items-center justify-between pt-4 border-t border-border'>
                    <div className='flex items-center gap-2'>
                      <div className='w-8 h-8 rounded-full bg-muted overflow-hidden'>
                        <Image
                          src={article?.authorImage}
                          alt={article.author}
                          width={32}
                          height={32}
                          className='object-cover'
                        />
                      </div>
                      <span className='text-sm font-medium'>
                        {article.author}
                      </span>
                    </div>
                    <span className='text-xs text-muted-foreground'>
                      {article.readTime}
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {articles.length === 0 && (
        <div className='text-center py-12'>
          <p className='text-muted-foreground'>
            No articles found matching your filters.
          </p>
        </div>
      )}
    </div>
  );
};

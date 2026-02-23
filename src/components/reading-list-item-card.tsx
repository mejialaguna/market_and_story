'use client';

import { useState, type FC, type JSX } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { X } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ReadingListArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  heroImage: string;
  author: string;
  readTime: string;
  publishedAt: string;
}

export const ReadingListItemCard: FC<{ article: ReadingListArticle }> = ({ article }): JSX.Element => {
  const router = useRouter();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async (): Promise<void> => {
    setIsRemoving(true);
    await fetch('/api/reading-list', {
      method: 'DELETE',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ articleId: article.id }),
    });
    router.refresh();
  };

  return (
    <Card className='overflow-hidden'>
      <div className='flex gap-4 p-4'>
        <Link href={`/articles/${article.id}`} className='shrink-0'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.heroImage}
            alt={article.title}
            className='h-24 w-32 rounded-lg object-cover'
          />
        </Link>
        <div className='flex-1 min-w-0 space-y-1'>
          <div className='flex items-start justify-between gap-2'>
            <div>
              <p className='text-xs text-accent font-medium uppercase tracking-wider'>
                {article.category}
              </p>
              <Link href={`/articles/${article.id}`}>
                <h3 className='font-medium text-sm line-clamp-1 hover:text-accent transition-colors'>
                  {article.title}
                </h3>
              </Link>
            </div>
            <Button
              variant='ghost'
              size='icon'
              className='shrink-0 h-8 w-8 text-muted-foreground hover:text-red-500'
              onClick={handleRemove}
              disabled={isRemoving}
            >
              <X className='h-4 w-4' />
            </Button>
          </div>
          <p className='text-xs text-muted-foreground line-clamp-2'>{article.excerpt}</p>
          <div className='flex items-center gap-3 text-xs text-muted-foreground'>
            <span>{article.author}</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

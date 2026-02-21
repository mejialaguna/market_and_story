'use client';

import { useState, useEffect, type FC, type JSX } from 'react';

import { Sparkles } from 'lucide-react';

interface ArticleSummaryProps {
  articleId: string;
}

export const ArticleSummary: FC<ArticleSummaryProps> = ({ articleId }): JSX.Element | null => {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`/api/articles/${articleId}/summary`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        setSummary(data.summary || null);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));

    return () => controller.abort();
  }, [articleId]);

  if (isLoading) {
    return (
      <div className='bg-accent/5 border border-accent/20 rounded-lg p-5 mb-8 animate-pulse'>
        <div className='flex items-center gap-2 mb-3'>
          <Sparkles className='h-4 w-4 text-accent' />
          <span className='text-sm font-medium text-accent'>AI Summary</span>
        </div>
        <div className='h-4 bg-accent/10 rounded w-3/4 mb-2' />
        <div className='h-4 bg-accent/10 rounded w-1/2' />
      </div>
    );
  }

  if (!summary) {return null;}

  return (
    <div className='bg-accent/5 border border-accent/20 rounded-lg p-5 mb-8'>
      <div className='flex items-center gap-2 mb-3'>
        <Sparkles className='h-4 w-4 text-accent' />
        <span className='text-sm font-medium text-accent'>TL;DR</span>
      </div>
      <p className='text-sm text-foreground/80 leading-relaxed'>{summary}</p>
    </div>
  );
};

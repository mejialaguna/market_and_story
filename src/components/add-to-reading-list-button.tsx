'use client';

import { useState, useEffect, type FC, type JSX } from 'react';

import { Bookmark } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface AddToReadingListButtonProps {
  articleId: string;
}

export const AddToReadingListButton: FC<AddToReadingListButtonProps> = ({ articleId }): JSX.Element => {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/reading-list', { signal: controller.signal })
      .then((res) => res.json())
      .then((items) => {
        if (Array.isArray(items)) {
          setIsSaved(items.some((item: { articleId: string }) => item.articleId === articleId));
        }
      })
      .catch(() => {});

    return () => controller.abort();
  }, [articleId]);

  const handleToggle = async (): Promise<void> => {
    setIsLoading(true);
    try {
      if (isSaved) {
        await fetch('/api/reading-list', {
          method: 'DELETE',
          // eslint-disable-next-line @typescript-eslint/naming-convention
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ articleId }),
        });
        setIsSaved(false);
      } else {
        const res = await fetch('/api/reading-list', {
          method: 'POST',
          // eslint-disable-next-line @typescript-eslint/naming-convention
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ articleId }),
        });
        if (res.ok || res.status === 409) {
          setIsSaved(true);
        }
      }
    } catch {
      // silently fail
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant='ghost'
      size='icon'
      onClick={handleToggle}
      disabled={isLoading}
      aria-label={isSaved ? 'Remove from reading list' : 'Save to reading list'}
    >
      <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-accent text-accent' : ''}`} />
    </Button>
  );
};

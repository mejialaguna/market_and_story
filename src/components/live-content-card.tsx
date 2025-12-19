'use client';

import { useCallback, useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Heart, MessageCircle, Share2, ShoppingBag } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface LiveContent {
  id: number;
  type: 'video' | 'image';
  videoUrl?: string;
  imageUrl?: string;
  title: string;
  author: string;
  authorAvatar: string;
  likes: number;
  comments: number;
  tags: string[];
  productLink: string;
  description: string;
}

interface LiveContentCardProps {
  content: LiveContent;
  isActive: boolean;
}

export function LiveContentCard({
  content,
  isActive,
}: LiveContentCardProps): JSX.Element {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(content.likes);
  const [showVideo, setShowVideo] = useState(false);

  const handleLike = useCallback((): void => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  }, [isLiked, likeCount]);

  useEffect(() => {
    if (isActive) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowVideo(false);
      const t = setTimeout(() => setShowVideo(true), 250);
      return () => clearTimeout(t);
    } else {
      setShowVideo(false);
    }
  }, [isActive]);

  return (
    <div className='relative w-full h-full'>
      {content.type === 'video' && content.videoUrl && (
        <div className='relative w-full h-full bg-black dimelo-video'>
          <iframe
            src={`https://www.youtube.com/embed/${content.videoUrl}?autoplay=${
          isActive ? 1 : 0
        }&loop=1&playlist=${
          content.videoUrl
        }&controls=0&modestbranding=1&rel=0&fs=0&iv_load_policy=3`}
            className={cn(
              'absolute inset-0 w-full h-full transition-opacity duration-300',
              showVideo ? 'opacity-100' : 'opacity-0'
            )}
            allow='autoplay; encrypted-media'
            allowFullScreen
          />
          <div className='absolute inset-0 z-20 flex flex-col justify-end p-6 pb-24 text-white'>
            <div className='flex items-start justify-between gap-4'>
              <div className='flex-1 space-y-4'>
                <div className='flex items-center gap-3'>
                  <div className='relative w-10 h-10 rounded-full overflow-hidden border-2 border-white'>
                    <Image
                      src={content.authorAvatar || '/placeholder.svg'}
                      alt={content.author}
                      fill
                      className='object-cover'
                    />
                  </div>
                  <div>
                    <p className='font-medium text-sm'>{content.author}</p>
                    <p className='text-xs text-white/80'>Creator</p>
                  </div>
                </div>

                <div className='space-y-2'>
                  <h2 className='text-2xl font-serif font-semibold leading-tight text-balance'>
                    {content.title}
                  </h2>
                  <p className='text-sm text-white/90 leading-relaxed max-w-md'>
                    {content.description}
                  </p>
                </div>

                <div className='flex flex-wrap gap-2'>
                  {content.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant='secondary'
                      className='bg-white/20 hover:bg-white/30 text-white border-0'
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button
                  variant='secondary'
                  className='bg-white text-black hover:bg-white/90 font-medium'
                  asChild
                >
                  <Link href={content.productLink}>
                    <ShoppingBag className='mr-2 h-4 w-4' />
                    View Product
                  </Link>
                </Button>
              </div>

              <div className='flex flex-col items-center gap-6'>
                <button
                  onClick={handleLike}
                  className='flex flex-col items-center gap-1 transition-transform active:scale-95'
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                      isLiked ? 'bg-red-500' : 'bg-white/20 backdrop-blur-sm'
                    }`}
                  >
                    <Heart
                      className={`h-6 w-6 ${isLiked ? 'fill-white' : ''}`}
                    />
                  </div>
                  <span className='text-xs font-medium'>
                    {likeCount.toLocaleString()}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { type FC, type JSX } from 'react';

import Image from 'next/image';

import { Star } from 'lucide-react';

import { Card } from '@/components/ui/card';

const mockReviews = [
  {
    id: '1',
    userName: 'Sarah M.',
    userAvatar: '/author-sarah.jpg',
    rating: 5,
    date: '2024-01-15',
    comment: 'Absolutely love this vase! The craftsmanship is exceptional and it looks even better in person.',
    verified: true,
  },
  {
    id: '2',
    userName: 'Marcus T.',
    userAvatar: '/author-marcus.jpg',
    rating: 4,
    date: '2024-01-10',
    comment: 'Beautiful piece. Slightly smaller than I expected but still very nice quality.',
    verified: true,
  },
  {
    id: '3',
    userName: 'Elena R.',
    userAvatar: '/author-elena.jpg',
    rating: 5,
    date: '2024-01-05',
    comment: 'The glaze finish is stunning. Perfect addition to my living room. Highly recommend!',
    verified: true,
  },
];

interface ReviewListProps{
  slug: string;
}

export const ReviewList:FC<ReviewListProps> = ({ slug }): JSX.Element => {
  return (
    <div className='space-y-4'>
      {mockReviews.map((review) => (
        <Card key={review.id} className='p-6'>
          <div className='flex gap-4'>
            <div className='relative w-12 h-12 rounded-full overflow-hidden bg-muted shrink-0'>
              <Image
                src='https://res.cloudinary.com/jlml/image/upload/v1765904013/market_and_story/avatar.webp'
                alt={review.userName}
                width={48}
                height={48}
                className='w-full h-full object-cover'
              />
            </div>

            <div className='flex-1'>
              <div className='flex items-center justify-between mb-2'>
                <div>
                  <p className='font-semibold'>{review.userName}</p>
                  {review.verified && <p className='text-xs text-muted-foreground'>Verified Purchase</p>}
                </div>
                <p className='text-sm text-muted-foreground'>
                  {new Date(review.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>

              <div className='flex items-center gap-1 mb-3'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    // eslint-disable-next-line react/no-array-index-key
                    key={i}
                    className={`h-4 w-4 ${i < review.rating ? 'fill-accent text-accent' : 'fill-muted text-muted'}`}
                  />
                ))}
              </div>

              <p className='text-muted-foreground leading-relaxed'>{review.comment}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

'use client';

import {
  useActionState,
  useCallback,
  useState,
  type FC,
  type JSX,
} from 'react';

import { Star } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import type { TReviewSchema } from '@/lib/content-types';
import { reviewSchema } from '@/lib/content-types';

import { Textarea } from './ui/textarea';
import { Input } from './ui/input';

interface ReviewFormProps {
  productId: number;
  productSlug: string;
}

export const ReviewForm: FC<ReviewFormProps> = ({
  productId,
  productSlug,
}): JSX.Element => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');

  const {
    register,
    trigger,
    getValues,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<TReviewSchema>({
    resolver: zodResolver(reviewSchema),
  });

  const handleAction = useCallback(async (): Promise<void> => {
    const result = await trigger();

    if (!result) {
      return;
    }

    const { comment, rating }: TReviewSchema = getValues();

    await new Promise((resolve) => setTimeout(resolve, 3000));

  }, [getValues, trigger]);

  const [_, dispatch] = useActionState(handleAction, undefined);

  return (
    <Card className='p-6 sticky top-4'>
      <h3 className='font-serif text-xl font-semibold mb-6'>Write a Review</h3>

      <form action={dispatch} className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='rating'>Your Rating</Label>
          <Input
            id='rating'
            type='hidden'
            className='hidden'
            {...register('rating', {
              valueAsNumber: true,
            })}
          />
          {errors.rating && (
            <p className='text-red-500 text-xs'>{errors.rating.message}</p>
          )}
          <div className='flex gap-1'>
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type='button'
                onClick={() => {
                  clearErrors('rating');
                  setErrorMessage('');
                  setRating(value);
                  setValue('rating', value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                onMouseEnter={() => setHoveredRating(value)}
                onMouseLeave={() => setHoveredRating(0)}
                className='transition-transform hover:scale-110'
              >
                <Star
                  className={`h-6 w-6 ${
                    value <= (hoveredRating || rating)
                      ? 'fill-accent text-accent'
                      : 'fill-muted text-muted'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='comment'>Your Review</Label>
          <Textarea
            id='comment'
            placeholder='Share your thoughts about this product...'
            value={comment}
            required
            rows={5}
            {...register('comment', {
              onChange: (e) => {
                clearErrors('comment');
                setErrorMessage('');
                setComment(e.target.value);
              },
            })}
          />

          {errors.comment && (
            <p className='text-red-500 text-xs'>{errors.comment.message}</p>
          )}
        </div>

        <SubmitReview rating={rating} comment={comment} />
      </form>
    </Card>
  );
};


interface SubmitReviewProps{
  rating: number;
  comment: string;
}

const SubmitReview:FC<SubmitReviewProps> = ({rating, comment}):JSX.Element => {
  const { pending } = useFormStatus();

  return (
    <Button
    type='submit'
    className='w-full'
      disabled={pending || rating === 0 || !comment}
    >
      {pending ? (
        <div className='thinking-dots'>
          Submitting
          <span className='ml-1' />
          <span />
          <span />
        </div>
      ) : 'Submit Review'}
    </Button>
  );
};

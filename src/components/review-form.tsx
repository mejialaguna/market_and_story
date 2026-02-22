'use client';

import {
  useCallback,
  useState,
  type FC,
  type JSX,
} from 'react';

import { Star } from 'lucide-react';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    trigger,
    getValues,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<TReviewSchema>({
    resolver: zodResolver(reviewSchema),
  });

  const handleSubmit = useCallback(async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const result = await trigger();

    if (!result) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const { comment: reviewComment, rating: reviewRating }: TReviewSchema = getValues();

      const response = await fetch('/api/reviews', {
        method: 'POST',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          productSlug,
          userName: 'Guest',
          rating: reviewRating,
          comment: reviewComment,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      setSubmitSuccess(true);
      setRating(0);
      setComment('');
      reset();
    } catch {
      setSubmitError('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [getValues, productId, productSlug, reset, trigger]);

  if (submitSuccess) {
    return (
      <Card className='p-6 sticky top-4'>
        <div className='text-center space-y-3'>
          <h3 className='font-serif text-xl font-semibold'>Thank you!</h3>
          <p className='text-sm text-muted-foreground'>Your review has been submitted successfully.</p>
          <Button
            variant='outline'
            onClick={() => setSubmitSuccess(false)}
          >
            Write Another Review
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className='p-6 sticky top-4'>
      <h3 className='font-serif text-xl font-semibold mb-6'>Write a Review</h3>

      <form onSubmit={handleSubmit} className='space-y-4'>
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
                  setSubmitError('');
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
                setSubmitError('');
                setComment(e.target.value);
              },
            })}
          />

          {errors.comment && (
            <p className='text-red-500 text-xs'>{errors.comment.message}</p>
          )}
        </div>

        {submitError && (
          <p className='text-red-500 text-sm'>{submitError}</p>
        )}

        <Button
          type='submit'
          className='w-full'
          disabled={isSubmitting || rating === 0 || !comment}
        >
          {isSubmitting ? (
            <div className='thinking-dots'>
              Submitting
              <span className='ml-1' />
              <span />
              <span />
            </div>
          ) : 'Submit Review'}
        </Button>

      </form>
    </Card>
  );
};

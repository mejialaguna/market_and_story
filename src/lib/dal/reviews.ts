import 'server-only';

import { prisma } from '@/lib/db';
import type { ProducReviews } from '@/lib/content-types';

export async function getReviewsByProductId(productId: number): Promise<ProducReviews[]> {
  const reviews = await prisma.review.findMany({
    where: { productId },
    orderBy: { createdAt: 'desc' },
  });

  return reviews.map((r) => ({
    id: r.id,
    productId: r.productId,
    productSlug: r.productSlug,
    userName: r.userName,
    rating: r.rating,
    date: r.date,
    comment: r.comment,
    verified: r.verified,
  }));
}

export async function createReview(data: {
  productId: number;
  productSlug: string;
  userName: string;
  rating: number;
  comment: string;
}): Promise<ProducReviews> {
  const review = await prisma.review.create({
    data: {
      productId: data.productId,
      productSlug: data.productSlug,
      userName: data.userName,
      rating: data.rating,
      date: new Date().toISOString().split('T')[0],
      comment: data.comment,
      verified: false,
    },
  });

  return {
    id: review.id,
    productId: review.productId,
    productSlug: review.productSlug,
    userName: review.userName,
    rating: review.rating,
    date: review.date,
    comment: review.comment,
    verified: review.verified,
  };
}

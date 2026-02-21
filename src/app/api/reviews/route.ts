import { NextResponse } from 'next/server';

import { prisma } from '@/lib/db';
import { reviewSchema } from '@/lib/content-types';

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();

    const { rating, comment } = reviewSchema.parse(body);
    const { productId, productSlug, userName } = body;

    if (!productId || !productSlug) {
      return NextResponse.json(
        { error: 'productId and productSlug are required' },
        { status: 400 }
      );
    }

    const review = await prisma.review.create({
      data: {
        productId: Number(productId),
        productSlug,
        userName: userName || 'Anonymous',
        rating,
        date: new Date().toISOString().split('T')[0],
        comment,
        verified: false,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error },
        { status: 400 }
      );
    }

    // eslint-disable-next-line no-console
    console.error('Error creating review:', error);
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    );
  }
}

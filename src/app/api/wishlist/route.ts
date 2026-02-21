import { NextResponse } from 'next/server';

import { prisma } from '@/lib/db';

const DEMO_USER_ID = 'demo-user';

async function ensureDemoUser(): Promise<void> {
  await prisma.user.upsert({
    where: { id: DEMO_USER_ID },
    update: {},
    create: { id: DEMO_USER_ID, name: 'Guest', email: 'demo@marketandstory.com' },
  });
}

export async function GET(): Promise<Response> {
  const items = await prisma.wishlistItem.findMany({
    include: {
      product: {
        select: {
          id: true,
          title: true,
          slug: true,
          price: true,
          thumbnail: true,
          rating: true,
          badge: true,
          category: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(items);
}

export async function POST(request: Request): Promise<Response> {
  const { productId } = await request.json();

  await ensureDemoUser();

  const existing = await prisma.wishlistItem.findFirst({
    where: { productId },
  });

  if (existing) {
    return NextResponse.json({ error: 'Already in wishlist' }, { status: 409 });
  }

  const item = await prisma.wishlistItem.create({
    data: {
      userId: DEMO_USER_ID,
      productId,
    },
  });

  return NextResponse.json(item, { status: 201 });
}

export async function DELETE(request: Request): Promise<Response> {
  const { productId } = await request.json();

  await prisma.wishlistItem.deleteMany({
    where: { productId },
  });

  return NextResponse.json({ success: true });
}

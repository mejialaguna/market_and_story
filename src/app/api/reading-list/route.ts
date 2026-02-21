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
  const items = await prisma.readingListItem.findMany({
    include: {
      article: {
        select: {
          id: true,
          title: true,
          excerpt: true,
          category: true,
          heroImage: true,
          author: true,
          readTime: true,
          publishedAt: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(items);
}

export async function POST(request: Request): Promise<Response> {
  const { articleId } = await request.json();

  await ensureDemoUser();

  const existing = await prisma.readingListItem.findFirst({
    where: { articleId },
  });

  if (existing) {
    return NextResponse.json({ error: 'Already in reading list' }, { status: 409 });
  }

  const item = await prisma.readingListItem.create({
    data: {
      userId: DEMO_USER_ID,
      articleId,
    },
  });

  return NextResponse.json(item, { status: 201 });
}

export async function DELETE(request: Request): Promise<Response> {
  const { articleId } = await request.json();

  await prisma.readingListItem.deleteMany({
    where: { articleId },
  });

  return NextResponse.json({ success: true });
}

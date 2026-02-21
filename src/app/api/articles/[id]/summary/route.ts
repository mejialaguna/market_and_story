import { NextResponse } from 'next/server';

import { prisma } from '@/lib/db';
import { generateArticleSummary } from '@/lib/ai/seo';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  const { id } = await params;

  const article = await prisma.article.findUnique({
    where: { id },
    select: {
      title: true,
      excerpt: true,
      summary: true,
      contentSections: true,
    },
  });

  if (!article) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }

  // Return cached summary if available
  if (article.summary) {
    return NextResponse.json({ summary: article.summary });
  }

  try {
    const summary = await generateArticleSummary({
      title: article.title,
      excerpt: article.excerpt,
      contentSections: article.contentSections as Array<{ type: string; content?: string }>,
    });

    // Cache the summary
    await prisma.article.update({
      where: { id },
      data: { summary },
    });

    return NextResponse.json({ summary });
  } catch {
    return NextResponse.json(
      { summary: article.excerpt },
    );
  }
}

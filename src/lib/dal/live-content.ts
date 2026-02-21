import 'server-only';

import { prisma } from '@/lib/db';
import type { LiveContentItem } from '@/lib/content-types';

export async function getAllLiveContent(): Promise<LiveContentItem[]> {
  const items = await prisma.liveContent.findMany({
    orderBy: { id: 'asc' },
  });

  return items.map((item) => ({
    id: item.id,
    type: item.type as LiveContentItem['type'],
    videoUrl: item.videoUrl,
    title: item.title,
    author: item.author,
    authorAvatar: item.authorAvatar,
    likes: item.likes,
    comments: item.comments,
    tags: item.tags,
    productLink: item.productLink,
    description: item.description,
  }));
}

import { Suspense, type JSX } from 'react';

import { getAllArticles } from '@/lib/dal/articles';

import { ArticlesClient } from './articles-client';

export default async function ArticlePage(): Promise<JSX.Element> {
  const articles = await getAllArticles();

  return (
    <Suspense>
      <ArticlesClient articles={articles} />
    </Suspense>
  );
}

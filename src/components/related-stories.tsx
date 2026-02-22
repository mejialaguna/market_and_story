import Link from 'next/link';
import Image from 'next/image';

import { BookOpen, Sparkles } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { getRelatedArticlesForProduct } from '@/lib/ai/matching';

interface RelatedStoriesProps {
  productSlug: string;
}

export async function RelatedStories({ productSlug }: RelatedStoriesProps): Promise<React.JSX.Element | null> {
  const articles = await getRelatedArticlesForProduct(productSlug, 3);

  if (articles.length === 0) {return null;}

  return (
    <div className='mt-12'>
      <div className='flex items-center gap-2 mb-6'>
        <BookOpen className='h-5 w-5 text-accent' />
        <h3 className='font-serif text-2xl font-semibold'>Related Stories</h3>
        <Sparkles className='h-4 w-4 text-accent ml-1' />
      </div>
      <div className='grid sm:grid-cols-3 gap-6'>
        {articles.map((article) => (
          <Link key={article.id} href={`/articles/${article.id}`}>
            <Card className='group overflow-hidden hover:shadow-md transition-all h-full'>
              <div className='aspect-video relative overflow-hidden'>
                <Image
                  src={article.heroImage}
                  alt={article.title}
                  fill
                  className='object-cover transition-transform group-hover:scale-105'
                />
              </div>
              <div className='p-4 space-y-2'>
                <p className='text-xs text-accent font-medium uppercase tracking-wider'>
                  {article.category}
                </p>
                <h4 className='font-medium text-sm line-clamp-2 group-hover:text-accent transition-colors'>
                  {article.title}
                </h4>
                <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                  <span>{article.author}</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

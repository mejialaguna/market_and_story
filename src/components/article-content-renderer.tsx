import { type FC, type JSX } from 'react';

import { InlineProductMention } from '@/components/inline-product-mention';
import { InlineProductCard } from '@/components/inline-product-card';
import type { ArticleSection } from '@/seed/articles.data';

interface ArticleContentRendererProps {
  sections: ArticleSection[]
}

export const ArticleContentRenderer:FC<ArticleContentRendererProps> = ({ sections }):JSX.Element => {
  return (
    <div
      className='prose prose-lg dark:prose-invert max-w-none
      prose-headings:font-serif prose-headings:font-semibold prose-headings:text-balance
      prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
      prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
      prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
      prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:pl-6 prose-blockquote:italic
      prose-a:text-accent prose-a:no-underline hover:prose-a:underline
      prose-em:text-foreground'
    >
      {sections.map((section) => {
        switch (section.type) {
          case 'heading':
            const HeadingTag = `h${section.level}` as keyof JSX.IntrinsicElements;
            return <HeadingTag className='' key={section.content}>{section.content}</HeadingTag>;

          case 'paragraph':
            // eslint-disable-next-line @typescript-eslint/naming-convention
            return <p key={section.content} dangerouslySetInnerHTML={{ __html: section.content || '' }} />;

          case 'blockquote':
            return <blockquote key={section.content}>{section.content}</blockquote>;

          case 'product-mention':
            return section.inline && section.productId ? (
              <InlineProductMention key={section.content} productId={section.productId}>
                {section.content || ''}
              </InlineProductMention>
            ) : null;

          case 'product-card':
            return section.productId ? <InlineProductCard key={`${section.type}-${section.productId}`} productId={section.productId} /> : null;

          default:
            return null;
        }
      })}
    </div>
  );
};

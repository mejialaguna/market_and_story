/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/no-array-index-key */
import { type FC, type JSX } from 'react';

import { InlineProductCard } from '@/components/inline-product-card';
import type { ArticleSection } from '@/seed/articles.data';

interface ArticleContentRendererProps {
  sections: ArticleSection[]
}

export const ArticleContentRenderer:FC<ArticleContentRendererProps> = ({ sections }):JSX.Element => {
  return (
    <article className='max-w-none'>
      {sections.map((section, index) => {
        switch (section.type) {
          case 'heading':
            const HeadingTag = `h${section.level}` as keyof JSX.IntrinsicElements;
            return (
              <HeadingTag 
                className='font-serif font-bold text-foreground tracking-tight text-balance scroll-mt-20
                  text-[32px] leading-[1.2] mb-5 first:mt-0'
                key={`heading-${index}`}
              >
                {section.content}
              </HeadingTag>
            );

          case 'paragraph':
            return (
              <p 
                className='text-[18px] leading-[1.75] text-foreground/80 mb-7 font-normal'
                key={`paragraph-${index}`}
                dangerouslySetInnerHTML={{ __html: section.content || '' }} 
              />
            );

          case 'blockquote':
            return (
              <blockquote 
                className='relative my-12 py-6 px-8 border-l-[5px] border-accent bg-accent/5 rounded-r-md
                  text-[20px] leading-[1.6] font-serif italic text-foreground/90
                  before:content-["“"] before:absolute before:text-6xl before:text-accent/30 before:-top-2 before:left-2'
                key={`blockquote-${index}`}
              >
                {section.content}
              </blockquote>
            );
          case 'product-card':
            return section.productId ? (
              <div key={`card-${section.productId}-${index}`} className='my-12'>
                <InlineProductCard productId={section.productId} />
              </div>
            ) : null;

          default:
            return null;
        }
      })}
    </article>
  );
};

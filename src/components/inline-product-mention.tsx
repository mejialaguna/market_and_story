import { type FC, type JSX } from 'react';

import Link from 'next/link';

import { seedData } from '@/seed/seed';

interface InlineProductMentionProps {
  productId: number
  children: string
}

export const InlineProductMention:FC<InlineProductMentionProps> = ({ productId, children }): JSX.Element => {
  const product = seedData.find((p) => p.id === productId);

  if (!product) {return <span>{children}</span>;}

  return (
    <Link
      href={`/product/${product.slug}`}
      className='text-accent underline decoration-accent/30 hover:decoration-accent transition-colors font-medium'
      title={`${product.title} - $${product.price}`}
    >
      {children}
    </Link>
  );
};

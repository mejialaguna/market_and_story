'use client';

import { type FC, type JSX } from 'react';

import { Heart } from 'lucide-react';

import { Button } from './ui/button';

export const LikesComponent: FC = (): JSX.Element => {
  return (
    <Button
      variant='secondary'
      size='icon'
      className='absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity'
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      <Heart className='h-4 w-4' />
    </Button>
  );
};

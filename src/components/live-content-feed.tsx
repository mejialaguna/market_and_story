'use client';

import type React from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';

import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';

import { LiveContentCard } from '@/components/live-content-card';
import { Button } from '@/components/ui/button';
import { LIVE_CONTENT } from '@/seed/live.data.content';

export function LiveContentFeed():JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [_, setDirection] = useState<'up' | 'down'>('down');
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);
  const touchEndY = useRef<number>(0);
  const isScrolling = useRef(false);

  const handleNext = useCallback(():void => {
    if (currentIndex < LIVE_CONTENT.length - 1 && !isScrolling.current) {
      isScrolling.current = true;
      setDirection('down');
      setCurrentIndex((prev) => prev + 1);
      setTimeout(() => {
        isScrolling.current = false;
      }, 500);
    }
  }, [currentIndex]);

  const handlePrevious = useCallback(():void => {
    if (currentIndex > 0 && !isScrolling.current) {
      isScrolling.current = true;
      setDirection('up');
      setCurrentIndex((prev) => prev - 1);
      setTimeout(() => {
        isScrolling.current = false;
      }, 500);
    }
  }, [currentIndex]);

  const handleTouchStart = useCallback((e: React.TouchEvent):void => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent):void => {
    touchEndY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(():void => {
    const swipeDistance = touchStartY.current - touchEndY.current;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        handleNext();
      } else {
        handlePrevious();
      }
    }
  }, [handleNext, handlePrevious]);

  const handleWheel = useCallback(
    (e: WheelEvent):void => {
      e.preventDefault();
      if (Math.abs(e.deltaY) > 10) {
        if (e.deltaY > 0) {
          handleNext();
        } else {
          handlePrevious();
        }
      }
    },
    [handleNext, handlePrevious],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [handleWheel]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent):void => {
      if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrevious]);

  return (
    <div
      ref={containerRef}
      className='fixed inset-0 bg-black overflow-hidden'
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className='absolute top-4 left-4 z-50'>
        <Button variant='ghost' size='icon' className='bg-black/50 hover:bg-black/70 text-white' asChild>
          <Link href='/'>
            <ArrowLeft className='h-5 w-5' />
            <span className='sr-only'>Back to home</span>
          </Link>
        </Button>
      </div>

      <div className='absolute top-4 right-4 z-50 flex items-center gap-2'>
        <div className='bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium'>
          {currentIndex + 1} / {LIVE_CONTENT.length}
        </div>
      </div>

      <div className='relative w-full h-full'>
        {LIVE_CONTENT.map((content, index) => (
          <div
            key={content.id}
            className='absolute inset-0 transition-transform duration-500 ease-out'
            style={{
              transform:
                index === currentIndex
                  ? 'translateY(0%)'
                  : index < currentIndex
                    ? 'translateY(-100%)'
                    : 'translateY(100%)',
              opacity: index === currentIndex ? 1 : 0,
            }}
          >
            <LiveContentCard content={content} isActive={index === currentIndex} />
          </div>
        ))}
      </div>

      <div className='absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex gap-1.5'>
        {LIVE_CONTENT.map((content, index) => (
          <button
            key={content.id}
            onClick={() => {
              if (!isScrolling.current) {
                isScrolling.current = true;
                setDirection(index > currentIndex ? 'down' : 'up');
                setCurrentIndex(index);
                setTimeout(() => {
                  isScrolling.current = false;
                }, 500);
              }
            }}
            className={`h-1.5 rounded-full transition-all ${
              index === currentIndex ? 'w-8 bg-white' : 'w-1.5 bg-white/50'
            }`}
            aria-label={`Go to content ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* eslint-disable max-len */
/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useRef, useEffect, type FC, type JSX } from 'react';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { MessageCircle, X, Send, Bot, User, Star, Clock } from 'lucide-react';

import { useCart } from '@/components/providers/cart-provider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ChatProduct {
  title: string;
  slug: string;
  price: number;
  rating?: number;
  thumbnail?: string;
  description?: string;
  brand?: string;
  category?: string;
  quantity?: number;
}

function getMessageText(parts: Array<{ type: string; text?: string }>): string {
  return parts
    .filter((part) => part.type === 'text')
    .map((part) => part.text ?? '')
    .join('');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getProductsFromParts(parts: any[]): ChatProduct[] {
  const products: ChatProduct[] = [];
  for (const part of parts) {
    const isSearchOrDetails =
      part.type === 'tool-searchProducts' ||
      part.type === 'tool-getProductDetails' ||
      part.type === 'tool-getTrendingProducts' ||
      (part.type === 'dynamic-tool' && (part.toolName === 'searchProducts' || part.toolName === 'getProductDetails' || part.toolName === 'getTrendingProducts'));
    if (!isSearchOrDetails || part.state !== 'output-available') {continue;}

    const output = part.output;
    if (Array.isArray(output)) {
      for (const p of output) {
        if (p.title && p.slug) {products.push(p);}
      }
    } else if (output?.title && output?.slug) {
      products.push(output);
    }
  }
  return products;
}

const ProductCards: FC<{ products: ChatProduct[] }> = ({ products }): JSX.Element | null => {
  if (products.length === 0) {return null;}
  return (
    <div className='space-y-2'>
      {products.map((product) => (
        <a
          key={product.slug}
          href={`/product/${product.slug}`}
          target='_blank'
          rel='noopener noreferrer'
          className='block rounded-lg border border-border bg-background overflow-hidden hover:shadow-md transition-shadow'
        >
          {product.thumbnail && (
            <div className='aspect-[16/9] bg-muted'>
              <img
                src={product.thumbnail}
                alt={product.title}
                className='w-full h-full object-cover'
              />
            </div>
          )}
          <div className='p-2.5 space-y-1'>
            {product.category && (
              <p className='text-[10px] uppercase tracking-wider text-muted-foreground'>{product.category}</p>
            )}
            <p className='text-xs font-semibold leading-tight'>{product.title}</p>
            {product.brand && (
              <p className='text-[10px] text-muted-foreground'>by {product.brand}</p>
            )}
            {product.description && (
              <p className='text-[11px] text-muted-foreground leading-snug line-clamp-3'>{product.description}</p>
            )}
            <div className='flex items-center gap-2 pt-0.5'>
              <span className='text-xs font-semibold'>${product.price.toFixed(2)}</span>
              {product.rating !== undefined && (
                <span className='flex items-center gap-0.5 text-[10px] text-muted-foreground'>
                  <Star className='h-2.5 w-2.5 fill-accent text-accent' />
                  {product.rating}
                </span>
              )}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getCartItemsFromParts(parts: any[]): ChatProduct[] {
  const items: ChatProduct[] = [];
  for (const part of parts) {
    const isCart =
      part.type === 'tool-getCartItems' ||
      (part.type === 'dynamic-tool' && part.toolName === 'getCartItems');
    if (!isCart || part.state !== 'output-available') {continue;}

    const output = part.output;
    if (Array.isArray(output)) {
      for (const p of output) {
        if (p.title && p.slug) {items.push(p);}
      }
    }
  }
  return items;
}

const CartCards: FC<{ items: ChatProduct[] }> = ({ items }): JSX.Element | null => {
  if (items.length === 0) {return null;}
  const total = items.reduce((sum, i) => sum + i.price * (i.quantity ?? 1), 0);
  return (
    <div className='rounded-lg border border-border bg-background overflow-hidden'>
      {items.map((item) => (
        <a
          key={item.slug}
          href={`/product/${item.slug}`}
          target='_blank'
          rel='noopener noreferrer'
          className='flex gap-3 p-3 border-b border-border last:border-b-0 hover:bg-secondary/30 transition-colors'
        >
          {item.thumbnail && (
            <div className='h-14 w-14 rounded-md bg-muted overflow-hidden shrink-0'>
              <img src={item.thumbnail} alt={item.title} className='h-full w-full object-cover' />
            </div>
          )}
          <div className='flex-1 min-w-0'>
            <p className='text-xs font-semibold leading-tight line-clamp-2'>{item.title}</p>
            {item.brand && (
              <p className='text-[10px] text-muted-foreground mt-0.5'>{item.brand}</p>
            )}
            <div className='flex items-center gap-2 mt-1'>
              <span className='text-xs font-semibold'>${item.price.toFixed(2)}</span>
              {(item.quantity ?? 1) > 1 && (
                <span className='text-[10px] text-muted-foreground'>x{item.quantity}</span>
              )}
            </div>
          </div>
        </a>
      ))}
      <div className='p-3 border-t border-border bg-secondary/20'>
        <div className='flex items-center gap-2'>
          <span className='text-xs font-semibold'>Total: ${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

interface ChatArticle {
  id: string;
  title: string;
  excerpt?: string;
  author?: string;
  category?: string;
  heroImage?: string;
  readTime?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getArticlesFromParts(parts: any[]): ChatArticle[] {
  const articles: ChatArticle[] = [];
  for (const part of parts) {
    const isArticleSearch =
      part.type === 'tool-searchArticles' ||
      (part.type === 'dynamic-tool' && part.toolName === 'searchArticles');
    if (!isArticleSearch || part.state !== 'output-available') {continue;}

    const output = part.output;
    if (Array.isArray(output)) {
      for (const a of output) {
        if (a.title && a.id) {articles.push(a);}
      }
    } else if (output?.title && output?.id) {
      articles.push(output);
    }
  }
  return articles;
}

const ArticleCards: FC<{ articles: ChatArticle[] }> = ({ articles }): JSX.Element | null => {
  if (articles.length === 0) {return null;}
  return (
    <div className='space-y-2'>
      {articles.map((article) => (
        <a
          key={article.id}
          href={`/articles/${article.id}`}
          target='_blank'
          rel='noopener noreferrer'
          className='block rounded-lg border border-border bg-background overflow-hidden hover:shadow-md transition-shadow'
        >
          {article.heroImage && (
            <div className='aspect-[16/9] bg-muted'>
              <img
                src={article.heroImage}
                alt={article.title}
                className='w-full h-full object-cover'
              />
            </div>
          )}
          <div className='p-2.5 space-y-1'>
            {article.category && (
              <p className='text-[10px] uppercase tracking-wider text-muted-foreground'>{article.category}</p>
            )}
            <p className='text-xs font-semibold leading-tight'>{article.title}</p>
            {article.excerpt && (
              <p className='text-[11px] text-muted-foreground leading-snug line-clamp-3'>{article.excerpt}</p>
            )}
            <div className='flex items-center gap-3 pt-0.5 text-[10px] text-muted-foreground'>
              {article.author && <span>by {article.author}</span>}
              {article.readTime && (
                <span className='flex items-center gap-0.5'>
                  <Clock className='h-2.5 w-2.5' />
                  {article.readTime}
                </span>
              )}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

interface ComparisonProduct {
  title: string;
  slug: string;
  price: number;
  rating?: number;
  thumbnail?: string;
  description?: string;
  brand?: string;
  category?: string;
  features?: string[];
  warrantyInformation?: string;
  shippingInformation?: string;
  returnPolicy?: string;
  stock?: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getComparisonFromParts(parts: any[]): ComparisonProduct[] {
  for (const part of parts) {
    const isCompare =
      part.type === 'tool-compareProducts' ||
      (part.type === 'dynamic-tool' && part.toolName === 'compareProducts');
    if (!isCompare || part.state !== 'output-available') {continue;}
    if (part.output?.action === 'compare' && Array.isArray(part.output.products)) {
      return part.output.products;
    }
  }
  return [];
}

const ComparisonRow: FC<{ label: string; values: (string | undefined)[] }> = ({ label, values }) => (
  <div className='grid border-t border-border' style={{ gridTemplateColumns: `repeat(${values.length}, 1fr)` }}>
    {values.map((value, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <div key={i} className='p-2 border-r last:border-r-0 border-border'>
        <p className='text-[9px] uppercase tracking-wider text-muted-foreground mb-0.5'>{label}</p>
        <p className='text-[11px] font-medium leading-snug'>{value || '—'}</p>
      </div>
    ))}
  </div>
);

const ComparisonCards: FC<{ products: ComparisonProduct[] }> = ({ products }): JSX.Element | null => {
  if (products.length < 2) {return null;}
  return (
    <div className='rounded-lg border border-border bg-background overflow-hidden'>
      {/* Header: product names + thumbnails */}
      <div className='grid' style={{ gridTemplateColumns: `repeat(${products.length}, 1fr)` }}>
        {products.map((p) => (
          <a
            key={p.slug}
            href={`/product/${p.slug}`}
            target='_blank'
            rel='noopener noreferrer'
            className='border-r last:border-r-0 border-border hover:bg-secondary/30 transition-colors'
          >
            {p.thumbnail && (
              <div className='aspect-square bg-muted'>
                <img src={p.thumbnail} alt={p.title} className='w-full h-full object-cover' />
              </div>
            )}
            <div className='p-2'>
              <p className='text-[11px] font-semibold leading-tight'>{p.title}</p>
            </div>
          </a>
        ))}
      </div>
      {/* Comparison rows */}
      <ComparisonRow label='Price' values={products.map((p) => `$${p.price.toFixed(2)}`)} />
      <ComparisonRow label='Rating' values={products.map((p) => p.rating !== undefined ? `${p.rating} / 5` : undefined)} />
      <ComparisonRow label='Brand' values={products.map((p) => p.brand)} />
      <ComparisonRow label='Category' values={products.map((p) => p.category)} />
      {products.some((p) => p.features && p.features.length > 0) && (
        <ComparisonRow label='Features' values={products.map((p) => p.features?.join(', '))} />
      )}
      {products.some((p) => p.warrantyInformation) && (
        <ComparisonRow label='Warranty' values={products.map((p) => p.warrantyInformation)} />
      )}
      {products.some((p) => p.shippingInformation) && (
        <ComparisonRow label='Shipping' values={products.map((p) => p.shippingInformation)} />
      )}
      {products.some((p) => p.returnPolicy) && (
        <ComparisonRow label='Returns' values={products.map((p) => p.returnPolicy)} />
      )}
      {products.some((p) => p.stock !== undefined) && (
        <ComparisonRow label='Stock' values={products.map((p) => p.stock !== undefined ? `${p.stock} units` : undefined)} />
      )}
    </div>
  );
};

const LOADING_MESSAGES = [
  'Thinking...',
  'Searching the catalog...',
  'Browsing through our collection...',
  'Looking for the best matches...',
  'Checking what we have...',
  'Putting together recommendations...',
  'Almost there...',
  'Reading through our stories...',
  'Finding what you need...',
  'Curating results for you...',
];

function useLoadingMessage(isLoading: boolean): string {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIndex(0);
      return;
    }
    setIndex(Math.floor(Math.random() * LOADING_MESSAGES.length));
    const interval = setInterval(() => {
      setIndex((prev) => {
        let next: number;
        do { next = Math.floor(Math.random() * LOADING_MESSAGES.length); } while (next === prev);
        return next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [isLoading]);

  return LOADING_MESSAGES[index];
}

export const ChatAssistant: FC = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const processedToolCalls = useRef<Set<string>>(new Set());

  const { addToCart, clearCart, items: cartItems } = useCart();
  const cartItemsRef = useRef(cartItems);

  useEffect(() => {
    cartItemsRef.current = cartItems;
  }, [cartItems]);

  // eslint-disable-next-line react-hooks/refs -- body callback reads ref at call time, not render time
  const [transport] = useState(() => new DefaultChatTransport({
    body: () => ({
      currentUrl: window.location.pathname,
      cartItems: cartItemsRef.current.map((i) => ({ title: i.title, quantity: i.quantity, price: i.price, slug: i.slug })),
    }),
  }));

  const { messages, sendMessage, status, error } = useChat({
    transport,
  });

  const isLoading = status === 'submitted' || status === 'streaming';
  const loadingMessage = useLoadingMessage(isLoading);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Detect addToCart / clearCart tool results and update cart
  useEffect(() => {
    for (const message of messages) {
      if (message.role !== 'assistant') {continue;}
      for (const part of message.parts) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const p = part as any;
        if (p.state !== 'output-available' || processedToolCalls.current.has(p.toolCallId)) {continue;}

        const isAddToCart =
          p.type === 'tool-addToCart' || (p.type === 'dynamic-tool' && p.toolName === 'addToCart');
        const isClearCart =
          p.type === 'tool-clearCart' || (p.type === 'dynamic-tool' && p.toolName === 'clearCart');

        if (isAddToCart && p.output?.action === 'add_to_cart' && p.output.product) {
          processedToolCalls.current.add(p.toolCallId);
          addToCart({
            productId: p.output.product.id,
            title: p.output.product.title,
            slug: p.output.product.slug,
            price: p.output.product.price,
            thumbnail: p.output.product.thumbnail,
          });
        }

        if (isClearCart && p.output?.action === 'clear_cart') {
          processedToolCalls.current.add(p.toolCallId);
          clearCart();
        }
      }
    }
  }, [messages, addToCart, clearCart]);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) {return;}

    const text = inputValue;
    setInputValue('');
    await sendMessage({ text });
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-accent text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-105'
        aria-label={isOpen ? 'Close chat' : 'Open chat assistant'}
      >
        {isOpen ? (
          <X className='h-6 w-6' />
        ) : (
          <MessageCircle className='h-6 w-6' />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <Card className='fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-8rem)] flex flex-col shadow-2xl border-border overflow-hidden'>
          {/* Header */}
          <div className='p-4 border-b border-border bg-accent/5 shrink-0'>
            <div className='flex items-center gap-3'>
              <div className='h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center'>
                <Bot className='h-4 w-4 text-accent' />
              </div>
              <div>
                <h3 className='font-semibold text-sm'>Shopping Assistant</h3>
                <p className='text-xs text-muted-foreground'>AI-Powered by market&story</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className='flex-1 overflow-y-auto p-4 space-y-4'>
            {messages.length === 0 && (
              <div className='text-center py-8 space-y-3'>
                <div className='h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto'>
                  <Bot className='h-6 w-6 text-accent' />
                </div>
                <p className='text-sm text-muted-foreground'>
                  Hi! I can help you find products, answer questions, and make recommendations. What are you looking for?
                </p>
              </div>
            )}

            {messages.map((message, msgIdx) => {
              const text = getMessageText(message.parts);
              const products = message.role === 'assistant' ? getProductsFromParts(message.parts) : [];
              const articles = message.role === 'assistant' ? getArticlesFromParts(message.parts) : [];
              const comparison = message.role === 'assistant' ? getComparisonFromParts(message.parts) : [];
              const cartProducts = message.role === 'assistant' ? getCartItemsFromParts(message.parts) : [];
              // Hide product cards if a later message has comparison results (intermediate search step)
              const laterHasComparison = messages.slice(msgIdx + 1).some(
                (m) => m.role === 'assistant' && getComparisonFromParts(m.parts).length > 0
              );
              const showProducts = products.length > 0 && comparison.length === 0 && !laterHasComparison;
              const hasCards = showProducts || articles.length > 0 || comparison.length > 0 || cartProducts.length > 0;
              if (!text && !hasCards) {return null;}

              return (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className='h-7 w-7 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5'>
                      <Bot className='h-3.5 w-3.5 text-accent' />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] space-y-2 ${
                      message.role === 'user' ? '' : ''
                    }`}
                  >
                    {comparison.length > 0 && <ComparisonCards products={comparison} />}
                    {showProducts && <ProductCards products={products} />}
                    {articles.length > 0 && <ArticleCards articles={articles} />}
                    {cartProducts.length > 0 && <CartCards items={cartProducts} />}
                    {text && !hasCards && (
                      <div
                        className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                          message.role === 'user'
                            ? 'bg-accent text-accent-foreground'
                            : 'bg-secondary/50 text-foreground'
                        }`}
                      >
                        {message.role === 'assistant' ? (
                          <div
                            className='prose prose-sm max-w-none [&_a]:text-accent [&_a]:underline [&_a]:decoration-accent/30 [&_a:hover]:decoration-accent'
                            dangerouslySetInnerHTML={{
                              // eslint-disable-next-line @typescript-eslint/naming-convention -- React API requires __html
                              __html: text
                                .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
                                .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                                .replace(/\n/g, '<br/>')
                            }}
                          />
                        ) : (
                          text
                        )}
                      </div>
                    )}
                  </div>
                  {message.role === 'user' && (
                    <div className='h-7 w-7 rounded-full bg-foreground/10 flex items-center justify-center shrink-0 mt-0.5'>
                      <User className='h-3.5 w-3.5' />
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className='flex gap-3'>
                <div className='h-7 w-7 rounded-full bg-accent/20 flex items-center justify-center shrink-0'>
                  <Bot className='h-3.5 w-3.5 text-accent animate-pulse' />
                </div>
                <div className='bg-secondary/50 rounded-2xl px-4 py-2.5'>
                  <p className='text-xs text-muted-foreground animate-pulse'>{loadingMessage}</p>
                </div>
              </div>
            )}

            {error && (
              <div className='text-center py-2'>
                <p className='text-xs text-red-500'>Something went wrong. Please try again.</p>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className='p-3 border-t border-border shrink-0'>
            <div className='flex gap-2'>
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder='Ask about products...'
                className='flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20'
                disabled={isLoading}
              />
              <Button
                type='submit'
                size='icon'
                className='rounded-full h-9 w-9 shrink-0'
                disabled={isLoading || !inputValue.trim()}
              >
                <Send className='h-4 w-4' />
              </Button>
            </div>
          </form>
        </Card>
      )}
    </>
  );
};

import { z } from 'zod';

export interface ProductDimensions {
  width: number;
  height: number;
  depth: number;
}

export type ProductCategory =
  | 'Home & Living'
  | 'Fashion'
  | 'Technology'
  | 'Wellness'
  | 'Accessories';

export interface ProductMeta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface ProducReviews {
  id: string;
  productId: number;
  productSlug: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: ProductCategory;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: ProductDimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: 'In Stock' | 'Out of Stock' | 'Limited Stock';
  reviews: ProducReviews[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: ProductMeta;
  images: string[];
  thumbnail: string[] | string;
  badge?: string | null;
  features?: string[];
}

export type TReviewSchema = z.infer<typeof reviewSchema>;

export const reviewSchema = z.object({
  rating: z
    .number()
    .min(1, 'Please select a rating'),
  comment: z
    .string()
    .min(50, 'Review must be at least 50 characters')
});

export interface ArticleSection {
  type: 'paragraph' | 'heading' | 'blockquote' | 'product-card';
  content?: string;
  level?: 2 | 3;
  productId?: number;
  inline?: boolean;
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  excerpt: string;
  author: string;
  authorBio: string;
  authorImage: string;
  publishedAt: string;
  readTime: string;
  category: string;
  heroImage: string;
  tags: string[];
  featured: boolean;
  contentSections: ArticleSection[];
  relatedProductSlugs: string[];
}

export interface LiveContentItem {
  id: number;
  type: 'video' | 'image';
  videoUrl: string;
  title: string;
  author: string;
  authorAvatar: string;
  likes: number;
  comments: number;
  tags: string[];
  productLink: string;
  description: string;
}

export const placeholderImage =
'https://res.cloudinary.com/jlml/image/upload/v1765487827/market_and_story/imageplaceholder.svg';

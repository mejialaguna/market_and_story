import type { Product } from '@/seed/seed';

interface HandleImageReturn {
  currentImage: string;
  handleImageError: () => void
}

export const handleImage = (product: Product):HandleImageReturn => {
  let imageIndex = 0;
  const placeholderImage =
    'https://res.cloudinary.com/jlml/image/upload/v1765487827/market_and_story/imageplaceholder.svg';
  let currentImage;

  if (
    product.images &&
    product.images.length > 0 &&
    imageIndex < product.images.length
  ) {
    currentImage = product.images[imageIndex];
  } else {
    currentImage = placeholderImage;
  }

  const handleImageError = (): void => {
    // Try next image in array
    if (product.images && imageIndex < product.images.length - 1) {
      imageIndex = imageIndex + 1;
    } else {
      // All images failed, will use placeholder
      imageIndex = product.images?.length || 0;
    }
  };

  return {
    currentImage,
    handleImageError,
  };
};

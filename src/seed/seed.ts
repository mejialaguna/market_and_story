export interface ProductDimensions {
  width: number;
  height: number;
  depth: number;
}

export interface ProductMeta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
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
  reviews: unknown[]; // replace with a Review type when defined
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: ProductMeta;
  images: string[];
  thumbnail: string [] | string;
}

export const seedData: Product[]= [
  {
    'id': 1,
    'title': 'Modern Ceramic Vase Set',
    'description': 'Elegant set of three handcrafted ceramic vases in neutral tones. Perfect for contemporary home decor, these vases feature a matte finish and minimalist design.',
    'category': 'Home & Living',
    'price': 49.99,
    'discountPercentage': 15.0,
    'rating': 4.5,
    'stock': 87,
    'tags': ['home decor', 'vases', 'ceramic'],
    'brand': 'HomeStyle',
    'sku': 'HL-HST-VAS-001',
    'weight': 2.5,
    'dimensions': {
      'width': 12.0,
      'height': 25.0,
      'depth': 12.0
    },
    'warrantyInformation': '30 day warranty',
    'shippingInformation': 'Ships in 2-4 business days',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '30 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-01-15T10:20:00.000Z',
      'updatedAt': '2025-01-15T10:20:00.000Z',
      'barcode': '1234567890123',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1578500494198-246f612d3b3d',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=200'
  },
  {
    'id': 2,
    'title': 'Luxury Cotton Bedding Set',
    'description': "Premium 100% Egyptian cotton bedding set including duvet cover, fitted sheet, and pillowcases. Ultra-soft and breathable for the perfect night's sleep.",
    'category': 'Home & Living',
    'price': 129.99,
    'discountPercentage': 20.0,
    'rating': 4.8,
    'stock': 45,
    'tags': ['bedding', 'cotton', 'bedroom'],
    'brand': 'DreamLux',
    'sku': 'HL-DLX-BED-002',
    'weight': 3.2,
    'dimensions': {
      'width': 30.0,
      'height': 5.0,
      'depth': 25.0
    },
    'warrantyInformation': '1 year warranty',
    'shippingInformation': 'Free shipping',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '60 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-01-15T10:25:00.000Z',
      'updatedAt': '2025-01-15T10:25:00.000Z',
      'barcode': '1234567890124',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200'
  },
  {
    'id': 3,
    'title': 'Scented Soy Candle Collection',
    'description': 'Set of 6 handpoured soy candles with essential oils. Includes lavender, vanilla, eucalyptus, citrus, sandalwood, and ocean breeze scents.',
    'category': 'Home & Living',
    'price': 39.99,
    'discountPercentage': 10.0,
    'rating': 4.6,
    'stock': 120,
    'tags': ['candles', 'home fragrance', 'soy'],
    'brand': 'Serenity',
    'sku': 'HL-SER-CAN-003',
    'weight': 1.8,
    'dimensions': {
      'width': 20.0,
      'height': 8.0,
      'depth': 15.0
    },
    'warrantyInformation': 'No warranty',
    'shippingInformation': 'Ships in 1-3 business days',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '14 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-01-16T09:15:00.000Z',
      'updatedAt': '2025-01-16T09:15:00.000Z',
      'barcode': '1234567890125',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1602874801006-2584b9b2f946',
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1602874801006-2584b9b2f946?w=200'
  },
  {
    'id': 4,
    'title': 'Bamboo Kitchen Utensil Set',
    'description': 'Eco-friendly 12-piece bamboo kitchen utensil set with holder. Includes spatulas, spoons, tongs, and more. Heat-resistant and durable.',
    'category': 'Home & Living',
    'price': 34.99,
    'discountPercentage': 12.0,
    'rating': 4.4,
    'stock': 95,
    'tags': ['kitchen', 'bamboo', 'utensils'],
    'brand': 'EcoChef',
    'sku': 'HL-ECO-UTN-004',
    'weight': 1.5,
    'dimensions': {
      'width': 15.0,
      'height': 35.0,
      'depth': 10.0
    },
    'warrantyInformation': '90 day warranty',
    'shippingInformation': 'Ships in 2-3 business days',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '30 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-01-16T10:00:00.000Z',
      'updatedAt': '2025-01-16T10:00:00.000Z',
      'barcode': '1234567890126',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136',
      'https://images.unsplash.com/photo-1584990347449-39b5e58f9a85'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200'
  },
  {
    'id': 5,
    'title': 'Geometric Wall Mirror',
    'description': 'Stylish hexagonal wall mirror with gold metal frame. Adds depth and light to any room. Easy to hang with included hardware.',
    'category': 'Home & Living',
    'price': 79.99,
    'discountPercentage': 18.0,
    'rating': 4.7,
    'stock': 62,
    'tags': ['mirror', 'wall decor', 'geometric'],
    'brand': 'ReflectHome',
    'sku': 'HL-REF-MIR-005',
    'weight': 3.8,
    'dimensions': {
      'width': 60.0,
      'height': 70.0,
      'depth': 2.5
    },
    'warrantyInformation': '1 year warranty',
    'shippingInformation': 'Ships in 3-5 business days',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '30 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-01-17T11:30:00.000Z',
      'updatedAt': '2025-01-17T11:30:00.000Z',
      'barcode': '1234567890127',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1618220179428-22790b461013',
      'https://images.unsplash.com/photo-1600494603989-9650cf6ddd3d'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=200'
  },
  {
    'id': 6,
    'title': 'Memory Foam Bath Mat',
    'description': 'Ultra-soft memory foam bath mat with non-slip backing. Quick-drying microfiber surface in elegant grey color. Machine washable.',
    'category': 'Home & Living',
    'price': 24.99,
    'discountPercentage': 8.0,
    'rating': 4.3,
    'stock': 150,
    'tags': ['bathroom', 'bath mat', 'memory foam'],
    'brand': 'CloudStep',
    'sku': 'HL-CLD-MAT-006',
    'weight': 0.8,
    'dimensions': {
      'width': 50.0,
      'height': 80.0,
      'depth': 2.0
    },
    'warrantyInformation': '6 month warranty',
    'shippingInformation': 'Ships in 1-2 business days',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '30 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-01-17T12:00:00.000Z',
      'updatedAt': '2025-01-17T12:00:00.000Z',
      'barcode': '1234567890128',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1620626011761-996317b8d101',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=200'
  },
  {
    'id': 7,
    'title': 'Indoor Plant Stand Set',
    'description': 'Modern metal plant stand set of 3 in matte black. Different heights for creating visual interest. Suitable for small to medium pots.',
    'category': 'Home & Living',
    'price': 54.99,
    'discountPercentage': 14.0,
    'rating': 4.6,
    'stock': 73,
    'tags': ['plant stand', 'home decor', 'indoor'],
    'brand': 'GreenSpace',
    'sku': 'HL-GRN-PLN-007',
    'weight': 4.2,
    'dimensions': {
      'width': 30.0,
      'height': 80.0,
      'depth': 30.0
    },
    'warrantyInformation': '1 year warranty',
    'shippingInformation': 'Ships in 4-6 business days',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '30 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-01-18T09:45:00.000Z',
      'updatedAt': '2025-01-18T09:45:00.000Z',
      'barcode': '1234567890129',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1594735186196-b203f51655c8',
      'https://images.unsplash.com/photo-1615529182904-14819c35db37'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1594735186196-b203f51655c8?w=200'
  },
  {
    'id': 8,
    'title': 'Smart LED Table Lamp',
    'description': 'Touch-controlled LED table lamp with 3 brightness levels and adjustable color temperature. USB charging port built-in. Modern minimalist design.',
    'category': 'Home & Living',
    'price': 45.99,
    'discountPercentage': 16.0,
    'rating': 4.5,
    'stock': 110,
    'tags': ['lamp', 'LED', 'smart home'],
    'brand': 'LuminaTech',
    'sku': 'HL-LUM-LMP-008',
    'weight': 1.2,
    'dimensions': {
      'width': 15.0,
      'height': 42.0,
      'depth': 15.0
    },
    'warrantyInformation': '2 year warranty',
    'shippingInformation': 'Ships in 2-4 business days',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '30 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-01-18T10:30:00.000Z',
      'updatedAt': '2025-01-18T10:30:00.000Z',
      'barcode': '1234567890130',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=200'
  },
  {
    'id': 9,
    'title': 'Velvet Throw Pillows Set',
    'description': 'Luxurious velvet throw pillow covers set of 4 in emerald green. Soft texture with hidden zipper. Inserts not included. 18x18 inches.',
    'category': 'Home & Living',
    'price': 32.99,
    'discountPercentage': 11.0,
    'rating': 4.4,
    'stock': 88,
    'tags': ['pillows', 'velvet', 'home decor'],
    'brand': 'PlushComfort',
    'sku': 'HL-PLU-PIL-009',
    'weight': 1.0,
    'dimensions': {
      'width': 45.0,
      'height': 45.0,
      'depth': 12.0
    },
    'warrantyInformation': 'No warranty',
    'shippingInformation': 'Ships in 1-3 business days',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '30 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-01-19T11:00:00.000Z',
      'updatedAt': '2025-01-19T11:00:00.000Z',
      'barcode': '1234567890131',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2',
      'https://images.unsplash.com/photo-1605806616949-1e87b487fc2f'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=200'
  },
  {
    'id': 10,
    'title': 'Stainless Steel Trash Can',
    'description': 'Sleek 13-gallon stainless steel trash can with soft-close lid and removable inner bucket. Fingerprint-proof finish. Perfect for kitchen or office.',
    'category': 'Home & Living',
    'price': 69.99,
    'discountPercentage': 13.0,
    'rating': 4.6,
    'stock': 54,
    'tags': ['trash can', 'kitchen', 'stainless steel'],
    'brand': 'CleanLine',
    'sku': 'HL-CLN-TRS-010',
    'weight': 5.5,
    'dimensions': {
      'width': 28.0,
      'height': 65.0,
      'depth': 35.0
    },
    'warrantyInformation': '5 year warranty',
    'shippingInformation': 'Ships in 3-5 business days',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '60 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-01-19T14:20:00.000Z',
      'updatedAt': '2025-01-19T14:20:00.000Z',
      'barcode': '1234567890132',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce',
      'https://images.unsplash.com/photo-1600428099904-0e0238d909bb'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=200'
  },
  {
    'id': 11,
    'title': 'Wooden Floating Shelves',
    'description': 'Set of 3 rustic wooden floating shelves in walnut finish. Easy wall mounting with hidden brackets. Perfect for displaying books and decor.',
    'category': 'Home & Living',
    'price': 44.99,
    'discountPercentage': 9.0,
    'rating': 4.5,
    'stock': 67,
    'tags': ['shelves', 'wooden', 'wall storage'],
    'brand': 'WoodCraft',
    'sku': 'HL-WDC-SHL-011',
    'weight': 6.0,
    'dimensions': {
      'width': 60.0,
      'height': 25.0,
      'depth': 20.0
    },
    'warrantyInformation': '1 year warranty',
    'shippingInformation': 'Ships in 4-7 business days',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '30 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-01-20T10:10:00.000Z',
      'updatedAt': '2025-01-20T10:10:00.000Z',
      'barcode': '1234567890133',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2',
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=200'
  },
  {
    'id': 12,
    'title': 'Turkish Cotton Towel Set',
    'description': 'Premium 6-piece Turkish cotton towel set in pearl white. Includes 2 bath towels, 2 hand towels, and 2 washcloths. Ultra-absorbent and quick-drying.',
    'category': 'Home & Living',
    'price': 59.99,
    'discountPercentage': 17.0,
    'rating': 4.7,
    'stock': 92,
    'tags': ['towels', 'bathroom', 'cotton'],
    'brand': 'SpaLuxe',
    'sku': 'HL-SPA-TWL-012',
    'weight': 2.8,
    'dimensions': {
      'width': 35.0,
      'height': 25.0,
      'depth': 15.0
    },
    'warrantyInformation': 'No warranty',
    'shippingInformation': 'Free shipping',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '30 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-01-20T11:45:00.000Z',
      'updatedAt': '2025-01-20T11:45:00.000Z',
      'barcode': '1234567890134',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1622016662515-0c3279e91dc7',
      'https://images.unsplash.com/photo-1616046386607-a420b0d8f8ca'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1622016662515-0c3279e91dc7?w=200'
  },
  {
    'id': 13,
    'title': 'Acrylic Organizer Set',
    'description': 'Clear acrylic desk organizer set with 5 compartments. Ideal for office supplies, makeup, or craft materials. Stackable design.',
    'category': 'Home & Living',
    'price': 27.99,
    'discountPercentage': 7.0,
    'rating': 4.3,
    'stock': 135,
    'tags': ['organizer', 'acrylic', 'desk'],
    'brand': 'ClearView',
    'sku': 'HL-CLR-ORG-013',
    'weight': 1.3,
    'dimensions': {
      'width': 25.0,
      'height': 12.0,
      'depth': 18.0
    },
    'warrantyInformation': '90 day warranty',
    'shippingInformation': 'Ships in 1-2 business days',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '30 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-01-21T09:30:00.000Z',
      'updatedAt': '2025-01-21T09:30:00.000Z',
      'barcode': '1234567890135',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6',
      'https://images.unsplash.com/photo-1580674687561-ee8f6205a2c9'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?w=200'
  },
  {
    'id': 14,
    'title': 'Macrame Wall Hanging',
    'description': 'Handmade bohemian macrame wall hanging in natural cotton. Large statement piece measuring 36 inches long. Includes wooden dowel.',
    'category': 'Home & Living',
    'price': 38.99,
    'discountPercentage': 10.0,
    'rating': 4.6,
    'stock': 56,
    'tags': ['macrame', 'wall art', 'bohemian'],
    'brand': 'BohoHome',
    'sku': 'HL-BOH-MAC-014',
    'weight': 0.9,
    'dimensions': {
      'width': 45.0,
      'height': 90.0,
      'depth': 5.0
    },
    'warrantyInformation': 'No warranty',
    'shippingInformation': 'Ships in 3-5 business days',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '14 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-01-21T13:15:00.000Z',
      'updatedAt': '2025-01-21T13:15:00.000Z',
      'barcode': '1234567890136',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91',
      'https://images.unsplash.com/photo-1597843786411-e47ad2fd6b9d'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=200'
  },
  {
    'id': 15,
    'title': 'Essential Oil Diffuser',
    'description': 'Ultrasonic aromatherapy essential oil diffuser with LED lights. 300ml capacity, runs up to 10 hours. Includes auto shut-off feature.',
    'category': 'Home & Living',
    'price': 29.99,
    'discountPercentage': 15.0,
    'rating': 4.5,
    'stock': 145,
    'tags': ['diffuser', 'aromatherapy', 'essential oils'],
    'brand': 'ZenSpace',
    'sku': 'HL-ZEN-DIF-015',
    'weight': 0.7,
    'dimensions': {
      'width': 15.0,
      'height': 18.0,
      'depth': 15.0
    },
    'warrantyInformation': '1 year warranty',
    'shippingInformation': 'Ships in 1-3 business days',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '30 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-01-22T10:00:00.000Z',
      'updatedAt': '2025-01-22T10:00:00.000Z',
      'barcode': '1234567890137',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1603006905003-be475563bc59',
      'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=200'
  },
  {
    'id': 16,
    'title': 'Woven Storage Baskets',
    'description': 'Set of 3 handwoven seagrass storage baskets with handles. Natural finish perfect for organizing toys, blankets, or laundry. Collapsible design.',
    'category': 'Home & Living',
    'price': 41.99,
    'discountPercentage': 12.0,
    'rating': 4.4,
    'stock': 78,
    'tags': ['baskets', 'storage', 'seagrass'],
    'brand': 'NatureWeave',
    'sku': 'HL-NAT-BSK-016',
    'weight': 2.1,
    'dimensions': {
      'width': 40.0,
      'height': 35.0,
      'depth': 40.0
    },
    'warrantyInformation': '6 month warranty',
    'shippingInformation': 'Ships in 2-4 business days',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '30 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-01-22T14:30:00.000Z',
      'updatedAt': '2025-01-22T14:30:00.000Z',
      'barcode': '1234567890138',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd',
      'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=200'
  },
  {
    'id': 17,
    'title': 'Non-Stick Cookware Set',
    'description': 'Professional 10-piece non-stick cookware set with glass lids. Includes frying pans, saucepans, and stockpot. Dishwasher safe and PFOA-free.',
    'category': 'Home & Living',
    'price': 119.99,
    'discountPercentage': 22.0,
    'rating': 4.7,
    'stock': 48,
    'tags': ['cookware', 'kitchen', 'non-stick'],
    'brand': 'ChefPro',
    'sku': 'HL-CHF-CKW-017',
    'weight': 8.5,
    'dimensions': {
      'width': 45.0,
      'height': 25.0,
      'depth': 45.0
    },
    'warrantyInformation': 'Lifetime warranty',
    'shippingInformation': 'Free shipping',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '60 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-01-23T09:00:00.000Z',
      'updatedAt': '2025-01-23T09:00:00.000Z',
      'barcode': '1234567890139',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1584990347449-39b5e58f9a85',
      'https://images.unsplash.com/photo-1565025709573-03a0702e8e58'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1584990347449-39b5e58f9a85?w=200'
  },
  {
    'id': 18,
    'title': 'Area Rug Persian Style',
    'description': 'Beautiful 8x10 ft Persian-style area rug with intricate patterns. Made from durable polypropylene fiber. Easy to clean and stain-resistant.',
    'category': 'Home & Living',
    'price': 189.99,
    'discountPercentage': 25.0,
    'rating': 4.6,
    'stock': 32,
    'tags': ['rug', 'area rug', 'persian'],
    'brand': 'RugMasters',
    'sku': 'HL-RUG-PER-018',
    'weight': 12.0,
    'dimensions': {
      'width': 240.0,
      'height': 1.2,
      'depth': 300.0
    },
    'warrantyInformation': '1 year warranty',
    'shippingInformation': 'Ships in 5-7 business days',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '30 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-01-23T11:20:00.000Z',
      'updatedAt': '2025-01-23T11:20:00.000Z',
      'barcode': '1234567890140',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1600166898405-da9535204843',
      'https://images.unsplash.com/photo-1582582621959-48d27397dc69'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=200'
  },
  {
    'id': 19,
    'title': 'Coffee Table Book Collection',
    'description': 'Curated set of 5 large-format photography and art coffee table books. Perfect for styling and conversation starters.',
    'category': 'Home & Living',
    'price': 79.99,
    'discountPercentage': 18.0,
    'rating': 4.5,
    'stock': 61,
    'tags': ['books', 'coffee table', 'decor'],
    'brand': 'ArtHouse',
    'sku': 'HL-ART-BKS-019',
    'weight': 7.5,
    'dimensions': {
      'width': 35.0,
      'height': 40.0,
      'depth': 25.0
    },
    'warrantyInformation': 'No warranty',
    'shippingInformation': 'Ships in 3-5 business days',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '14 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-01-24T10:45:00.000Z',
      'updatedAt': '2025-01-24T10:45:00.000Z',
      'barcode': '1234567890141',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6',
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=200'
  },
  {
    'id': 20,
    'title': 'Digital Kitchen Scale',
    'description': 'Precise digital kitchen scale with tempered glass platform. Measures up to 11 lbs in increments of 0.1 oz. Includes tare function and unit conversion.',
    'category': 'Home & Living',
    'price': 22.99,
    'discountPercentage': 8.0,
    'rating': 4.4,
    'stock': 125,
    'tags': ['kitchen', 'scale', 'digital'],
    'brand': 'PrecisionCook',
    'sku': 'HL-PRC-SCL-020',
    'weight': 0.8,
    'dimensions': {
      'width': 20.0,
      'height': 2.0,
      'depth': 18.0
    },
    'warrantyInformation': '2 year warranty',
    'shippingInformation': 'Ships in 1-2 business days',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '30 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-01-24T13:30:00.000Z',
      'updatedAt': '2025-01-24T13:30:00.000Z',
      'barcode': '1234567890142',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537',
      'https://images.unsplash.com/photo-1611070026773-d2834e05121a'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=200'
  },
  {
    'id': 21,
    'title': 'Wine Rack Countertop',
    'description': 'Modern freestanding wine rack holds 6 bottles and 4 glasses. Sturdy metal construction with bronze finish. Compact design for countertop or bar.',
    'category': 'Home & Living',
    'price': 34.99,
    'discountPercentage': 11.0,
    'rating': 4.3,
    'stock': 84,
    'tags': ['wine rack', 'kitchen', 'bar'],
    'brand': 'VinoHome',
    'sku': 'HL-VIN-RCK-021',
    'weight': 3.2,
    'dimensions': {
      'width': 35.0,
      'height': 38.0,
      'depth': 20.0
    },
    'warrantyInformation': '1 year warranty',
    'shippingInformation': 'Ships in 2-4 business days',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '30 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-01-25T09:15:00.000Z',
      'updatedAt': '2025-01-25T09:15:00.000Z',
      'barcode': '1234567890143',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1582543274751-330a18c5c6c0',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1582543274751-330a18c5c6c0?w=200'
  },
  {
    'id': 22,
    'title': 'Decorative Tray Set',
    'description': 'Set of 2 decorative serving trays with handles. Made from natural wood with white wash finish. Perfect for ottoman, coffee table, or breakfast in bed.',
    'category': 'Home & Living',
    'price': 36.99,
    'discountPercentage': 9.0,
    'rating': 4.5,
    'stock': 97,
    'tags': ['tray', 'serving', 'wood'],
    'brand': 'ServeStyle',
    'sku': 'HL-SRV-TRY-022',
    'weight': 2.4,
    'dimensions': {
      'width': 45.0,
      'height': 5.0,
      'depth': 30.0
    },
    'warrantyInformation': 'No warranty',
    'shippingInformation': 'Ships in 2-3 business days',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '30 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-01-25T11:50:00.000Z',
      'updatedAt': '2025-01-25T11:50:00.000Z',
      'barcode': '1234567890144',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1600166898399-510b26080ade',
      'https://images.unsplash.com/photo-1570222094114-d054a817e56b'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1600166898399-510b26080ade?w=200'
  },
  {
    'id': 23,
    'title': 'Ceramic Dinnerware Set',
    'description': '16-piece ceramic dinnerware set for 4 in modern matte finish. Includes dinner plates, salad plates, bowls, and mugs. Microwave and dishwasher safe.',
    'category': 'Home & Living',
    'price': 84.99,
    'discountPercentage': 20.0,
    'rating': 4.6,
    'stock': 55,
    'tags': ['dinnerware', 'ceramic', 'kitchen'],
    'brand': 'TableCraft',
    'sku': 'HL-TBL-DIN-023',
    'weight': 9.8,
    'dimensions': {
      'width': 40.0,
      'height': 35.0,
      'depth': 30.0
    },
    'warrantyInformation': '1 year warranty',
    'shippingInformation': 'Free shipping',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '30 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-01-26T10:20:00.000Z',
      'updatedAt': '2025-01-26T10:20:00.000Z',
      'barcode': '1234567890145',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1580654683190-b968309c6bc4',
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1580654683190-b968309c6bc4?w=200'
  },
  {
    'id': 24,
    'title': 'Wall Clock Modern',
    'description': 'Silent non-ticking wall clock with large numbers. 12-inch diameter with black metal frame and white face. Battery operated.',
    'category': 'Home & Living',
    'price': 28.99,
    'discountPercentage': 7.0,
    'rating': 4.4,
    'stock': 112,
    'tags': ['clock', 'wall decor', 'modern'],
    'brand': 'TimeKeeper',
    'sku': 'HL-TIM-CLK-024',
    'weight': 1.1,
    'dimensions': {
      'width': 30.0,
      'height': 30.0,
      'depth': 4.5
    },
    'warrantyInformation': '1 year warranty',
    'shippingInformation': 'Ships in 1-3 business days',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '30 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-01-26T14:00:00.000Z',
      'updatedAt': '2025-01-26T14:00:00.000Z',
      'barcode': '1234567890146',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1587843786410-0a53f44fd43b',
      'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1587843786410-0a53f44fd43b?w=200'
  },
  {
    'id': 25,
    'title': 'Shower Curtain Set',
    'description': 'Waterproof fabric shower curtain with geometric pattern. Includes 12 rust-resistant hooks. Machine washable. 72x72 inches.',
    'category': 'Home & Living',
    'price': 25.99,
    'discountPercentage': 10.0,
    'rating': 4.3,
    'stock': 138,
    'tags': ['shower curtain', 'bathroom', 'waterproof'],
    'brand': 'BathEssentials',
    'sku': 'HL-BTH-CRT-025',
    'weight': 0.9,
    'dimensions': {
      'width': 183.0,
      'height': 0.5,
      'depth': 183.0
    },
    'warrantyInformation': 'No warranty',
    'shippingInformation': 'Ships in 1-2 business days',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '30 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-01-27T09:30:00.000Z',
      'updatedAt': '2025-01-27T09:30:00.000Z',
      'barcode': '1234567890147',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1620626011761-996317b8d101',
      'https://images.unsplash.com/photo-1604709177225-055f99402ea3'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=200'
  },
  {
    'id': 26,
    'title': 'Weighted Blanket',
    'description': 'Premium weighted blanket 15 lbs for better sleep. Soft microfiber cover with glass bead filling. Evenly distributed weight. Queen size.',
    'category': 'Home & Living',
    'price': 89.99,
    'discountPercentage': 23.0,
    'rating': 4.7,
    'stock': 43,
    'tags': ['blanket', 'weighted', 'bedroom'],
    'brand': 'SleepWell',
    'sku': 'HL-SLP-BLK-026',
    'weight': 6.8,
    'dimensions': {
      'width': 150.0,
      'height': 10.0,
      'depth': 200.0
    },
    'warrantyInformation': '3 year warranty',
    'shippingInformation': 'Free shipping',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '60 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-01-27T12:45:00.000Z',
      'updatedAt': '2025-01-27T12:45:00.000Z',
      'barcode': '1234567890148',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304',
      'https://images.unsplash.com/photo-1628516479485-58e78f5df5eb'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200'
  },
  {
    'id': 27,
    'title': 'Drawer Organizers Set',
    'description': 'Expandable drawer dividers set of 6. Adjustable size fits most drawers. Perfect for organizing utensils, office supplies, or cosmetics.',
    'category': 'Home & Living',
    'price': 19.99,
    'discountPercentage': 6.0,
    'rating': 4.2,
    'stock': 164,
    'tags': ['organizer', 'drawer', 'storage'],
    'brand': 'OrganizePro',
    'sku': 'HL-ORG-DRW-027',
    'weight': 1.5,
    'dimensions': {
      'width': 40.0,
      'height': 5.0,
      'depth': 30.0
    },
    'warrantyInformation': '1 year warranty',
    'shippingInformation': 'Ships in 1-2 business days',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '30 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-01-28T10:10:00.000Z',
      'updatedAt': '2025-01-28T10:10:00.000Z',
      'barcode': '1234567890149',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952',
      'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200'
  },
  {
    'id': 28,
    'title': 'Glass Food Storage Containers',
    'description': 'Set of 10 glass meal prep containers with snap-locking lids. BPA-free, microwave, oven, and dishwasher safe. Airtight and leak-proof.',
    'category': 'Home & Living',
    'price': 44.99,
    'discountPercentage': 14.0,
    'rating': 4.6,
    'stock': 89,
    'tags': ['storage', 'glass', 'kitchen'],
    'brand': 'FreshKeep',
    'sku': 'HL-FRE-STO-028',
    'weight': 4.5,
    'dimensions': {
      'width': 35.0,
      'height': 20.0,
      'depth': 25.0
    },
    'warrantyInformation': 'Lifetime warranty',
    'shippingInformation': 'Ships in 2-4 business days',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '30 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-01-28T13:25:00.000Z',
      'updatedAt': '2025-01-28T13:25:00.000Z',
      'barcode': '1234567890150',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1584308972272-9e4e7685e80f',
      'https://images.unsplash.com/photo-1608483401543-e573e35eb2ec'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=200'
  },
  {
    'id': 29,
    'title': 'Electric Kettle Stainless Steel',
    'description': '1.7L cordless electric kettle with rapid boil technology. Auto shut-off and boil-dry protection. Brushed stainless steel finish.',
    'category': 'Home & Living',
    'price': 39.99,
    'discountPercentage': 12.0,
    'rating': 4.5,
    'stock': 76,
    'tags': ['kettle', 'electric', 'kitchen'],
    'brand': 'BoilMaster',
    'sku': 'HL-BOI-KET-029',
    'weight': 2.1,
    'dimensions': {
      'width': 22.0,
      'height': 25.0,
      'depth': 18.0
    },
    'warrantyInformation': '2 year warranty',
    'shippingInformation': 'Ships in 2-3 business days',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '30 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-01-29T09:00:00.000Z',
      'updatedAt': '2025-01-29T09:00:00.000Z',
      'barcode': '1234567890151',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1621274403997-37aace184f49',
      'https://images.unsplash.com/photo-1556911820-98955aa0e5dc'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1621274403997-37aace184f49?w=200'
  },
  {
    'id': 30,
    'title': 'Faux Fur Throw Blanket',
    'description': 'Luxurious faux fur throw blanket in charcoal grey. Ultra-soft and warm, perfect for couch or bed. 50x60 inches. Machine washable.',
    'category': 'Home & Living',
    'price': 42.99,
    'discountPercentage': 16.0,
    'rating': 4.6,
    'stock': 102,
    'tags': ['blanket', 'faux fur', 'throw'],
    'brand': 'CozyHome',
    'sku': 'HL-COZ-THR-030',
    'weight': 1.6,
    'dimensions': {
      'width': 127.0,
      'height': 8.0,
      'depth': 152.0
    },
    'warrantyInformation': 'No warranty',
    'shippingInformation': 'Ships in 1-3 business days',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '30 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-01-29T11:40:00.000Z',
      'updatedAt': '2025-01-29T11:40:00.000Z',
      'barcode': '1234567890152',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf',
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=200'
  },
  {
    'id': 31,
    'title': 'Desk Lamp with USB Port',
    'description': 'Modern LED desk lamp with built-in USB charging port. Touch control, 3 brightness levels, and adjustable arm. Energy efficient.',
    'category': 'Home & Living',
    'price': 35.99,
    'discountPercentage': 10.0,
    'rating': 4.4,
    'stock': 94,
    'tags': ['lamp', 'desk', 'LED'],
    'brand': 'BrightWork',
    'sku': 'HL-BRW-LMP-031',
    'weight': 1.3,
    'dimensions': {
      'width': 18.0,
      'height': 45.0,
      'depth': 15.0
    },
    'warrantyInformation': '2 year warranty',
    'shippingInformation': 'Ships in 2-3 business days',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '30 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-01-30T10:05:00.000Z',
      'updatedAt': '2025-01-30T10:05:00.000Z',
      'barcode': '1234567890153',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c',
      'https://images.unsplash.com/photo-1544668149-9e0c4b6d2f4d'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=200'
  },
  {
    'id': 32,
    'title': 'Picture Frame Set',
    'description': 'Gallery wall frame set of 7 in black. Includes various sizes from 4x6 to 8x10. Mounting hardware and level included.',
    'category': 'Home & Living',
    'price': 48.99,
    'discountPercentage': 13.0,
    'rating': 4.5,
    'stock': 71,
    'tags': ['picture frames', 'wall art', 'gallery'],
    'brand': 'FrameIt',
    'sku': 'HL-FRA-PIC-032',
    'weight': 3.5,
    'dimensions': {
      'width': 45.0,
      'height': 4.0,
      'depth': 35.0
    },
    'warrantyInformation': '1 year warranty',
    'shippingInformation': 'Ships in 3-5 business days',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '30 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-01-30T13:20:00.000Z',
      'updatedAt': '2025-01-30T13:20:00.000Z',
      'barcode': '1234567890154',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1582037928769-181f2644ecb7',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1582037928769-181f2644ecb7?w=200'
  },
  {
    'id': 33,
    'title': 'Door Mat Indoor Outdoor',
    'description': 'Durable rubber-backed door mat with water-absorbent surface. 24x36 inches. Easy to clean and weather-resistant. Non-slip backing.',
    'category': 'Home & Living',
    'price': 26.99,
    'discountPercentage': 8.0,
    'rating': 4.3,
    'stock': 118,
    'tags': ['door mat', 'outdoor', 'indoor'],
    'brand': 'WelcomeHome',
    'sku': 'HL-WEL-MAT-033',
    'weight': 1.8,
    'dimensions': {
      'width': 61.0,
      'height': 1.5,
      'depth': 91.0
    },
    'warrantyInformation': '1 year warranty',
    'shippingInformation': 'Ships in 1-3 business days',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '30 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-01-31T09:35:00.000Z',
      'updatedAt': '2025-01-31T09:35:00.000Z',
      'barcode': '1234567890155',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1615529182904-14819c35db37',
      'https://images.unsplash.com/photo-1591696331111-ef9586a5b17a'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=200'
  },
  {
    'id': 34,
    'title': 'Knife Block Set',
    'description': "Professional 15-piece knife block set with high-carbon stainless steel blades. Includes chef's knife, bread knife, utility knives, and kitchen shears.",
    'category': 'Home & Living',
    'price': 99.99,
    'discountPercentage': 21.0,
    'rating': 4.7,
    'stock': 47,
    'tags': ['knives', 'kitchen', 'cutlery'],
    'brand': 'SharpEdge',
    'sku': 'HL-SHP-KNF-034',
    'weight': 4.8,
    'dimensions': {
      'width': 25.0,
      'height': 35.0,
      'depth': 15.0
    },
    'warrantyInformation': 'Lifetime warranty',
    'shippingInformation': 'Free shipping',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '60 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-01-31T12:00:00.000Z',
      'updatedAt': '2025-01-31T12:00:00.000Z',
      'barcode': '1234567890156',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1593618998160-e34014e67546',
      'https://images.unsplash.com/photo-1585501930728-952882220a8b'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=200'
  },
  {
    'id': 35,
    'title': 'Curtain Panels Blackout',
    'description': 'Thermal insulated blackout curtain panels, set of 2. 52x84 inches per panel. Noise reducing and energy efficient. Grommet top in navy blue.',
    'category': 'Home & Living',
    'price': 52.99,
    'discountPercentage': 18.0,
    'rating': 4.5,
    'stock': 86,
    'tags': ['curtains', 'blackout', 'window'],
    'brand': 'WindowPro',
    'sku': 'HL-WIN-CRT-035',
    'weight': 3.2,
    'dimensions': {
      'width': 132.0,
      'height': 213.0,
      'depth': 1.0
    },
    'warrantyInformation': '1 year warranty',
    'shippingInformation': 'Ships in 2-4 business days',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '30 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-02-01T10:15:00.000Z',
      'updatedAt': '2025-02-01T10:15:00.000Z',
      'barcode': '1234567890157',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace',
      'https://images.unsplash.com/photo-1564078516393-cf04bd966897'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=200'
  },
  {
    'id': 36,
    'title': 'Laundry Hamper with Lid',
    'description': 'Large capacity woven laundry hamper with removable liner and lid. Natural water hyacinth construction. Handles for easy transport.',
    'category': 'Home & Living',
    'price': 38.99,
    'discountPercentage': 11.0,
    'rating': 4.4,
    'stock': 79,
    'tags': ['laundry', 'hamper', 'storage'],
    'brand': 'CleanSpace',
    'sku': 'HL-CLN-HMP-036',
    'weight': 2.5,
    'dimensions': {
      'width': 40.0,
      'height': 55.0,
      'depth': 35.0
    },
    'warrantyInformation': '1 year warranty',
    'shippingInformation': 'Ships in 3-5 business days',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '30 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-02-01T13:40:00.000Z',
      'updatedAt': '2025-02-01T13:40:00.000Z',
      'barcode': '1234567890158',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a',
      'https://images.unsplash.com/photo-1620626011761-996317b8d101'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200'
  },
  {
    'id': 37,
    'title': 'Artificial Succulent Plants Set',
    'description': 'Set of 6 realistic artificial succulent plants in grey pots. No maintenance required. Perfect for desk, shelf, or windowsill decoration.',
    'category': 'Home & Living',
    'price': 23.99,
    'discountPercentage': 9.0,
    'rating': 4.3,
    'stock': 142,
    'tags': ['plants', 'artificial', 'decor'],
    'brand': 'FauxFlora',
    'sku': 'HL-FAU-PLA-037',
    'weight': 1.4,
    'dimensions': {
      'width': 30.0,
      'height': 12.0,
      'depth': 20.0
    },
    'warrantyInformation': 'No warranty',
    'shippingInformation': 'Ships in 1-2 business days',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '30 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-02-02T09:25:00.000Z',
      'updatedAt': '2025-02-02T09:25:00.000Z',
      'barcode': '1234567890159',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1459156212016-c812468e2115',
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1459156212016-c812468e2115?w=200'
  },
  {
    'id': 38,
    'title': 'Soap Dispenser Set',
    'description': 'Modern bathroom soap dispenser and toothbrush holder set. Marble pattern ceramic with matte black pumps. Includes lotion dispenser.',
    'category': 'Home & Living',
    'price': 31.99,
    'discountPercentage': 10.0,
    'rating': 4.5,
    'stock': 103,
    'tags': ['bathroom', 'soap dispenser', 'accessories'],
    'brand': 'BathDecor',
    'sku': 'HL-BTH-SOP-038',
    'weight': 1.6,
    'dimensions': {
      'width': 25.0,
      'height': 18.0,
      'depth': 10.0
    },
    'warrantyInformation': '6 month warranty',
    'shippingInformation': 'Ships in 2-3 business days',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '30 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-02-02T11:50:00.000Z',
      'updatedAt': '2025-02-02T11:50:00.000Z',
      'barcode': '1234567890160',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1621293955151-1c3fc2d8e281',
      'https://images.unsplash.com/photo-1580674285054-bed31119a72a'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1621293955151-1c3fc2d8e281?w=200'
  },
  {
    'id': 39,
    'title': 'Magazine Rack Stand',
    'description': 'Contemporary metal magazine rack with 3 tiers. Holds magazines, books, and newspapers. Black powder-coated finish. Freestanding design.',
    'category': 'Home & Living',
    'price': 33.99,
    'discountPercentage': 12.0,
    'rating': 4.4,
    'stock': 68,
    'tags': ['magazine rack', 'storage', 'living room'],
    'brand': 'ReadOrganize',
    'sku': 'HL-REA-MAG-039',
    'weight': 2.8,
    'dimensions': {
      'width': 35.0,
      'height': 60.0,
      'depth': 25.0
    },
    'warrantyInformation': '1 year warranty',
    'shippingInformation': 'Ships in 2-4 business days',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '30 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-02-03T10:30:00.000Z',
      'updatedAt': '2025-02-03T10:30:00.000Z',
      'barcode': '1234567890161',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1595428773037-430b7c78dd2c',
      'https://images.unsplash.com/photo-1505691723518-36a5ac3be353'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1595428773037-430b7c78dd2c?w=200'
  },
  {
    'id': 40,
    'title': 'Coasters Set Cork',
    'description': 'Set of 8 natural cork coasters with holder. Heat resistant and moisture absorbent. Protects furniture from water rings and scratches.',
    'category': 'Home & Living',
    'price': 16.99,
    'discountPercentage': 5.0,
    'rating': 4.2,
    'stock': 187,
    'tags': ['coasters', 'cork', 'tableware'],
    'brand': 'TableGuard',
    'sku': 'HL-TBL-CST-040',
    'weight': 0.5,
    'dimensions': {
      'width': 10.0,
      'height': 5.0,
      'depth': 10.0
    },
    'warrantyInformation': 'No warranty',
    'shippingInformation': 'Ships in 1-2 business days',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '30 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-02-03T14:00:00.000Z',
      'updatedAt': '2025-02-03T14:00:00.000Z',
      'barcode': '1234567890162',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1582543274751-330a18c5c6c0',
      'https://images.unsplash.com/photo-1570222094114-d054a817e56b'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1582543274751-330a18c5c6c0?w=200'
  },
  {
    'id': 41,
    'title': 'Classic White T-Shirt',
    'description': 'Premium cotton crew neck t-shirt in classic white. Soft, breathable fabric with reinforced seams. Perfect for everyday wear or layering.',
    'category': 'Fashion',
    'price': 19.99,
    'discountPercentage': 15.0,
    'rating': 4.5,
    'stock': 250,
    'tags': ['t-shirt', 'men', 'basics'],
    'brand': 'EssentialWear',
    'sku': 'FA-ESS-TSH-041',
    'weight': 0.2,
    'dimensions': {
      'width': 45.0,
      'height': 70.0,
      'depth': 1.0
    },
    'warrantyInformation': 'No warranty',
    'shippingInformation': 'Ships in 1-3 business days',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '30 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-02-04T09:00:00.000Z',
      'updatedAt': '2025-02-04T09:00:00.000Z',
      'barcode': '2345678901234',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200'
  },
  {
    'id': 42,
    'title': 'Slim Fit Jeans',
    'description': 'Modern slim fit denim jeans in dark wash. Stretch denim for comfort and mobility. Classic 5-pocket styling with button fly.',
    'category': 'Fashion',
    'price': 59.99,
    'discountPercentage': 20.0,
    'rating': 4.6,
    'stock': 180,
    'tags': ['jeans', 'denim', 'pants'],
    'brand': 'DenimCo',
    'sku': 'FA-DEN-JNS-042',
    'weight': 0.7,
    'dimensions': {
      'width': 40.0,
      'height': 100.0,
      'depth': 2.0
    },
    'warrantyInformation': 'No warranty',
    'shippingInformation': 'Free shipping',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '60 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-02-04T10:30:00.000Z',
      'updatedAt': '2025-02-04T10:30:00.000Z',
      'barcode': '2345678901235',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1542272604-787c3835535d',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200'
  },
  {
    'id': 43,
    'title': 'Floral Summer Dress',
    'description': 'Lightweight floral print sundress with adjustable straps. Flowy A-line silhouette perfect for summer. Available in multiple floral patterns.',
    'category': 'Fashion',
    'price': 45.99,
    'discountPercentage': 18.0,
    'rating': 4.7,
    'stock': 145,
    'tags': ['dress', 'women', 'summer'],
    'brand': 'FloralChic',
    'sku': 'FA-FLO-DRS-043',
    'weight': 0.3,
    'dimensions': {
      'width': 50.0,
      'height': 90.0,
      'depth': 1.5
    },
    'warrantyInformation': 'No warranty',
    'shippingInformation': 'Ships in 2-4 business days',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '30 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-02-04T12:00:00.000Z',
      'updatedAt': '2025-02-04T12:00:00.000Z',
      'barcode': '2345678901236',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200'
  },
  {
    'id': 44,
    'title': 'Leather Jacket',
    'description': 'Genuine leather moto jacket with asymmetric zipper. Multiple pockets and zippered cuffs. Soft, supple leather that ages beautifully.',
    'category': 'Fashion',
    'price': 249.99,
    'discountPercentage': 25.0,
    'rating': 4.8,
    'stock': 65,
    'tags': ['jacket', 'leather', 'outerwear'],
    'brand': 'UrbanEdge',
    'sku': 'FA-URB-JKT-044',
    'weight': 1.8,
    'dimensions': {
      'width': 55.0,
      'height': 65.0,
      'depth': 5.0
    },
    'warrantyInformation': '1 year warranty',
    'shippingInformation': 'Free shipping',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '30 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-02-05T09:30:00.000Z',
      'updatedAt': '2025-02-05T09:30:00.000Z',
      'barcode': '2345678901237',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5',
      'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200'
  },
  {
    'id': 45,
    'title': 'Cashmere Sweater',
    'description': 'Luxurious 100% cashmere crew neck sweater. Ultra-soft and warm. Available in neutral tones. Hand wash or dry clean only.',
    'category': 'Fashion',
    'price': 129.99,
    'discountPercentage': 22.0,
    'rating': 4.7,
    'stock': 98,
    'tags': ['sweater', 'cashmere', 'luxury'],
    'brand': 'CashmereCloud',
    'sku': 'FA-CAS-SWT-045',
    'weight': 0.4,
    'dimensions': {
      'width': 50.0,
      'height': 60.0,
      'depth': 3.0
    },
    'warrantyInformation': 'No warranty',
    'shippingInformation': 'Free shipping',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '30 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-02-05T11:15:00.000Z',
      'updatedAt': '2025-02-05T11:15:00.000Z',
      'barcode': '2345678901238',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200'
  },
  {
    'id': 46,
    'title': 'Running Shoes',
    'description': 'Lightweight athletic running shoes with cushioned sole. Breathable mesh upper and responsive foam midsole. Available in multiple colors.',
    'category': 'Fashion',
    'price': 89.99,
    'discountPercentage': 17.0,
    'rating': 4.6,
    'stock': 210,
    'tags': ['shoes', 'athletic', 'running'],
    'brand': 'SpeedFit',
    'sku': 'FA-SPD-SHO-046',
    'weight': 0.6,
    'dimensions': {
      'width': 30.0,
      'height': 12.0,
      'depth': 35.0
    },
    'warrantyInformation': '6 month warranty',
    'shippingInformation': 'Ships in 2-3 business days',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '60 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-02-05T13:40:00.000Z',
      'updatedAt': '2025-02-05T13:40:00.000Z',
      'barcode': '2345678901239',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200'
  },
  {
    'id': 47,
    'title': 'Blazer Tailored Fit',
    'description': 'Professional tailored blazer in charcoal grey. Notch lapel with two-button closure. Fully lined with interior pockets. Perfect for office or formal events.',
    'category': 'Fashion',
    'price': 139.99,
    'discountPercentage': 23.0,
    'rating': 4.7,
    'stock': 87,
    'tags': ['blazer', 'formal', 'workwear'],
    'brand': 'ExecutiveStyle',
    'sku': 'FA-EXE-BLZ-047',
    'weight': 0.9,
    'dimensions': {
      'width': 52.0,
      'height': 70.0,
      'depth': 4.0
    },
    'warrantyInformation': 'No warranty',
    'shippingInformation': 'Free shipping',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '30 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-02-06T09:00:00.000Z',
      'updatedAt': '2025-02-06T09:00:00.000Z',
      'barcode': '2345678901240',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf',
      'https://images.unsplash.com/photo-1593030561877-bed62573e5a0'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=200'
  },
  {
    'id': 48,
    'title': 'Yoga Leggings',
    'description': 'High-waisted yoga leggings with four-way stretch. Moisture-wicking fabric with hidden pocket. Squat-proof and perfect for workouts or casual wear.',
    'category': 'Fashion',
    'price': 38.99,
    'discountPercentage': 16.0,
    'rating': 4.5,
    'stock': 195,
    'tags': ['leggings', 'activewear', 'yoga'],
    'brand': 'FlexFit',
    'sku': 'FA-FLX-LEG-048',
    'weight': 0.3,
    'dimensions': {
      'width': 30.0,
      'height': 95.0,
      'depth': 1.0
    },
    'warrantyInformation': 'No warranty',
    'shippingInformation': 'Ships in 1-3 business days',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '30 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-02-06T11:25:00.000Z',
      'updatedAt': '2025-02-06T11:25:00.000Z',
      'barcode': '2345678901241',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8',
      'https://images.unsplash.com/photo-1598522325074-042db73aa4e6'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=200'
  },
  {
    'id': 49,
    'title': 'Wool Coat Winter',
    'description': 'Classic wool blend winter coat with belt. Double-breasted design with peaked lapels. Warm lining and deep pockets. Timeless style.',
    'category': 'Fashion',
    'price': 189.99,
    'discountPercentage': 28.0,
    'rating': 4.8,
    'stock': 72,
    'tags': ['coat', 'winter', 'wool'],
    'brand': 'WinterLux',
    'sku': 'FA-WIN-COT-049',
    'weight': 2.1,
    'dimensions': {
      'width': 58.0,
      'height': 110.0,
      'depth': 6.0
    },
    'warrantyInformation': '1 year warranty',
    'shippingInformation': 'Free shipping',
    'availabilityStatus': 'In Stock',
    'reviews': [],
    'returnPolicy': '30 day return policy',
    'minimumOrderQuantity': 1,
    'meta': {
      'createdAt': '2025-02-06T13:50:00.000Z',
      'updatedAt': '2025-02-06T13:50:00.000Z',
      'barcode': '2345678901242',
      'qrCode': 'https://cdn.dummyjson.com/public/qr-code.png'
    },
    'images': [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea'
    ],
    'thumbnail': 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=200'
  },
];

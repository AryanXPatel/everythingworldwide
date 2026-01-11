// src/data/products.ts
// Product data for Kinuami Shop

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  currency: string;
  images: {
    hero: string;
    gallery: string[];
  };
  includes?: string[];
  specs?: ProductSpec[];
  details?: string;
  features?: string[];
  shopifyVariantId?: string;
}

export const products: Product[] = [
  {
    id: 'kinuami-u',
    slug: 'kinuami-u',
    name: 'Kinuami U',
    subtitle: 'Foam Dispensing System',
    price: 499,
    currency: 'EUR',
    images: {
      hero: '/images/shop/Hero-product.webp',
      gallery: [
        '/images/products/Main_unit_front_angle.jpg',
        '/images/products/KINUAMI_U.jpg',
        '/images/products/kinuami_u_main_unit_front_thumbnail.jpg',
        '/images/products/Horizontal_angle_of_the_main_body_with_handles_hot.jpg',
      ],
    },
    includes: ['Main unit', 'Wall mount', 'Starter soap cartridge'],
    specs: [
      { label: 'Color', value: 'Matte White' },
      { label: 'Material', value: 'ABS Polymer + Stainless Steel' },
      { label: 'Dimensions', value: '120mm × 280mm × 95mm' },
      { label: 'Capacity', value: '300ml Foam Cartridge' },
      { label: 'Warranty', value: '2 Years' },
    ],
    details: 'The KINUAMI U transforms your daily shower into a precision ritual. Dense foam technology delivers the perfect cleanse every time, while engineered simplicity ensures years of reliable performance.',
    features: ['Automated foam dispensing', 'Wall-mounted design', 'Replaceable cartridges', 'Touch-free operation'],
    shopifyVariantId: 'gid://shopify/ProductVariant/XXXXXXXXXX',
  },
  {
    id: 'shower-head',
    slug: 'shower-head',
    name: 'Shower Head',
    subtitle: 'Dedicated Attachment',
    price: 79,
    currency: 'EUR',
    images: {
      hero: '/images/shop/shower-head.webp',
      gallery: ['/images/products/Dedicated_shower_head.jpg'],
    },
    includes: ['Shower head', 'Connection fitting'],
    specs: [
      { label: 'Color', value: 'Matte White' },
      { label: 'Material', value: 'ABS + Chrome Finish' },
      { label: 'Dimensions', value: '85mm × 240mm' },
      { label: 'Flow Rate', value: '9L/min' },
      { label: 'Compatibility', value: 'Standard 1/2" Connection' },
    ],
    details: 'Designed as the perfect companion to the KINUAMI U. Engineered water flow meets refined aesthetics.',
    features: ['Optimized spray pattern', 'Easy installation', 'Premium finish'],
    shopifyVariantId: 'gid://shopify/ProductVariant/YYYYYYYYYY',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

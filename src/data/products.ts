// src/data/products.ts
// Product data for Kinuami Shop

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
    shopifyVariantId: 'gid://shopify/ProductVariant/YYYYYYYYYY',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

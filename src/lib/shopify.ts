import Client from 'shopify-buy';

const client = Client.buildClient({
  domain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || 'your-store.myshopify.com',
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || '',
  apiVersion: '2024-01',
});

export default client;

export async function createCheckout(variantId: string) {
  const checkout = await client.checkout.create();
  const lineItemsToAdd = [{ variantId, quantity: 1 }];
  const newCheckout = await client.checkout.addLineItems(checkout.id, lineItemsToAdd);
  return newCheckout;
}

// Create checkout with multiple items from cart
export async function createCheckoutWithItems(
  items: Array<{ variantId: string; quantity: number }>
) {
  const checkout = await client.checkout.create();
  const lineItemsToAdd = items.map(item => ({
    variantId: item.variantId,
    quantity: item.quantity,
  }));
  const newCheckout = await client.checkout.addLineItems(checkout.id, lineItemsToAdd);
  return newCheckout;
}

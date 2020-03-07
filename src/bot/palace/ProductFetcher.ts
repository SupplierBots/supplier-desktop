import autoRetryRequest from 'bot/requests/autoRetryRequest';
import { createFetcher } from 'bot/requests/createFetcher';
import { ProductDetails } from 'types/Palace';

class ProductFetcher {
  constructor(private readonly url: string) {}

  public variantsFetcher = createFetcher(async () => {
    const details = await autoRetryRequest<ProductDetails>(this.url, true);
    const variants = details.variants
      .filter(v => v.available)
      .map(v => ({ id: v.id, name: v.public_title.toLowerCase() }));
    return variants;
  });
}

export default ProductFetcher;

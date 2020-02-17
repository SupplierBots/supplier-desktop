import autoRetryRequest from 'bot/requests/autoRetryRequest';
import { fetchOnce } from 'bot/requests/fetchOnce';
import { Palace } from 'types/Palace';

class ProductFetcher {
  constructor(private readonly url: string) {}

  public getVariants = fetchOnce(async () => {
    const details = await autoRetryRequest<Palace.ProductDetails>(this.url, true);
    const variants = details.variants
      .filter(v => v.available)
      .map(v => ({ id: v.id, name: v.public_title.toLowerCase() }));
    return variants;
  });
}

export default ProductFetcher;

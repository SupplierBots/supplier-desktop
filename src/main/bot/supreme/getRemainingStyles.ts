import { SupremeTask } from './SupremeTask';

export async function getRemainingStyles(this: SupremeTask) {
  return Promise.all(
    [
      ...(await this.document.querySelectorAll(
        'li a[data-style-name]:first-child:not(.selected), li button[data-style-name]:first-child:not(.selected)',
      )),
    ].map(async element => {
      const { styleName, url, soldOut } = await element.dataset;
      return {
        url,
        element,
        name: styleName,
        isSoldOut: soldOut.toLowerCase() === 'true',
      };
    }),
  );
}

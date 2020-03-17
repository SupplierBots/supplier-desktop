/* eslint-disable no-undef */

(async () => {
  localStorage.clear();

  if (typeof Supreme === 'undefined') return await reload();

  const payload = '$PRODUCT$';
  const externalStock = '$STOCK$';

  const { keywords, colors, anySize, anyColor } = payload;
  const sizeToFind = payload.size.value;

  let item = findItem(keywords);

  if (!item && externalStock) {
    loadExternalStock(externalStock);
    item = findItem(keywords);
  }

  if (!item) {
    return await reload();
  }

  const styles = await fetchStyles(item);
  if (!styles) return;
  const selectedStyle = selectStyle(styles, colors, anyColor);
  if (!selectedStyle) return;
  const availableSizes = selectedStyle.attributes.sizes.models.filter(
    s => s.attributes.stock_level !== 0,
  );
  const size = selectSize(availableSizes, sizeToFind, anySize);

  if (!size) {
    notifyTask('Sold out', 'Error');
    return;
  }

  setLastVisitedCookie(item, selectedStyle);
  await addToCart(size);

  window.location.href = 'https://www.supremenewyork.com/mobile/#checkout';

  function setLastVisitedCookie(item, style) {
    const date = new Date();
    date.setMonth(date.getMonth() + 6);
    date.setHours(date.getHours() + 1);
    const cookieValue = `products/${item.attributes.id}/${
      style.attributes.id
    };path=/; expires=${date.toUTCString()}`;
    document.cookie = `lastVisitedFragment=${cookieValue}`;
  }

  async function reload() {
    await sleep(1500);
    window.location.reload();
  }

  function addToCart(size) {
    notifyTask('Adding to cart', 'Action');
    const result = Promise.race([atcListener(size), atcRequest(size)]);

    if (!Supreme.app.cart.attributes.sizes.contains(size)) {
      Supreme.app.cart.addSizeToLocalStorage(size, 1);
      Supreme.app.cart.attributes.sizes.add(size, 1);
    }

    return result;
  }

  async function atcRequest(size) {
    const id = size.attributes.id.toString();

    while (!localStorage.hasOwnProperty(id)) {
      Supreme.app.cart.removeSizeDirectly(id);
      Supreme.app.cart.addSize(size);
      await sleep(1500);
    }

    return true;
  }

  async function atcListener(size) {
    const id = size.attributes.id.toString();

    while (!localStorage.hasOwnProperty(id)) {
      await sleep(10);
    }

    return true;
  }

  function selectSize(sizes, sizeToFind, anySize) {
    const primary = sizes.find(s => s.attributes.name.toLowerCase() === sizeToFind.toLowerCase());
    if (primary || !anySize) return primary;
    const secondary = sizes[Math.floor(Math.random() * sizes.length)];
    return secondary;
  }

  function selectStyle(styles, colors, anyColor) {
    const primary = styles.find(s => isMatch(s.attributes.name, colors));
    if (primary || !anyColor) return primary;
    const secondary = styles[Math.floor(Math.random() * styles.length)];
    return secondary;
  }

  function findItem(keywords) {
    const stock = Supreme.categories.models.flatMap(c => c.attributes.products.models.flat());
    return stock.find(item => isMatch(item.attributes.name, keywords));
  }

  async function sleep(ms) {
    await new Promise(resolve => setTimeout(resolve, ms));
  }

  async function fetchStyles(item) {
    const styles = await Promise.race([stylesListener(item), stylesRequest(item)]);
    return styles || null;
  }

  async function stylesListener(item) {
    while (!item.attributes.styles) {
      await sleep(10);
    }

    return item.attributes.styles.models;
  }

  async function stylesRequest(item) {
    while (!item.attributes.styles) {
      item.fetch();
      await sleep(1000);
    }
  }

  function isMatch(name, { positive, negative, multi }) {
    name = name.toLowerCase();
    if (!positive.every(p => name.includes(p))) return false;
    if (negative.some(n => name.includes(n))) return false;
    if (!multi) return true;

    for (const keyword of multi) {
      const words = keyword.split(' | ');
      if (!words.some(w => name.includes(w))) return false;
    }

    return true;
  }

  function notifyTask(message, type) {
    fetch('http://127.0.0.1:2140/status.json', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, type }),
    });
  }

  function loadExternalStock(externalStock) {
    allCategoriesAndProducts = externalStock;
    window.release_week = externalStock.release_week;
    window.release_date = externalStock.release_date;
    Supreme.categories = new Categories();
    Supreme.categories.populate(externalStock);
  }
})();

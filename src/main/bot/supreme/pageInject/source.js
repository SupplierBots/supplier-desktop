/* eslint-disable no-undef */

(async () => {
  localStorage.clear();

  if (typeof Supreme === 'undefined') return await reload();

  const payload = '$PRODUCT$';
  const externalStock = '$STOCK$';
  const items = [];

  const { keywords, colors, anySize, anyColor, anySizeOption } = payload;
  const sizeToFind = payload.size.value;

  let item = findItem(keywords);

  if (!item && externalStock) {
    loadExternalStock(externalStock);
    item = findItem(keywords);
  }

  if (!item) {
    return await reload();
  }

  items.push(item.attributes.name);

  const styles = await fetchStyles(item);
  if (!styles) {
    return await reload();
  }

  const selectedStyle = selectStyle(styles, colors, anyColor);
  if (!selectedStyle) {
    notifyTask('Sold out', 'Error');
    return;
  }

  const availableSizes = selectedStyle.attributes.sizes.models.filter(
    s => s.attributes.stock_level !== 0,
  );

  const size =
    selectedStyle.attributes.sizes.models.length > 1
      ? selectSize(availableSizes, sizeToFind, anySize)
      : availableSizes[0];

  if (!size) {
    console.log(selectedStyle);
    //notifyTask('Sold out', 'Error');
    return;
  }

  await addToCart(size);
  notifyTask('ATC', 'Action', items);

  async function reload() {
    await sleep(1500);
    window.location.reload();
  }

  async function addToCart(size) {
    notifyTask('Adding to cart', 'Action');
    const result = await Promise.race([atcListener(size), atcRequest(size)]);

    if (!Supreme.app.cart.attributes.sizes.contains(size)) {
      Supreme.app.cart.addSizeToLocalStorage(size, 1);
      Supreme.app.cart.attributes.sizes.add(size, 1);
    }
    setSessionIDs();
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
    if (primary || !anySize || !anySizeOption || sizes.length === 0) return primary;
    switch (anySizeOption.value) {
      case 'smallest': {
        return sizes[0];
      }
      case 'largest': {
        return sizes[sizes.length - 1];
      }
      case 'random': {
        return sizes[Math.floor(Math.random() * sizes.length)];
      }
      default: {
        return sizes[Math.floor(Math.random() * sizes.length)];
      }
    }
  }

  function selectStyle(styles, colors, anyColor) {
    const filteredStyles = filterStyles(colors, styles);
    const primary = findMatchingStyle(colors, filteredStyles);

    if (primary || !anyColor) return primary;
    const secondary = filteredStyles[Math.floor(Math.random() * filteredStyles.length)];
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
    if (!styles) {
      return null;
    }
    const availableStyles = styles.filter(st =>
      st.attributes.sizes.models.some(s => s.attributes.stock_level !== 0),
    );
    return availableStyles;
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

  function notifyTask(message, type, additionalInfo) {
    fetch('http://127.0.0.1:2140/status.json', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, type, additionalInfo }),
    });
  }

  function filterStyles(colors, styles) {
    for (let negative of colors.negative) {
      styles = styles.filter(s => !s.attributes.name.toLowerCase().includes(negative));
    }
    return styles;
  }

  function findMatchingStyle(colors, styles) {
    for (let targetColor of colors.positive) {
      const match = styles.find(s => s.attributes.name.toLowerCase().includes(targetColor));
      if (!match) continue;
      return match;
    }
    return null;
  }

  function loadExternalStock(externalStock) {
    allCategoriesAndProducts = externalStock;
    window.release_week = externalStock.release_week;
    window.release_date = externalStock.release_date;
    Supreme.categories = new Categories();
    Supreme.categories.populate(externalStock);
  }
})();

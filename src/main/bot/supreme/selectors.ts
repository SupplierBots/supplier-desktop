export const generateXPath = (
  tag: string,
  attribute: '@placeholder' | 'text()' | '@value',
  stringToContain: string,
  getParent = false,
  valuesToIgnore: string[] = [],
): string => {
  let xpath = `//${tag}[`;
  stringToContain = stringToContain.toLowerCase();
  for (let letter of stringToContain) {
    xpath += ` (contains(${attribute}, '${letter}') or contains(${attribute}, '${letter.toUpperCase()}')) and`;
  }
  xpath = xpath.slice(0, -4);

  valuesToIgnore.forEach(value => {
    value = value.toLowerCase();
    xpath += ` and not(contains(${attribute}, '${value}')) and not(contains(${attribute}, '${value.toUpperCase()}'))`;
  });

  xpath += ']';

  if (getParent) xpath += '/parent::*';

  return xpath;
};

const selectors = {
  addBtn: generateXPath('span', 'text()', 'add to', false, ['checkout', 'remove']),
  addBtnDesktop: generateXPath('input', '@value', 'add to', false, ['checkout', 'remove']),
  checkoutBtn: generateXPath('span', 'text()', 'checkout', true, ['add', 'remove', 'basket']),
  checkoutBtnDesktop: generateXPath('a', 'text()', 'checkout', false, ['add', 'remove', 'basket']),
  cvv: generateXPath('input', '@placeholder', 'cv', false, ['num', 'name']),
  creditCardNumber: generateXPath('input', '@placeholder', 'number', false, ['name', 'tel']),
  termsLabel:
    generateXPath('label', 'text()', 'I have read') +
    "//preceding::input[@type='checkbox' and not(contains(@id, 'address'))]",
  processBtn: generateXPath('span', 'text()', 'process', true, ['cancel', 'edit']),
  processBtnDesktop:
    generateXPath('input', '@value', 'process', false, ['cancel', 'edit']) + "[@type='submit']",
  cardTypeSelect: "//option[contains(text(),'astercard')]/parent::*",
  monthSelect: "//option[contains(text(),'06')]/parent::*",
  yearSelect: "//option[contains(text(),'2021')]/parent::*",
  itemName: "//*[@class='name']",
  itemSelectable: "//*[@class='selectable']",
  price: "//*[@class='price']",
  recaptchaCSS: "*[name='g-recaptcha-response']",
};

export default selectors;

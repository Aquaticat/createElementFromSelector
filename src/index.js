// Test cases

import createElementFromSelector from './createElementFromSelector.js';

//createElementFromSelectorAndAppendItToBody
const cESAB = ((selectors) => {
  document.body.appendChild(createElementFromSelector(selectors));
});

const cESABCatch = ((selectors) => {
  try {
    const htmlElement = createElementFromSelector(selectors);
    document.body.appendChild(htmlElement);

  } catch (e) {
    console.error(e);
  }
});

//region Valid

[
  'div',
  'div#border-inline-start-color-white',
  'div.border-inline-end-color-green',
  'div#border-inline-start-color-white.border-inline-end-color-green',
  'div[border-block-start-color="yellow"]',
  'div[border-block-start-color=\'orange\']',
  'div[border-block-start-color]',
  'div[border-block-end-color][border-block-start-color="purple"]',
  'div[border-block-end-color][border-block-start-color="purple"].border-inline-end-color-green#border-inline-start-color-white',
  'my-element[border-block-end-color][border-block-start-color="yellow"].border-inline-end-color-green#border-inline-start-color-white',

  // FIXedME: Failing the # inside attribute value test.
  'a#a[href="#a"]',
].forEach((selectors) => {
  cESAB(selectors);
});

//endregion

[
  'invalid',
  'div ',
  ' div',
  'font-face',
  '#div',
  '.div',
  '[div]',
  'div[div*="1"]',
  'div[div="1\']',
  'div[div=\'1"]',
  'div[div=1]',
  'div[div][div="1"]',
  "div.div.div",
  "",
  " ",
].forEach((selectors) => {
  cESABCatch(selectors);
})

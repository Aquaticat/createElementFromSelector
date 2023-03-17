const potentialBuiltinElementNames = new Set([
                                               'a',
                                               'abbr',
                                               'acronym',
                                               'abbr',
                                               'address',
                                               'applet',
                                               'embed',
                                               'object',
                                               'area',
                                               'article',
                                               'aside',
                                               'audio',
                                               'b',
                                               'base',
                                               'basefont',
                                               'bdi',
                                               'bdo',
                                               'big',
                                               'blockquote',
                                               'body',
                                               'br',
                                               'button',
                                               'canvas',
                                               'caption',
                                               'center',
                                               'cite',
                                               'code',
                                               'col',
                                               'colgroup',
                                               'data',
                                               'datalist',
                                               'dd',
                                               'del',
                                               'details',
                                               'dfn',
                                               'dialog',
                                               'dir',
                                               'ul',
                                               'div',
                                               'dl',
                                               'dt',
                                               'em',
                                               'embed',
                                               'fieldset',
                                               'figcaption',
                                               'figure',
                                               'font',
                                               'footer',
                                               'form',
                                               'frame',
                                               'frameset',
                                               'h1 to <h6>',
                                               'head',
                                               'header',
                                               'hr',
                                               'html',
                                               'i',
                                               'iframe',
                                               'img',
                                               'input',
                                               'ins',
                                               'kbd',
                                               'label',
                                               'legend',
                                               'li',
                                               'link',
                                               'main',
                                               'map',
                                               'mark',
                                               'meta',
                                               'meter',
                                               'nav',
                                               'noframes',
                                               'noscript',
                                               'object',
                                               'ol',
                                               'optgroup',
                                               'option',
                                               'output',
                                               'p',
                                               'param',
                                               'picture',
                                               'pre',
                                               'progress',
                                               'q',
                                               'rp',
                                               'rt',
                                               'ruby',
                                               's',
                                               'samp',
                                               'script',
                                               'section',
                                               'select',
                                               'small',
                                               'source',
                                               'span',
                                               'strike',
                                               'del',
                                               's',
                                               'strong',
                                               'style',
                                               'sub',
                                               'summary',
                                               'sup',
                                               'svg',
                                               'table',
                                               'tbody',
                                               'td',
                                               'template',
                                               'textarea',
                                               'tfoot',
                                               'th',
                                               'thead',
                                               'time',
                                               'title',
                                               'tr',
                                               'track',
                                               'tt',
                                               'u',
                                               'ul',
                                               'var',
                                               'video',
                                               'wbr',
                                             ]);

// See https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name
//
// Constant PCENChar Cannot be used because it's not easy to construct a new Regex based on an existing Regex. Here for reference.
// const PCENChar = /-|\.|[0-9]|_|[a-z]|\u{b7}|[\u{c0}-\u{d6}]|[\u{d8}-\u{f6}]|[\u{f8}-\u{37d}]|[\u{37f}-\u{1FFF}]|[\u{200c}-\u{200d}]|[\u{203f}-\u{2040}]|[\u{2070}-\u{218f}]|[\u{2c00}-\u{2fef}]|[\u{3001}-\u{d7ff}]|[\u{f900}-\u{fdcf}]|[\u{fdf0}-\u{fffd}]|[\u{10000}-\u{effff}]/u;
const potentialCustomElementNameRegex = /[a-z](?:-|\.|[0-9]|_|[a-z]|\u{b7}|[\u{c0}-\u{d6}]|[\u{d8}-\u{f6}]|[\u{f8}-\u{37d}]|[\u{37f}-\u{1FFF}]|[\u{200c}-\u{200d}]|[\u{203f}-\u{2040}]|[\u{2070}-\u{218f}]|[\u{2c00}-\u{2fef}]|[\u{3001}-\u{d7ff}]|[\u{f900}-\u{fdcf}]|[\u{fdf0}-\u{fffd}]|[\u{10000}-\u{effff}])*?-(?:-|\.|[0-9]|_|[a-z]|\u{b7}|[\u{c0}-\u{d6}]|[\u{d8}-\u{f6}]|[\u{f8}-\u{37d}]|[\u{37f}-\u{1FFF}]|[\u{200c}-\u{200d}]|[\u{203f}-\u{2040}]|[\u{2070}-\u{218f}]|[\u{2c00}-\u{2fef}]|[\u{3001}-\u{d7ff}]|[\u{f900}-\u{fdcf}]|[\u{fdf0}-\u{fffd}]|[\u{10000}-\u{effff}])*/u;

const prohibitedElementNames = new Set([
                                         'annotation-xml',
                                         'color-profile',
                                         'font-face',
                                         'font-face-src',
                                         'font-face-url',
                                         'font-face-format',
                                         'font-face-name',
                                         'missing-glyph',
                                       ]);


const splitOnceWithRemain = (inputString, separator) => {
  const indexOfSeparatorSearch = inputString.search(separator);

  if (indexOfSeparatorSearch === -1) {
    return [inputString, ''];
  }

  if (indexOfSeparatorSearch === 0) {
    const inputStringWithoutStartingSeparator = inputString.replace(separator, '');
    const indexOfSecondSeparator = inputStringWithoutStartingSeparator.search(separator);

    if (indexOfSecondSeparator === -1) {
      return [inputString, ''];
    }

    const startingSeparatorLength = inputString.length - inputStringWithoutStartingSeparator.length;

    console.log(6, indexOfSeparatorSearch, inputStringWithoutStartingSeparator, indexOfSecondSeparator, startingSeparatorLength);

    return [inputString.slice(0, indexOfSecondSeparator + startingSeparatorLength), inputString.slice(indexOfSecondSeparator + startingSeparatorLength)];
  }

  return [inputString.slice(0, indexOfSeparatorSearch), inputString.slice(indexOfSeparatorSearch)];
}

const processOtherSelectors = (htmlElement, otherSelectors) => {
  // See https://stackoverflow.com/a/31773673
  otherSelectors.trim() === otherSelectors || (() => {
    throw new SyntaxError(
      `Invalid CSS selectors for creating one element.
Please ensure there is no space between the selectors.`);
  })();

  if (!otherSelectors) {
    return htmlElement;
  }

  (otherSelectors === otherSelectors.trim()) || (() => {
    throw new SyntaxError(`Invalid CSS selectors for creating one element.
Please ensure there is no space between the selectors.`);
  })();

  const [currentSelector, nextSelectors] = splitOnceWithRemain(otherSelectors, /\[.+?(?<!\\(?:\\\\)*)]|\.|#/);

  console.log('1', otherSelectors);
  console.log('2', currentSelector,'and', nextSelectors);

  currentSelector.slice(1) || (() => {
    throw new SyntaxError(`Invalid CSS selectors for creating one element.
Please ensure all selectors are not empty.`);
  })();


    if ( currentSelector.startsWith('#')) {
      const currentSelectorName = currentSelector.slice(1);

      htmlElement.id && (() => {
        throw new SyntaxError(
          `Invalid CSS selectors for creating one element.
        Please ensure there is only one id inside the selectors.
        ids currently found are: "${htmlElement.id}" and "${currentSelectorName}".`);
      })();

      htmlElement.id = currentSelectorName;

      return processOtherSelectors(htmlElement, nextSelectors);
    }

    if (currentSelector.startsWith('.')) {
      const currentSelectorName = currentSelector.slice(1);

      htmlElement.classList.contains(currentSelectorName) && (() => {
        throw new SyntaxError(`Invalid CSS selectors for creating one element.
      Please ensure every class is only defined once.
      The class defined repeatedly is "${currentSelectorName}".`);
      })();

      htmlElement.classList.add(currentSelectorName);

      return processOtherSelectors(htmlElement, nextSelectors);
    }

    if ( currentSelector.startsWith('[') && currentSelector.endsWith(']')) {
      const currentSelectorName = currentSelector.slice(1, -1);

      [' i', ' s'].some((compareOptionsAndClosingSquareBracket) => currentSelectorName.endsWith(
        compareOptionsAndClosingSquareBracket))
      && (() => {
        throw new SyntaxError(`Invalid CSS selectors for creating one element.
      Matching attribute value with modifiers is not supported.`);
      })();

      //region Refactor this part. Try not to write two separate duplicate statements for checking quotes.
      let quote = '"';

      let [attributeName, separatorAndAttributeValueAndQuote] = splitOnceWithRemain(currentSelectorName, `=${quote}`);
      console.log(4, currentSelectorName, attributeName, separatorAndAttributeValueAndQuote);

      let returnValue;
      (attributeName && separatorAndAttributeValueAndQuote.slice(2)) || (() => {
        quote = '\'';

        [attributeName, separatorAndAttributeValueAndQuote] = splitOnceWithRemain(currentSelectorName, `=${quote}`);
      console.log(4.2, currentSelectorName, attributeName, separatorAndAttributeValueAndQuote);

        (attributeName && separatorAndAttributeValueAndQuote.slice(2)) || (() => {
          currentSelectorName.match(/(?<!\\\\)(?:\\\\\\\\)*['"=\s]/) && (() =>{  throw new SyntaxError(`Invalid CSS selectors for creating one element.
      Please ensure the attribute selector "${currentSelector}" is valid.`);})();

          htmlElement.hasAttribute(currentSelectorName) && (() => {
            throw new SyntaxError(`Invalid CSS selectors for creating one element.
      Please ensure the attribute selector attribute name "${currentSelectorName}" is not duplicate.`);
          })()

          htmlElement.setAttribute(currentSelectorName, '');

          returnValue = processOtherSelectors(htmlElement, nextSelectors);
        })();
      })();
      if (returnValue) return returnValue;
      //endregion

      console.log(5, currentSelectorName, attributeName, separatorAndAttributeValueAndQuote);

      ['~', '|', '^', '$', '*'].some((qualifier) => attributeName.endsWith(qualifier)) && (() => {
        throw new SyntaxError(`Invalid CSS selectors for creating one element.
      Matching attribute value with modifiers is not supported.`);
      })();

      separatorAndAttributeValueAndQuote.slice(-1) === quote || (() => {
        throw new SyntaxError(`Invalid CSS selectors for creating one element.
        Potentially non-matching quotes of starting quote "${quote}" and ending quote "${separatorAndAttributeValueAndQuote.slice(-1)}".
        Please ensure the attribute selector "${currentSelector}" is valid.`);
      })();

      const attributeValue = separatorAndAttributeValueAndQuote.slice(2, -1);

      attributeValue === attributeValue.trim() || (() => {
        throw new SyntaxError(`Invalid CSS selectors for creating one element.
          Please ensure the attribute value "${attributeValue}" does not have whitespace characters around it.`);
      })();

      attributeValue.match(new RegExp(`(?<!\\\\)(?:\\\\\\\\)*${quote}`)) && (() => {
        throw new SyntaxError(`Invalid CSS selectors for creating one element.
          Please ensure the attribute value "${attributeValue}" does not have unescaped quotes.`);
      })();

      htmlElement.hasAttribute(attributeName) && (() => {
        throw new SyntaxError(`Invalid CSS selectors for creating one element.
      Please ensure the attribute selector attribute name "${attributeName}" is not duplicate.`);
      })();

      htmlElement.setAttribute(attributeName, attributeValue);

      return processOtherSelectors(htmlElement, nextSelectors);
    }

    throw new SyntaxError(`Invalid CSS selectors for creating one element.
      Selector "${currentSelector}" is invalid or not supported.
      Supported selector types are:
      id, "#";
      class, ".";
      attribute selectors, "["`);
};

const createElementFromSelector = (selectors) => {
  console.log(selectors);

  const [tagName, otherSelectors] = splitOnceWithRemain(selectors, /[#\[.]/);
  console.log(0, tagName, otherSelectors);

  (
    (
      potentialBuiltinElementNames.has(tagName)
      ||
      tagName.match(potentialCustomElementNameRegex)
    )
    &&
    !prohibitedElementNames.has(tagName)
  )
  || (() => {
    throw new SyntaxError(`Invalid CSS selectors for creating one element.
Tag name has to present and be at the front of the selectors. Therefore, the first selector of the selectors is assumed to be the tag name.
Please ensure the tag name "${tagName}" is either a builtin tag name or a valid custom element name.
For a list of builtin tag names, see https://developer.mozilla.org/en-US/docs/Web/HTML/Element
For choosing a valid custom element name, see https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name`);
  })();

  const htmlElement = document.createElement(tagName);

  return (otherSelectors)
         ? processOtherSelectors(htmlElement, otherSelectors)
         : htmlElement;
};

export default createElementFromSelector;

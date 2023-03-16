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
// The last character in the last alternate group should be \u{983039}
// However, JavaScript doesn't support a digit that large at this time.
// Therefore, we are using \u{99999} at this time instead.
const potentialCustomElementNameRegex = /[a-z](?:-|\.|[0-9]|_|[a-z]|\xB7|[\xC0-\xD6]|[\xD8-\xF6]|[\xF8-\u0893]|[\u0895-\u8191]|[\u8204-\u8205]|[\u8255-\u8256]|[\u8304-\u8591]|[\u{11264}-\u{12271}]|[\u{12289}-\u{55295}]|[\u{63744}-\u{64975}]|[\u{65008}-\u{65533}]|[\u{65536}-\u{99999}])*-(?:-|\.|[0-9]|_|[a-z]|\xB7|[\xC0-\xD6]|[\xD8-\xF6]|[\xF8-\u0893]|[\u0895-\u8191]|[\u8204-\u8205]|[\u8255-\u8256]|[\u8304-\u8591]|[\u{11264}-\u{12271}]|[\u{12289}-\u{55295}]|[\u{63744}-\u{64975}]|[\u{65008}-\u{65533}]|[\u{65536}-\u{99999}])*/u;

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


const splitOnceWithRemain = (inputString, separator, separatorLength = 0) => {
  // Assume separator's length is zero. (By using Regex lookaround.)

  const indexOfSeparator = (inputString.split(separator, 2)[0]).length;
  console.log(indexOfSeparator);

  return [inputString.slice(0, indexOfSeparator), inputString.slice(indexOfSeparator + separatorLength)];
};

const processOtherSelectors = (htmlElement, otherSelectors) => {
  if (!otherSelectors) {
    return htmlElement;
  }

  (otherSelectors === otherSelectors.trim()) || (() => {
    throw new SyntaxError(`Invalid CSS selectors for creating one element.
Please ensure there is no space between the selectors.`);
  })();

  const [currentSelector, nextSelectors] = splitOnceWithRemain(otherSelectors, /(?=[#\[.])/);

  console.log('1', otherSelectors);
  console.log('2', currentSelector, nextSelectors);

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

      let [attributeName, attributeValueAndQuote] = splitOnceWithRemain(currentSelectorName, `=${quote}`, 2);
      console.log(4, currentSelectorName, attributeName, attributeValueAndQuote);

      let returnValue;
      (attributeName && attributeValueAndQuote) || (() => {
        quote = '\'';

        [attributeName, attributeValueAndQuote] = splitOnceWithRemain(currentSelectorName, `=${quote}`, 2);
      console.log(4.2, currentSelectorName, attributeName, attributeValueAndQuote);

        (attributeName && attributeValueAndQuote) || (() => {
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

      console.log(5, currentSelectorName, attributeName, attributeValueAndQuote);

      ['~', '|', '^', '$', '*'].some((qualifier) => attributeName.endsWith(qualifier)) && (() => {
        throw new SyntaxError(`Invalid CSS selectors for creating one element.
      Matching attribute value with modifiers is not supported.`);
      })();

      attributeValueAndQuote.slice(-1) === quote || (() => {
        throw new SyntaxError(`Invalid CSS selectors for creating one element.
        Potentially non-matching quotes of starting quote "${quote}" and ending quote "${attributeValueAndQuote.slice(-1)}".
        Please ensure the attribute selector "${currentSelector}" is valid.`);
      })();

      const attributeValue = attributeValueAndQuote.slice(0, -1);

      attributeValue === attributeValue.trim() || (() => {
        throw new SyntaxError(`Invalid CSS selectors for creating one element.
          Please ensure the attribute value "${attributeValue} does not have whitespace characters around it.`);
      })();

      attributeValue.match(new RegExp(`(?<!\\\\)(?:\\\\\\\\)*${quote}`)) && (() => {
        throw new SyntaxError(`Invalid CSS selectors for creating one element.
          Please ensure the attribute value "${attributeValue} does not have unescaped quotes.`);
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

  const [tagName, otherSelectors] = splitOnceWithRemain(selectors, /(?=[#\[.])/);
  console.log(0, tagName, otherSelectors);

  // See https://stackoverflow.com/a/31773673
  otherSelectors?.match(/\s/) && (() => {
    throw new SyntaxError(
      `Invalid CSS selectors for creating one element.
Please ensure there is no space between the selectors.`);
  })();

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

# createElementFromSelector

Create an HTMLElement from CSS selectors.

## Install

One of:

### npm

```shell
npm install @aquaticat/create-element-from-selector
```

### yarn

```shell
yarn add @aquaticat/create-element-from-selector
```

### pnpm

```shell
pnpm add @aquaticat/create-element-from-selector
```

## Use

```js
import createElementFromSelector from '@aquaticat/create-element-from-selector';
```

## Profit

Example JavaScript code:

```js
document.body.appendChild(createElementFromSelector('a[autofocus].many.thanks[href="https:////aquati.cat"]#Author_of_createElementFromSelector'));
```

Would result in expected HTML:

```html
<html>
<body>
<a autofocus class="many thanks" href="https://aquati.cat" id="Author_of_createElementFromSelector"></a>
</body>
</html>
```

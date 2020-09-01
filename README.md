# Equalizer

Equalizer is an es6 Class which can be used to easily match the height of multiple elements using names to isolate matching groups.

## Installation

with webpack

```bash
yarn add @meteora-digital/equalizer
```

## HTML Usage

```html
<section data-equalize>
  <div data-equalize-watch></div>
  <div data-equalize-watch></div>
</section>
```
## Or
```html
<section data-equalize="selector">
  <div data-equalize-watch="selector"></div>
  <div data-equalize-watch="selector"></div>
</section>
```
## Or
```html
<section data-equalize="selector1, selector2">
  <div data-equalize-watch="selector1">
    <div data-equalize-watch="selector2"></div>
  </div>
  <div data-equalize-watch="selector1">
    <div data-equalize-watch="selector2"></div>
  </div>
</section>
```

```es6
import Equalizer from '@meteora-digital/equalizer';

document.querySelectorAll('[data-equalize]').forEach((group) => new Equalizer(group));
```

## License
[MIT](https://choosealicense.com/licenses/mit/)


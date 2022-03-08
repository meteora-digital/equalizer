# Equalizer

Equalizer is an es6 Class which can be used to easily match the height of multiple elements using names to isolate matching groups.

##### Note: version 1.0.0 has breaking changes. Please update your code, or lock your version to 0.1.9 to avoid errors

### Installation

```bash
yarn add @meteora-digital/equalizer
npm i @meteora-digital/equalizer
```

### HTML Usage

```html
<section data-equalize>
  <div data-equalize-watch></div>
  <div data-equalize-watch></div>
</section>
```

```html
<section data-equalize="selector">
  <div data-equalize-watch="selector"></div>
  <div data-equalize-watch="selector"></div>
</section>
```

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

document.addEventListener('DOMContentLoaded', () => {
    const equalizers = document.querySelectorAll('[data-equalize]');
    
    for (let index = 0; index < equalizers.length; index++) {
        const container = equalizers[index];

        new Equalizer({
            container,
            identifiers: container.getAttribute('data-equalize'),
            rows: true,
        });
    }
});
```

## Usage

When you create a new Equalizer, you need to pass 3 arguments

| Argument | Description |
|----------|-------------|
| container | The container is the element that is holding the items we want to resize |
| identifiers | The identifiers is a string of comma separated values that are used to match the elements we want to resize. The identifiers can be a selector, or a comma separated list of selectors. The container will be searched for child elements that have a matching identifier within a data-equalize-watch attribute. |
| rows | The rows is a boolean that determines whether we want to resize the elements in rows or not. If not all elements will be the same height regardless of their position on the page. |

## License
[MIT](https://choosealicense.com/licenses/mit/)

# 


import { attach, Event, nodeArray, objectAssign, offset } from '@meteora-digital/helpers';

class Equalizer {
  constructor(el, options = {}) {
    this.container = el;
    this.children = this.getChildren();
    this.rows = this.getRows();
    this.event = new Event('equalized');
    window.equalizing = null;

    this.settings = objectAssign({
      rows: false,
    }, options);


    attach(window, 'resize', () => this.equalize(), 500);
  }

  equalize() {
    this.matchHeight((this.settings.rows) ? this.rows : this.children);
  }

  getChildren() {
    this.children = {};

    try {
      this.container.getAttribute('data-equalize').split(',').forEach((id) => this.children[id] = nodeArray(this.container.querySelectorAll(`[data-equalize-watch="${id}"]`)));
    }catch (err) {
      this.children.main = nodeArray(this.container.querySelectorAll('[data-equalize-watch]'));
    }

    return this.children;
  }

  getRows() {
    this.rows = {};
    this.matchHeight(this.children);

    let offsetY = 0;

    for (let group in this.children) {
      this.children[group].forEach((child) => {
        offsetY = offset(child).y;
        (this.rows[offsetY]) ? this.rows[offsetY].push(child) : this.rows[offsetY] = [child];
      });
    }

    return this.rows;
  }

  matchHeight(children = false) {
    clearTimeout(window.equalizing);

    // Check to see if we passed in some children or not
    if (children === false) children = this.children;

    // loop through all the child groups
    for (let group in children) {
      // initialise the height at 0 for each group
      this.height = 0;

      // set height to auto so it can be adjusted
      children[group].forEach((child) => {
        child.style.height = 'auto';
      });

      // set the height to the child's height if it is larger than the previous child
      children[group].forEach((child) => {
        if (child.clientHeight > this.height) this.height = child.clientHeight;
      });

      // set all children to the same height
      children[group].forEach((child) => child.style.height = this.height + 'px');
    }

    // send the equalized event to the window
    this.complete();
  }

  complete() {
    window.equalizing = setTimeout(() => {
      window.dispatchEvent(this.event);
    }, 100);
  }

  update() {
    this.children = this.getChildren();
    this.rows = this.getRows();
    this.equalize();
  }
}

export default Equalizer;

// ======================================================
// JavaScript Usage
// ======================================================

// import Equalizer from './equalizer';

// document.querySelectorAll('[data-equalize]').forEach((group) => new Equalizer(group));

// ======================================================
// HTML Usage
// ======================================================

// <section data-equalize>
//   <div data-equalize-watch></div>
//   <div data-equalize-watch></div>
// </section>

// OR ===================================================

// <section data-equalize="selector">
//   <div data-equalize-watch="selector"></div>
//   <div data-equalize-watch="selector"></div>
// </section>

// OR ===================================================

// <section data-equalize="selector1, selector2">
//   <div data-equalize-watch="selector1">
//      <div data-equalize-watch="selector2"></div>
//   </div>
//   <div data-equalize-watch="selector1">
//      <div data-equalize-watch="selector2"></div>
//   </div>
// </section>
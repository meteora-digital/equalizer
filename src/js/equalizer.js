import {attach, Event, nodeArray} from '@meteora-digital/helpers';

class Equalizer {
  constructor(el) {
    this.container = el;
    this.children = this.getChildren();
    this.event = new Event('equalized');
    window.equalizing = false;

    attach(window, 'resize', () => this.matchHeight(), 500);
  }

  getChildren() {
    let childArray = [];

    try {
      let targetArray = this.container.getAttribute('data-equalize').split(',');
      targetArray.forEach((id) => childArray.push(this.container.querySelectorAll(`[data-equalize-watch="${id}"]`)));
    } catch(err) {
      childArray.push(this.container.querySelectorAll(`[data-equalize-watch]`));
    }

    return childArray;
  }

  matchHeight() {
    // set height to auto so it can be adjusted
    this.children.forEach((group) => {
      nodeArray(group).forEach((child) => {
        child.style.height = 'auto';
      });
    });

    // now match all their heights
    this.children.forEach((group) => {
      let groupArr = nodeArray(group);
      this.height = 0;

      groupArr.forEach((child) => {
        if (child.clientHeight > this.height) this.height = child.clientHeight;
      });

      groupArr.forEach((child) => child.style.height = this.height + 'px');
    });

    if (window.equalizing === false) {
      window.equalizing = true;
      window.dispatchEvent(this.event);
      setTimeout(() => window.equalizing = false, 500);
    }
  }

  update() {
    this.children = this.getChildren();
    this.matchHeight();
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

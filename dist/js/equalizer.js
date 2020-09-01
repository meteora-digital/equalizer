function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import { attach, Event, nodeArray } from '@meteora-digital/helpers';

var Equalizer = /*#__PURE__*/function () {
  function Equalizer(el) {
    var _this = this;

    _classCallCheck(this, Equalizer);

    this.container = el;
    this.children = this.getChildren();
    this.event = new Event('equalized');
    attach(window, 'resize', function () {
      return _this.matchHeight();
    }, 500);
  }

  _createClass(Equalizer, [{
    key: "getChildren",
    value: function getChildren() {
      var _this2 = this;

      var childArray = [];

      try {
        var targetArray = this.container.getAttribute('data-equalize').split(',');
        targetArray.forEach(function (id) {
          return childArray.push(_this2.container.querySelectorAll("[data-equalize-watch=\"".concat(id, "\"]")));
        });
      } catch (err) {
        childArray.push(this.container.querySelectorAll("[data-equalize-watch]"));
      }

      return childArray;
    }
  }, {
    key: "matchHeight",
    value: function matchHeight() {
      var _this3 = this;

      // set height to auto so it can be adjusted
      this.children.forEach(function (group) {
        nodeArray(group).forEach(function (child) {
          child.style.height = 'auto';
        });
      }); // now match all their heights

      this.children.forEach(function (group) {
        var groupArr = nodeArray(group);
        _this3.height = 0;
        groupArr.forEach(function (child) {
          if (child.clientHeight > _this3.height) _this3.height = child.clientHeight;
        });
        groupArr.forEach(function (child) {
          return child.style.height = _this3.height + 'px';
        });
      });
      window.dispatchEvent(this.event);
    }
  }, {
    key: "update",
    value: function update() {
      this.children = this.getChildren();
      this.matchHeight();
    }
  }]);

  return Equalizer;
}();

export default Equalizer; // ======================================================
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
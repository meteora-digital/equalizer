"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _meteora = require("meteora");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Equalizer = /*#__PURE__*/function () {
  function Equalizer(el) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Equalizer);

    this.container = el;
    this.children = this.getChildren();
    this.rows = this.getRows();
    this.event = new _meteora.Event('equalized');
    this.timeout = null;
    window.equalizing = null; // Some data we will use with a cache

    this.cache = {
      window: {
        innerWidth: -1
      }
    };
    this.settings = (0, _meteora.objectAssign)({
      rows: false
    }, options);
    (0, _meteora.attach)(window, 'resize', function () {
      // Prevent the elements from equalizing if we only resized vertically as this "shouldn't" break any layouts
      if (_this.cache.window.innerWidth !== window.innerWidth) {
        // Update the cache
        _this.cache.window.innerWidth = window.innerWidth; // Equalize

        if (_this.settings.rows) _this.rows = _this.getRows();

        _this.equalize();
      }
    }, 500);
  }

  _createClass(Equalizer, [{
    key: "equalize",
    value: function equalize() {
      var _this2 = this;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(function () {
        if (_this2.settings.rows) {
          for (var group in _this2.rows) {
            _this2.matchHeight(_this2.rows[group]);
          }
        } else {
          _this2.matchHeight(_this2.children);
        }
      }, 500);
    }
  }, {
    key: "getChildren",
    value: function getChildren() {
      var _this3 = this;

      this.children = {};
      this.ids = this.container.getAttribute('data-equalize');

      if (this.ids === "") {
        this.children.main = (0, _meteora.nodeArray)(this.container.querySelectorAll('[data-equalize-watch]'));
      } else {
        try {
          this.container.getAttribute('data-equalize').split(',').forEach(function (id) {
            return _this3.children[id] = (0, _meteora.nodeArray)(_this3.container.querySelectorAll("[data-equalize-watch=\"".concat(id, "\"]")));
          });
        } catch (err) {
          this.children[this.ids] = (0, _meteora.nodeArray)(this.container.querySelectorAll('[data-equalize-watch]'));
        }
      }

      return this.children;
    }
  }, {
    key: "getRows",
    value: function getRows() {
      var _this4 = this;

      this.rows = {};
      this.matchHeight(this.children);
      var offsetY = 0;

      var _loop = function _loop(group) {
        _this4.rows[group] = {};

        _this4.children[group].forEach(function (child) {
          offsetY = (0, _meteora.offset)(child).y;
          _this4.rows[group][offsetY] ? _this4.rows[group][offsetY].push(child) : _this4.rows[group][offsetY] = [child];
        });
      };

      for (var group in this.children) {
        _loop(group);
      }

      return this.rows;
    }
  }, {
    key: "matchHeight",
    value: function matchHeight() {
      var _this5 = this;

      var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      clearTimeout(window.equalizing); // Check to see if we passed in some children or not

      if (children === false) children = this.children; // loop through all the child groups

      for (var group in children) {
        // initialise the height at 0 for each group
        this.height = 0; // set height to auto so it can be adjusted

        children[group].forEach(function (child) {
          child.style.height = 'auto';
        }); // set the height to the child's height if it is larger than the previous child

        children[group].forEach(function (child) {
          if (child.clientHeight > _this5.height) _this5.height = child.clientHeight;
        }); // set all children to the same height

        children[group].forEach(function (child) {
          return child.style.height = _this5.height + 'px';
        });
      } // send the equalized event to the window


      this.complete();
    }
  }, {
    key: "complete",
    value: function complete() {
      var _this6 = this;

      window.equalizing = setTimeout(function () {
        window.dispatchEvent(_this6.event);
      }, 100);
    }
  }, {
    key: "update",
    value: function update() {
      this.children = this.getChildren();
      this.rows = this.getRows();
      this.equalize();
    }
  }]);

  return Equalizer;
}();

var _default = Equalizer; // ======================================================
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

exports["default"] = _default;
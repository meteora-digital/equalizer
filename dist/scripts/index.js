"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var Equalizer = /*#__PURE__*/function () {
  function Equalizer() {
    var _this = this;
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Equalizer);
    // A cache to stop endless loops
    this.cache = {
      width: null
    };
    // Store the events here
    this.events = {};
    // A mutation observer to watch for changes to the DOM
    this.MutationObserver = new MutationObserver(function () {
      return _this.update();
    });
    // The resize observer
    this.ResizeObserver = new ResizeObserver(function (entries) {
      // If the width has definitely changed, call the resize method
      if (_this.cache.width !== _this.settings.container.clientWidth) {
        _this.settings.rows ? _this.update() : _this.resize();
      }
      ;
    });

    // The elements that are being resized
    this.identifiers = {};
    // A timeout throttle
    this.timeout = {};

    // The default settings
    this.settings = {
      container: null,
      identifiers: '',
      rows: false
    };

    // Merge the default settings with the user settings
    for (var key in this.settings) {
      if (Object.hasOwnProperty.call(this.settings, key) && options[key] !== undefined) {
        this.settings[key] = options[key];
      }
    }

    // Observe the container for changes to the DOM
    this.MutationObserver.observe(this.settings.container, {
      childList: true
    });

    // Update the elements we need to be watching
    this.update();

    // If the user has specified a container, add it to the observer
    if (this.settings.container) {
      this.ResizeObserver.observe(this.settings.container);
    }
  }
  _createClass(Equalizer, [{
    key: "getElementOffset",
    value: function getElementOffset(element) {
      var y = 0;
      while (element && element != this.settings.container) {
        y += element.offsetTop;
        element = element.offsetParent;
      }
      return y;
    }
  }, {
    key: "update",
    value: function update() {
      var _this2 = this;
      clearTimeout(this.timeout['update']);

      // Throttle the update event
      this.timeout['update'] = setTimeout(function () {
        _this2.beforeUpdate();

        // If the user has specified an array of identifiers, add them to the elements object
        if (_this2.settings.identifiers.length) {
          // Reset the identifiers object
          _this2.identifiers = {};

          // Create a list of identifiers
          var identifiers = [];

          // Try to convert the identifiers to an array
          try {
            identifiers = identifiers.concat(_this2.settings.identifiers.split(','));
            // Loop through the identifiers
            identifiers.forEach(function (identifier) {
              // Create a new array in the elements object for this identifier
              if (_this2.identifiers[identifier] === undefined) _this2.identifiers[identifier] = {};
            });
          } catch (err) {
            console.log(err);
          }

          // loop through the elements object
          for (var identifier in _this2.identifiers) {
            // If the identifier exists in the elements object
            if (Object.hasOwnProperty.call(_this2.identifiers, identifier)) {
              // Find all the elements in the container than need to be watched
              var elements = _this2.settings.container.querySelectorAll("[data-equalize-watch=\"".concat(identifier, "\"]"));
              // Loop through the elements
              for (var index = 0; index < elements.length; index++) {
                var element = elements[index];
                // Set a fake initial height to make everything align
                element.style.height = '1px';
                // Create an array for the element offset
                if (_this2.identifiers[identifier][_this2.getElementOffset(element)] === undefined) _this2.identifiers[identifier][_this2.getElementOffset(element)] = [];
                // If the element is not already in the array, add the element to the array
                if (_this2.identifiers[identifier][_this2.getElementOffset(element)].indexOf(element) === -1) _this2.identifiers[identifier][_this2.getElementOffset(element)].push(element);
              }
            }
          }
        } else {
          // Set up a single identifier for the equalizer
          _this2.identifiers[0] = {};
          // Find all the elements in the container than need to be watched
          var _elements = _this2.settings.container.querySelectorAll('[data-equalize-watch]');
          // Loop through the elements
          for (var _index = 0; _index < _elements.length; _index++) {
            var _element = _elements[_index];
            // Set a fake initial height to make everything align
            _element.style.height = '1px';
            // Create an array for the element offset
            if (_this2.identifiers[0][_this2.getElementOffset(_element)] === undefined) _this2.identifiers[0][_this2.getElementOffset(_element)] = [];
            // If the element is not already in the array, add the element to the array
            if (_this2.identifiers[0][_this2.getElementOffset(_element)].indexOf(_element) === -1) _this2.identifiers[0][_this2.getElementOffset(_element)].push(_element);
          }
        }
        _this2.callback('update');

        // Call the resize method
        _this2.resize(0);
      }, 100);
    }
  }, {
    key: "resize",
    value: function resize() {
      var _this3 = this;
      var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
      clearTimeout(this.timeout['resize']);

      // Throttle the resize event
      this.timeout['resize'] = setTimeout(function () {
        _this3.beforeResize();

        // Set the width to the current width
        _this3.cache.width = _this3.settings.container.clientWidth;
        for (var identifier in _this3.identifiers) {
          if (Object.hasOwnProperty.call(_this3.identifiers, identifier)) {
            var rows = _this3.identifiers[identifier];

            // An initial height that will be increased as we loop each element
            var height = 0;
            for (var offset in rows) {
              if (Object.hasOwnProperty.call(rows, offset)) {
                var row = rows[offset];

                // If we are matching heights per row then reset the initial height
                if (_this3.settings.rows === true) height = 0;

                // Loop through the elements in the row
                for (var index = 0; index < row.length; index++) {
                  var element = row[index];
                  // Set the element height to auto
                  element.style.height = 'auto';
                  // If the element is taller than the current height, set the height to the new height
                  if (element.offsetHeight > height) height = element.offsetHeight;
                }
                if (_this3.settings.rows === true) {
                  // Set the height of the row
                  for (var _index2 = 0; _index2 < row.length; _index2++) {
                    row[_index2].style.height = height + 'px';
                  }
                }
              }
            }

            // If we dont have heights set in rows, then we need to apply the same height to all elements
            if (_this3.settings.rows === false) {
              for (var _offset in rows) {
                if (Object.hasOwnProperty.call(rows, _offset)) {
                  var _row = rows[_offset];
                  // Set the height of the row
                  for (var _index3 = 0; _index3 < _row.length; _index3++) {
                    _row[_index3].style.height = height + 'px';
                  }
                }
              }
            }
          }
        }
        _this3.callback('resize');
      }, timeout);
    }
  }, {
    key: "beforeResize",
    value: function beforeResize() {
      this.callback('beforeResize');
    }
  }, {
    key: "beforeUpdate",
    value: function beforeUpdate() {
      this.callback('beforeUpdate');
    }
  }, {
    key: "callback",
    value: function callback(type) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      // run the callback functions
      if (this.events[type]) this.events[type].forEach(function (event) {
        return event(data);
      });
    }
  }, {
    key: "on",
    value: function on(event, func) {
      // If we loaded an event and it's not the on event and we also loaded a function
      if (event && event != 'on' && event != 'callback' && this[event] && func && typeof func == 'function') {
        if (this.events[event] == undefined) this.events[event] = [];
        // Push a new event to the event array
        this.events[event].push(func);
      }
    }
  }]);
  return Equalizer;
}();
exports["default"] = Equalizer;
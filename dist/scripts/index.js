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
    // The resize observer
    this.observer = new ResizeObserver(function (entries) {
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

    // Update the elements we need to be watching
    this.update();

    // If the user has specified a container, add it to the observer
    if (this.settings.container) {
      this.observer.observe(this.settings.container);
    }
  }
  _createClass(Equalizer, [{
    key: "update",
    value: function update() {
      var _this2 = this;
      // Function to return the offset of the child element
      var offset = function offset(element) {
        var y = 0;
        while (element && element != _this2.settings.container) {
          y += element.offsetTop;
          element = element.offsetParent;
        }
        return y;
      };
      this.beforeUpdate();

      // If the user has specified an array of identifiers, add them to the elements object
      if (this.settings.identifiers.length) {
        // Reset the identifiers object
        this.identifiers = {};

        // Create a list of identifiers
        var identifiers = [];

        // Try to convert the identifiers to an array
        try {
          identifiers = identifiers.concat(this.settings.identifiers.split(','));
          // Loop through the identifiers
          identifiers.forEach(function (identifier) {
            // Create a new array in the elements object for this identifier
            if (_this2.identifiers[identifier] === undefined) _this2.identifiers[identifier] = {};
          });
        } catch (err) {
          console.log(err);
        }

        // loop through the elements object
        for (var identifier in this.identifiers) {
          // If the identifier exists in the elements object
          if (Object.hasOwnProperty.call(this.identifiers, identifier)) {
            // Find all the elements in the container than need to be watched
            var elements = this.settings.container.querySelectorAll("[data-equalize-watch=\"".concat(identifier, "\"]"));
            // Loop through the elements
            for (var index = 0; index < elements.length; index++) {
              var element = elements[index];
              // Set a fake initial height to make everything align
              element.style.height = '1px';
              // Create an array for the element offset
              if (this.identifiers[identifier][offset(element)] === undefined) this.identifiers[identifier][offset(element)] = [];
              // If the element is not already in the array, add the element to the array
              if (this.identifiers[identifier][offset(element)].indexOf(element) === -1) this.identifiers[identifier][offset(element)].push(element);
            }
          }
        }
      } else {
        // Set up a single identifier for the equalizer
        this.identifiers[0] = {};
        // Find all the elements in the container than need to be watched
        var _elements = this.settings.container.querySelectorAll('[data-equalize-watch]');
        // Loop through the elements
        for (var _index = 0; _index < _elements.length; _index++) {
          var _element = _elements[_index];
          // Set a fake initial height to make everything align
          _element.style.height = '1px';
          // Create an array for the element offset
          if (this.identifiers[0][offset(_element)] === undefined) this.identifiers[0][offset(_element)] = [];
          // If the element is not already in the array, add the element to the array
          if (this.identifiers[0][offset(_element)].indexOf(_element) === -1) this.identifiers[0][offset(_element)].push(_element);
        }
      }
      this.callback('resize');

      // Call the resize method
      this.resize();
    }
  }, {
    key: "resize",
    value: function resize() {
      var _this3 = this;
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
      }, 50);
      this.callback('resize');
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
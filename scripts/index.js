export default class Equalizer {
  constructor(options = {}, ) {
    // A cache to stop endless loops
    this.cache = { width: null };
    // Store the events here
    this.events = {};
    // The elements that are being resized
    this.identifiers = {};
    // A timeout throttle
    this.timeout = {};

    // The default settings
    this.settings = {
      container: null,
      identifiers: '',
      rows: false,
      throttle: 0,
      debounce: 100,
      mutations: {
        childList: true,
        subtree: false,
      }
    };

    // Merge the default settings with the user settings
    for (const key in this.settings) {
      if (Object.hasOwnProperty.call(this.settings, key) && options[key] !== undefined) {
        this.settings[key] = options[key];
      }
    }

    // A mutation observer to watch for changes to the DOM
    this.MutationObserver = new MutationObserver(() => this.update());
    // The resize observer
    this.ResizeObserver = new ResizeObserver((entries) => {
      // If the width has definitely changed, call the resize method
      if (this.cache.width !== this.settings.container.clientWidth) {
        clearTimeout(this.timeout['ResizeObserver']);

        this.timeout['ResizeObserver'] = setTimeout(() => {
          (this.settings.rows) ? this.update() : this.resize();
        }, this.settings.debounce);
      };
    });

    // Observe the container for changes to the DOM
    this.MutationObserver.observe(this.settings.container, this.settings.mutations);

    // Update the elements we need to be watching
    this.update();

    // If the user has specified a container, add it to the observer
    if (this.settings.container) {
      this.ResizeObserver.observe(this.settings.container);
    }
  }

  getElementOffset(element) {
    let y = 0;

    while (element && element != this.settings.container) {
      y += element.offsetTop;
      element = element.offsetParent;
    }

    return y;
  }

  update() {
    clearTimeout(this.timeout['update']);

    // Throttle the update event
    this.timeout['update'] = setTimeout(() => {
      this.beforeUpdate();

      // If the user has specified an array of identifiers, add them to the elements object
      if (this.settings.identifiers.length) {
        // Reset the identifiers object
        this.identifiers = {};

        // Create a list of identifiers
        let identifiers = [];

        // Try to convert the identifiers to an array
        try {
          identifiers = identifiers.concat(this.settings.identifiers.split(','));
          // Loop through the identifiers
          identifiers.forEach((identifier) => {
            // Create a new array in the elements object for this identifier
            if (this.identifiers[identifier] === undefined) this.identifiers[identifier] = {};
          });
        } catch (err) {
          console.log(err);
        }

        // loop through the elements object
        for (const identifier in this.identifiers) {
          // If the identifier exists in the elements object
          if (Object.hasOwnProperty.call(this.identifiers, identifier)) {
            // Find all the elements in the container than need to be watched
            let elements = this.settings.container.querySelectorAll(`[data-equalize-watch="${identifier}"]`);
            // Loop through the elements
            for (let index = 0; index < elements.length; index++) {
              const element = elements[index];
              // Set a fake initial height to make everything align
              element.style.height = '1px';
              // Create an array for the element offset
              if (this.identifiers[identifier][this.getElementOffset(element)] === undefined) this.identifiers[identifier][this.getElementOffset(element)] = [];
              // If the element is not already in the array, add the element to the array
              if (this.identifiers[identifier][this.getElementOffset(element)].indexOf(element) === -1) this.identifiers[identifier][this.getElementOffset(element)].push(element);
            }
          }
        }

      } else {
        // Set up a single identifier for the equalizer
        this.identifiers[0] = {};
        // Find all the elements in the container than need to be watched
        let elements = this.settings.container.querySelectorAll('[data-equalize-watch]');
        // Loop through the elements
        for (let index = 0; index < elements.length; index++) {
          const element = elements[index];
          // Set a fake initial height to make everything align
          element.style.height = '1px';
          // Create an array for the element offset
          if (this.identifiers[0][this.getElementOffset(element)] === undefined) this.identifiers[0][this.getElementOffset(element)] = [];
          // If the element is not already in the array, add the element to the array
          if (this.identifiers[0][this.getElementOffset(element)].indexOf(element) === -1) this.identifiers[0][this.getElementOffset(element)].push(element);
        }
      }

      this.callback('update');

      // Call the resize method
      this.resize(0);
    }, this.settings.throttle);
  }

  resize(timeout = this.settings.throttle) {
    clearTimeout(this.timeout['resize']);


    // Throttle the resize event
    this.timeout['resize'] = setTimeout(() => {

      this.beforeResize();

      // Set the width to the current width
      this.cache.width = this.settings.container.clientWidth;

      for (const identifier in this.identifiers) {
        if (Object.hasOwnProperty.call(this.identifiers, identifier)) {
          const rows = this.identifiers[identifier];

          // An initial height that will be increased as we loop each element
          let height = 0;

          for (const offset in rows) {
            if (Object.hasOwnProperty.call(rows, offset)) {
              const row = rows[offset];

              // If we are matching heights per row then reset the initial height
              if (this.settings.rows === true) height = 0;

              // Loop through the elements in the row
              for (let index = 0; index < row.length; index++) {
                const element = row[index];

                // Set the element height to auto
                element.style.height = 'auto';

                // If the element is taller than the current height, set the height to the new height
                if (element.offsetHeight > height) height = Math.ceil(element.offsetHeight);
              }

              if (this.settings.rows === true) {
                // Set the height of the row
                for (let index = 0; index < row.length; index++) {
                  const element = row[index];
                  // If the element's offsetHeight is different to the height, set the height
                  // if (element.offsetHeight !== height) element.style.height = height + 'px';
                  element.style.height = height + 'px';
                };
              }
            }
          }

          // If we dont have heights set in rows, then we need to apply the same height to all elements
          if (this.settings.rows === false) {
            for (const offset in rows) {
              if (Object.hasOwnProperty.call(rows, offset)) {
                const row = rows[offset];
                // Set the height of the row
                for (let index = 0; index < row.length; index++) {
                  const element = row[index];
                  // If the element's offsetHeight is different to the height, set the height
                  // if (element.offsetHeight !== height) element.style.height = height + 'px';
                  element.style.height = height + 'px';
                };
              }
            }
          }
        }
      }

      this.callback('resize');
    }, timeout);
  }

  beforeResize() {
    this.callback('beforeResize');
  }

  beforeUpdate() {
    this.callback('beforeUpdate');
  }

  callback(type, data = false) {
    // run the callback functions
    if (this.events[type]) this.events[type].forEach((event) => event(data));
  }

  on(event, func) {
    // If we loaded an event and it's not the on event and we also loaded a function
    if (event && event != 'on' && event != 'callback' && this[event] && func && typeof func == 'function') {
      if (this.events[event] == undefined) this.events[event] = [];
      // Push a new event to the event array
      this.events[event].push(func);
    }
  }
}

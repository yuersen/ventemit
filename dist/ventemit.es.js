/**
 * @file 模拟 Node 的 EventEmitter 事件发布处理机制
 * @class VentEmit
 */
var VentEmit = /** @class */ (function() {
  function VentEmit() {
    this.events = {};
  }
  /**
   * Create the specified event space in the event storage.
   * It is a private function. but it can be used in future.
   *
   * @private
   * @param {String} evt Name of the event
   * @returns {Array<any>} Array of listeners
   */
  VentEmit.prototype.addEvent = function(evt) {
    return (this.events[evt] = []);
  };
  /**
   * Removes all listeners from a specified event.
   * It is a private function. but it can be used in future.
   *
   * @private
   * @param {String} evt Name of the event
   * @returns {VentEmit} Return instance object
   */
  VentEmit.prototype.removeEvent = function(evt) {
    delete this.events[evt];
    return this;
  };
  /**
   * Returns the listener array for the specified event.
   *
   * @param {String} evt Name of the event
   * @returns {Array<any>} If so, eturn the array, no, return null
   */
  VentEmit.prototype.listeners = function(evt) {
    return this.events[evt] || null;
  };
  /**
   *  Adds a listener function to the specified event.
   *
   * @param {String} evt Name of the event
   * @param {Function} listener Listener Method to be called when the event is emitted.
   * @param {Boolean} once Mark the listener is destroy from its storage after invocation, by default is false
   * @returns {VentEmit} Return instance object
   */
  VentEmit.prototype.addListener = function(evt, listener, once) {
    if (once === void 0) {
      once = false;
    }
    // check the listener
    if (typeof listener !== 'function') {
      throw new TypeError('listener must be a function');
    }
    // check the listener whether or not in listeners
    // if exist, do nothing
    var listeners = this.listeners(evt);
    if (!listeners) {
      listeners = this.addEvent(evt);
    }
    var i = listeners.length;
    while (i--) {
      if (listeners[i].listener === listener) {
        return this;
      }
    }
    // push listener to its storage
    listeners.push({
      listener: listener,
      once: once
    });
    return this;
  };
  /**
   * An alias function of addListener.
   *
   * @param {String} evt Name of the event
   * @param {Function} listener Listener Method to be called when the event is emitted.
   * @param {Boolean} once Mark the listener is destroy from its storage after invocation, by default is false
   * @returns {VentEmit} Return instance object
   */
  VentEmit.prototype.on = function(evt, listener, once) {
    if (once === void 0) {
      once = false;
    }
    return this.addListener(evt, listener, once);
  };
  /**
   * Add a listener that will be automatically removed after its first execution.
   *
   * @param {String} evt Name of the event
   * @param {Function} listener Listener Method to be called when the event is emitted.
   * @returns {VentEmit}
   */
  VentEmit.prototype.once = function(evt, listener) {
    return this.addListener(evt, listener, true);
  };
  /**
   * Check if exist specified event.
   *
   * @param {String} evt Name of the event
   * @returns {Boolean} Returns true if exist
   */
  VentEmit.prototype.include = function(evt) {
    return evt in this.events;
  };
  /**
   * Removes a listener function from the specified event.
   *
   * @param {String} evt Name of the event
   * @param {Function} listener Listener Method to be called when the event is emitted.
   * @returns {VentEmit} Return instance object
   */
  VentEmit.prototype.removeListener = function(evt, listener) {
    var listeners = this.listeners(evt);
    if (listeners && listeners.length > 0) {
      var i = listeners.length;
      while (i--) {
        if (listeners[i].listener === listener) {
          listeners.splice(i, 1);
        }
      }
    }
    return this;
  };
  /**
   * An alias function of removeListener
   *
   * @param {String} evt Name of the event
   * @param {Function} listener Listener Method to be called when the event is emitted.
   * @returns {VentEmit} Return instance object
   */
  VentEmit.prototype.off = function(evt, listener) {
    return this.removeListener(evt, listener);
  };
  /**
   * Removes all listeners from a specified event.
   *
   * @param {String} evt Name of the event
   * @returns {VentEmit} Return instance object
   */
  VentEmit.prototype.removeAllListeners = function(evt) {
    return this.removeEvent(evt);
  };
  /**
   * An alias function of removeAllListeners
   *
   * @param {String} evt Name of the event
   * @returns {VentEmit} Return instance object
   */
  VentEmit.prototype.offAll = function(evt) {
    return this.removeAllListeners(evt);
  };
  /**
   * Emits an event, When emitted, every listener attached to that event will be executed.
   *
   * @param {String} evt Name of the event
   * @param {Array<any>} args Optional array of arguments
   * @returns {VentEmit} Return instance object
   */
  VentEmit.prototype.emit = function(evt) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }
    var listeners = this.listeners(evt);
    if (listeners && listeners.length) {
      for (var i = 0, l = listeners.length; i < l; i++) {
        // If the listener returns true then it shall be removed from the event
        // The function is executed either with a basic call or an apply if there is an args array
        var _a = listeners[i],
          listener = _a.listener,
          once = _a.once;
        var result = listener.apply(this, args || []);
        if (once || result === true) {
          this.removeListener(evt, listener);
        }
      }
    }
    return this;
  };
  /**
   * An alias function of emit
   *
   * @param {String} evt Name of the event
   * @param {Array<any>} args Optional array of arguments
   * @returns {VentEmit} Return instance object
   */
  VentEmit.prototype.trigger = function(evt) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }
    return this.emit.apply(this, arguments);
  };
  return VentEmit;
})();

export default VentEmit;

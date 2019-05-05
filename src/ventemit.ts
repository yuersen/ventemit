/**
 * @file 模拟 Node 的 EventEmitter 事件发布处理机制
 * @class VentEmit
 */
export default class VentEmit {
  private events: { [key: string]: any[] };
  constructor() {
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
  private addEvent(evt: string): any[] {
    return (this.events[evt] = []);
  }

  /**
   * Removes all listeners from a specified event.
   * It is a private function. but it can be used in future.
   *
   * @private
   * @param {String} evt Name of the event
   * @returns {VentEmit} Return instance object
   */
  private removeEvent(evt: string): VentEmit {
    delete this.events[evt];
    return this;
  }

  /**
   * Returns the listener array for the specified event.
   *
   * @param {String} evt Name of the event
   * @returns {Array<any>} If so, eturn the array, no, return null
   */
  listeners(evt: string): any[] | null {
    return this.events[evt] || null;
  }

  /**
   *  Adds a listener function to the specified event.
   *
   * @param {String} evt Name of the event
   * @param {Function} listener Listener Method to be called when the event is emitted.
   * @param {Boolean} once Mark the listener is destroy from its storage after invocation, by default is false
   * @returns {VentEmit} Return instance object
   */
  addListener(
    evt: string,
    listener: (...data: any[]) => any,
    once: boolean = false
  ): VentEmit {
    // check the listener
    if (typeof listener !== 'function') {
      throw new TypeError('listener must be a function');
    }

    // check the listener whether or not in listeners
    // if exist, do nothing
    let listeners = this.listeners(evt);
    if (!listeners) {
      listeners = this.addEvent(evt);
    }

    let i = listeners.length;
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
  }

  /**
   * An alias function of addListener.
   *
   * @param {String} evt Name of the event
   * @param {Function} listener Listener Method to be called when the event is emitted.
   * @param {Boolean} once Mark the listener is destroy from its storage after invocation, by default is false
   * @returns {VentEmit} Return instance object
   */
  on(
    evt: string,
    listener: (...data: any[]) => any,
    once: boolean = false
  ): VentEmit {
    return this.addListener(evt, listener, once);
  }

  /**
   * Add a listener that will be automatically removed after its first execution.
   *
   * @param {String} evt Name of the event
   * @param {Function} listener Listener Method to be called when the event is emitted.
   * @returns {VentEmit}
   */
  once(evt: string, listener: (...data: any[]) => any): VentEmit {
    return this.addListener(evt, listener, true);
  }

  /**
   * Check if exist specified event.
   *
   * @param {String} evt Name of the event
   * @returns {Boolean} Returns true if exist
   */
  include(evt: string): boolean {
    return evt in this.events;
  }

  /**
   * Removes a listener function from the specified event.
   *
   * @param {String} evt Name of the event
   * @param {Function} listener Listener Method to be called when the event is emitted.
   * @returns {VentEmit} Return instance object
   */
  removeListener(evt: string, listener: (...data: any[]) => any): VentEmit {
    const listeners = this.listeners(evt);

    if (listeners && listeners.length > 0) {
      let i = listeners.length;
      while (i--) {
        if (listeners[i].listener === listener) {
          listeners.splice(i, 1);
        }
      }
    }
    return this;
  }

  /**
   * An alias function of removeListener
   *
   * @param {String} evt Name of the event
   * @param {Function} listener Listener Method to be called when the event is emitted.
   * @returns {VentEmit} Return instance object
   */
  off(evt: string, listener: (...data: any[]) => any): VentEmit {
    return this.removeListener(evt, listener);
  }

  /**
   * Removes all listeners from a specified event.
   *
   * @param {String} evt Name of the event
   * @returns {VentEmit} Return instance object
   */
  removeAllListeners(evt: string): VentEmit {
    return this.removeEvent(evt);
  }

  /**
   * An alias function of removeAllListeners
   *
   * @param {String} evt Name of the event
   * @returns {VentEmit} Return instance object
   */
  offAll(evt: string): VentEmit {
    return this.removeAllListeners(evt);
  }

  /**
   * Emits an event, When emitted, every listener attached to that event will be executed.
   *
   * @param {String} evt Name of the event
   * @param {Array<any>} args Optional array of arguments
   * @returns {VentEmit} Return instance object
   */
  emit(evt: string, ...args: any[]): VentEmit {
    const listeners = this.listeners(evt);
    if (listeners && listeners.length) {
      for (let i = 0, l = listeners.length; i < l; i++) {
        // If the listener returns true then it shall be removed from the event
        // The function is executed either with a basic call or an apply if there is an args array
        const { listener, once } = listeners[i];
        const result = listener.apply(this, args || []);
        if (once || result === true) {
          this.removeListener(evt, listener);
        }
      }
    }
    return this;
  }

  /**
   * An alias function of emit
   *
   * @param {String} evt Name of the event
   * @param {Array<any>} args Optional array of arguments
   * @returns {VentEmit} Return instance object
   */
  trigger(evt: string, ...args: any[]): VentEmit {
    return this.emit.apply(this, arguments);
  }
}

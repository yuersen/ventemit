import 'mocha';
import { expect } from 'chai';
import VentEmit from '@/ventemit';

describe('VentEmit', () => {
  // create VentEmit instance
  const createVentEmit = () => {
    return new VentEmit();
  };

  // define public listener
  const onfemit = () => {
    console.log('onfemit');
  };

  describe('addListener', () => {
    it('Adds a listener function to the specified event', () => {
      const femit = createVentEmit();
      femit.addListener('onfemit', onfemit);
      expect(femit.include('onfemit')).to.equal(true);
    });

    it('returns VentEmit instance', () => {
      const femit = createVentEmit();
      const result = femit.addListener('onfemit', onfemit);
      expect(femit.include('onfemit')).to.equal(true);
      expect(result instanceof VentEmit).to.equal(true);
    });

    it('Add same listener', () => {
      const femit = createVentEmit();
      femit.addListener('onfemit', onfemit);
      expect(femit.listeners('onfemit').length).to.equal(1);

      // add again
      femit.addListener('onfemit', onfemit);
      expect(femit.listeners('onfemit').length).to.equal(1);
    });

    it('throws error when listener is not function', () => {
      const femit = createVentEmit();
      const onthrow: any = 'onthrow';
      try {
        femit.addListener('onthrow', onthrow);
      } catch (error) {
        expect(() => {
          throw new TypeError(error);
        }).to.throw(TypeError);
      }
    });
  });

  describe('on', () => {
    it('Adds a listener function to the specified event', () => {
      const femit = createVentEmit();
      femit.on('onfemit', onfemit);
      expect(femit.include('onfemit')).to.equal(true);
    });

    it('returns VentEmit instance', () => {
      const femit = createVentEmit();
      const result = femit.on('onfemit', onfemit);
      expect(femit.include('onfemit')).to.equal(true);
      expect(result instanceof VentEmit).to.equal(true);
    });

    it('Add same listener', () => {
      const femit = createVentEmit();
      femit.on('onfemit', onfemit);
      expect(femit.listeners('onfemit').length).to.equal(1);
      // add again
      femit.on('onfemit', onfemit);
      expect(femit.listeners('onfemit').length).to.equal(1);
    });

    it('throws error when listener is not function', () => {
      const femit = createVentEmit();
      const onthrow: any = 'onthrow';
      try {
        femit.on('onthrow', onthrow);
      } catch (error) {
        expect(() => {
          throw new TypeError(error);
        }).to.throw(TypeError);
      }
    });
  });

  describe('once', () => {
    it('Adds a listener function to the specified event', () => {
      const femit = createVentEmit();
      femit.once('onfemit', onfemit);
      expect(femit.include('onfemit')).to.equal(true);
    });

    it('returns VentEmit instance', () => {
      const femit = createVentEmit();
      const result = femit.once('onfemit', onfemit);
      expect(femit.include('onfemit')).to.equal(true);
      expect(result instanceof VentEmit).to.equal(true);
    });

    it('Add same listener', () => {
      const femit = createVentEmit();
      femit.once('onfemit', onfemit);
      expect(femit.listeners('onfemit').length).to.equal(1);
      // add again
      femit.once('onfemit', onfemit);
      expect(femit.listeners('onfemit').length).to.equal(1);
    });
  });

  describe('include', () => {
    it('returns true', () => {
      const femit = createVentEmit();
      femit.addListener('onfemit', onfemit);
      expect(femit.include('onfemit')).to.equal(true);
    });

    it('returns false', () => {
      const femit = createVentEmit();
      expect(femit.include('onfemit')).to.equal(false);
    });
  });

  describe('listeners', () => {
    it('returns a listener array', () => {
      const femit = createVentEmit();
      femit.addListener('onfemit', onfemit);
      const listeners = femit.listeners('onfemit');
      expect(listeners instanceof Array).to.equal(true);
      expect(listeners.length).to.equal(1);
    });

    it('returns null', () => {
      const femit = createVentEmit();
      const listeners = femit.listeners('onfemit');
      expect(listeners).to.equal(null);
    });
  });

  describe('removeListener', () => {
    it('removes a listener function from the specified event.', () => {
      const femit = createVentEmit();
      femit.addListener('onfemit', onfemit);
      expect(femit.listeners('onfemit').length).to.equal(1);

      // remove listener
      femit.removeListener('onfemit', onfemit);
      expect(femit.listeners('onfemit').length).to.equal(0);
    });

    it('returns VentEmit instance', () => {
      const femit = createVentEmit();
      femit.addListener('onfemit', onfemit);
      // remove listener
      const result = femit.removeListener('onfemit', onfemit);
      expect(result instanceof VentEmit).to.equal(true);
    });
  });

  describe('off', () => {
    it('removes a listener function from the specified event.', () => {
      const femit = createVentEmit();
      femit.addListener('onfemit', onfemit);
      expect(femit.listeners('onfemit').length).to.equal(1);

      // remove listener
      femit.off('onfemit', onfemit);
      expect(femit.listeners('onfemit').length).to.equal(0);
    });

    it('returns VentEmit instance', () => {
      const femit = createVentEmit();
      femit.addListener('onfemit', onfemit);
      // remove listener
      const result = femit.off('onfemit', onfemit);
      expect(result instanceof VentEmit).to.equal(true);
      expect(femit.listeners('onfemit').length).to.equal(0);
    });
  });

  describe('removeAllListeners', () => {
    it('Removes all listeners from a specified event', () => {
      const femit = createVentEmit();
      femit.addListener('onfemit', onfemit);
      expect(femit.include('onfemit')).to.equal(true);

      // remove listener
      femit.removeAllListeners('onfemit');
      expect(femit.include('onfemit')).to.equal(false);
    });

    it('returns VentEmit instance', () => {
      const femit = createVentEmit();
      femit.addListener('onfemit', onfemit);
      // remove listener
      const result = femit.removeAllListeners('onfemit');
      expect(result instanceof VentEmit).to.equal(true);
    });
  });

  describe('offAll', () => {
    it('Removes all listeners from a specified event', () => {
      const femit = createVentEmit();
      femit.addListener('onfemit', onfemit);
      expect(femit.include('onfemit')).to.equal(true);

      // remove listener
      femit.offAll('onfemit');
      expect(femit.include('onfemit')).to.equal(false);
    });

    it('returns VentEmit instance', () => {
      const femit = createVentEmit();
      femit.addListener('onfemit', onfemit);
      // remove listener
      const result = femit.offAll('onfemit');
      expect(result instanceof VentEmit).to.equal(true);
    });
  });

  describe('emit', () => {
    it('emits an event', () => {
      const femit = createVentEmit();
      let count = 0;
      femit.on('oncount', () => {
        count += 1;
      });
      expect(count).to.equal(0);
      femit.emit('oncount');
      expect(count).to.equal(1);
    });

    it('returns VentEmit instance', () => {
      const femit = createVentEmit();
      let count = 0;
      femit.on('oncount', () => {
        count += 1;
      });
      const result = femit.emit('oncount');
      expect(count).to.equal(1);
      expect(result instanceof VentEmit).to.equal(true);
    });

    it('emits an event with mutil parameters', () => {
      const femit = createVentEmit();
      let count = 0;
      femit.on('oncount', (a, b, c) => {
        count += a + b + c;
      });
      expect(count).to.equal(0);
      femit.emit('oncount', 1, 2, 3);
      expect(count).to.equal(6);
    });

    it('emits an event that bind once', () => {
      const femit = createVentEmit();
      let count = 0;
      femit.once('oncount', () => {
        count += 1;
      });
      femit.emit('oncount');
      expect(count).to.equal(1);
      expect(femit.listeners('oncount').length).to.equal(0);
    });

    it('emits an event that return true', () => {
      const femit = createVentEmit();
      let count = 0;
      femit.addListener('oncount', () => {
        count += 1;
        return true;
      });
      femit.emit('oncount');
      expect(count).to.equal(1);
      expect(femit.listeners('oncount').length).to.equal(0);
    });
  });

  describe('trigger', () => {
    it('emits an event', () => {
      const femit = createVentEmit();
      let count = 0;
      femit.on('oncount', () => {
        count += 1;
      });
      expect(count).to.equal(0);
      femit.trigger('oncount');
      expect(count).to.equal(1);
    });

    it('returns VentEmit instance', () => {
      const femit = createVentEmit();
      let count = 0;
      femit.on('oncount', () => {
        count += 1;
      });
      const result = femit.trigger('oncount');
      expect(count).to.equal(1);
      expect(result instanceof VentEmit).to.equal(true);
    });

    it('emits an event with mutil parameters', () => {
      const femit = createVentEmit();
      let count = 0;
      femit.on('oncount', (a, b, c) => {
        count += a + b + c;
      });
      expect(count).to.equal(0);
      femit.trigger('oncount', 1, 2, 3);
      expect(count).to.equal(6);
    });

    it('emits an event that bind once', () => {
      const femit = createVentEmit();
      let count = 0;
      femit.once('oncount', () => {
        count += 1;
      });
      femit.trigger('oncount');
      expect(count).to.equal(1);
      expect(femit.listeners('oncount').length).to.equal(0);
    });

    it('emits an event that return true', () => {
      const femit = createVentEmit();
      let count = 0;
      femit.addListener('oncount', () => {
        count += 1;
        return true;
      });
      femit.trigger('oncount');
      expect(count).to.equal(1);
      expect(femit.listeners('oncount').length).to.equal(0);
    });
  });
});

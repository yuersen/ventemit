# VentEmit

A simple, lightweight JavaScript API for handling EventEmit. Support for all major browsers, such as IE8+, chrome, firefox and safair.

- Works in IE8+ (Because the JSON method is used.)
- Accepts any character
- Heavily tested
- No dependency
- Supports CommonJS/ES Module/UMD

## Installation

### Direct download

Download the script from `dist/ventemit.umd.js` and include it.

```html
<script src="/path/to/ventemit.umd.js"></script>
```

### Package Managers

```
npm install ventemit --save
```

## Basic Usage

### UMD

```javascript
// Init stance
const ventemit = new VentEmit();

// Event handler
const handler = (name, version) => {
  console.log(`${name}: ${version}`);
};

// Adds a listener function to the specified event.
ventemit.addListener('oninformation', handler);

// An alias function of addListener
ventemit.on('oninformation', handler);

// Add a listener that will be automatically removed after its first execution.
ventemit.once('oninformation', handler);

// Check if exist specified event.
// -> output: true
ventemit.include('oninformation');

// Returns the listener array for the specified event.
ventemit.listeners('oninformation');

// Removes a listener function from the specified event.
ventemit.removeListener('oninformation', handler);

// An alias function of removeListener
ventemit.off('oninformation', handler);

// Removes all listeners from a specified event.
ventemit.removeAllListeners('oninformation');

// An alias function of removeAllListeners
ventemit.offAll('oninformation');

// Emits an event, When emitted, every listener attached to that event will be executed.
ventemit.emit('oninformation', 'VentEmit', '1.0.0');

// An alias function of emit
ventemit.trigger('oninformation', 'VentEmit', '1.0.0');
```

### CJS / ES

```javascript
import { VentEmit } from 'ventemit';

// Init stance
const ventemit = new VentEmit();

// Event handler
const handler = (name, version) => {
  console.log(`${name}: ${version}`);
};

// Adds a listener function to the specified event.
ventemit.addListener('oninformation', handler);

// An alias function of addListener
ventemit.on('oninformation', handler);

// Add a listener that will be automatically removed after its first execution.
ventemit.once('oninformation', handler);

// Check if exist specified event.
// -> output: true
ventemit.include('oninformation');

// Returns the listener array for the specified event.
ventemit.listeners('oninformation');

// Removes a listener function from the specified event.
ventemit.removeListener('oninformation', handler);

// An alias function of removeListener
ventemit.off('oninformation', handler);

// Removes all listeners from a specified event.
ventemit.removeAllListeners('oninformation');

// An alias function of removeAllListeners
ventemit.offAll('oninformation');

// Emits an event, When emitted, every listener attached to that event will be executed.
ventemit.emit('oninformation', 'VentEmit', '1.0.0');

// An alias function of emit
ventemit.trigger('oninformation', 'VentEmit', '1.0.0');
```

## API

| Method             | Parameter                                                             | Returns  | Describe                                                                              |
| ------------------ | --------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------- |
| addListener        | (evt: string,listener: (...data: any[]) => any,once: boolean = false) | VentEmit | Adds a listener function to the specified event.                                      |
| on                 | (evt: string,listener: (...data: any[]) => any,once: boolean = false) | VentEmit | An alias function of addListener.                                                     |
| once               | (evt: string, listener: (...data: any[]) => any)                      | VentEmit | Add a listener that will be automatically removed after its first execution.          |
| include            | (evt: string)                                                         | boolean  | Check if exist specified event. eturns true if exist.                                 |
| listeners          | (evt: string)                                                         | any[]    | null                                                                                  | Returns the listener array for the specified event. If so, eturn the array, no, return null. |
| removeListener     | (evt: string, listener: (...data: any[]) => any)                      | VentEmit | Removes a listener function from the specified event.                                 |
| off                | (evt: string, listener: (...data: any[]) => any)                      | VentEmit | An alias function of removeListener.                                                  |
| removeAllListeners | (evt: string)                                                         | VentEmit | Removes all listeners from a specified event.                                         |
| offAll             | (evt: string)                                                         | VentEmit | An alias function of removeAllListeners.                                              |
| emit               | (evt: string, ...args: any[])                                         | VentEmit | Emits an event, When emitted, every listener attached to that event will be executed. |
| trigger            | (evt: string, ...args: any[])                                         | VentEmit | An alias function of emit.                                                            |

# sifrr-storage &middot; [![npm version](https://img.shields.io/npm/v/@sifrr/storage.svg)](https://www.npmjs.com/package/@sifrr/storage)

Browser key-value(JSON) storage library with cow powers.

### Size
| Type | Size     |
| :------------ | :------------: |
| Normal (`dist/sifrr.storage.js`)       | [![Normal](https://img.badgesize.io/sifrr/sifrr/master/packages/browser/sifrr-storage/dist/sifrr.storage.js?maxAge=600)](https://github.com/sifrr/sifrr/blob/master/packages/browser/sifrr-storage/dist/sifrr.storage.js) |
| Minified (`dist/sifrr.storage.min.js`) | [![Minified](https://img.badgesize.io/sifrr/sifrr/master/packages/browser/sifrr-storage/dist/sifrr.storage.min.js?maxAge=600)](https://github.com/sifrr/sifrr/blob/master/packages/browser/sifrr-storage/dist/sifrr.storage.min.js) |
| Minified + Gzipped (`dist/sifrr.storage.min.js`) | [![Minified + Gzipped](https://img.badgesize.io/sifrr/sifrr/master/packages/browser/sifrr-storage/dist/sifrr.storage.min.js?compression=gzip&maxAge=600)](https://github.com/sifrr/sifrr/blob/master/packages/browser/sifrr-storage/dist/sifrr.storage.min.js) |

## Types of storages available (in default priority order)
- IndexedDB (Persisted - on page refresh or open/close)
- WebSQL (Persisted - on page refresh or open/close)
- LocalStorage (Persisted - on page refresh or open/close)
- Cookies (Persisted - on page refresh or open/close)
- JsonStorage (In memory - deleted on page refresh or open/close)

## How to use
### Directly in Browser using standalone distribution
Add script tag in your website.
```html
<script src="https://unpkg.com/@sifrr/storage@0.1.0-alpha/dist/sifrr.storage.min.js"></script>
```

#### Compatibility table for standalone distribution (Needs support for JavaScript Promises)
- chrome >= 55
- safari >= 10.1
- opera >= 42
- firefox >= 53

#### If you want to support older browsers without promises support, use [Promises Polyfill](https://github.com/stefanpenner/es6-promise) with sifrr-storage.

### Using npm
Do `npm i @sifrr/storage` or `yarn add @sifrr/storage` or add the package to your `package.json` file.

example, put in your frontend js module (compatible with webpack/rollup/etc):
#### Commonjs
```js
window.Sifrr = window.Sifrr || {};
window.Sifrr.Storage = require('@sifrr/storage');
```

#### ES modules
```js
import Storage from '@sifrr/storage';
window.Sifrr = window.Sifrr || {};
window.Sifrr.Storage = Storage;
```

## API

Sifrr.Storage uses Promises.

### Initialization

- Initialize a storage with a type
```js
let storage = new Sifrr.Storage(type)
```
where type is one of `indexeddb`, `websql`, `localstorage`, `cookies`, `jsonstorage`.

*Note*: If that type is not supported in the browser, then first supported storage will be selected based on priority order.

- Initialize with options
```js
// Options with default values
let options = {
  priority: ['indexeddb', 'websql', 'localstorage', 'cookies', 'jsonstorage'], // Priority Array of type of storages to use
  name: 'SifrrStorage', // name of table (treat this as a variable name, i.e. no Spaces or special characters allowed)
  version: 1, // version number (integer / float / string), 1 is treated same as '1'
  desciption: 'Sifrr Storage', // description (text)
  size: 5 * 1024 * 1024 // Max db size in bytes only for websql (integer)
}
storage = new Sifrr.Storage(options)
```

### Get details
```
storage.type; // type of storage
storage.name; // name of storage
storage.version; // version number
```

### Inserting key-value
```js
// insert single key-value
let key = 'key';
let value = { value: 'value' };
storage.insert(key, value).then(() => {/* Do something here */});

// insert multiple key-values
let data = { a: 'b', c: { d: 'e' } }
storage.insert(data).then(() => {/* Do something here */});
```

### Getting value
```js
// select single key-value
storage.select('key').then((value) => console.log(value)); // > { key: { value: 'value' } }

// select multiple key-values
storage.select(['a', 'c']).then((value) => console.log(value)); // > { a: 'b', c: { d: 'e' } }
```

### Deleting a key
```js
// delete single key-value
storage.delete('key').then(() => {/* Do something here */});

// delete multiple key-values
storage.delete(['a', 'c']).then(() => {/* Do something here */});
```

### Updating a key
```js
// update single key-value
let newValue = { newValue: 'new' };
storage.update('key', newValue).then(() => {
  // checking if value is updated
  storage.select('key').then((v) => console.log(v)); // > { key: { newValue: 'new' } }
});

// update multiple key-values
storage.update({ a: 'bnew', c: { dnew: 'enew' } }).then(() => {
  // checking if value is updated
  storage.select(['a', 'c']).then((v) => console.log(v)); // > { a: 'bnew', c: { dnew: 'enew' } }
});
```

### Upserting a key-value (Insert else update)
```js
// upsert single key-value
let upValue = { upValue: 'up' };
storage.upsert('key', upValue).then(() => {
  // checking if value is updated
  storage.select('key').then((v) => console.log(v)); // > { key: { upValue: 'up' } }
});

// upsert multiple key-values
storage.upsert({ a: 'bup', c: { dup: 'eup' } }).then(() => {
  // checking if value is updated
  storage.select(['a', 'c']).then((v) => console.log(v)); // > { a: 'bup', c: { dup: 'eup' } }
});
```

### Clear table
```js
storage.clear().then(() => {
  // checking if value is deleted
  storage.select('key').then((v) => console.log(v)); // > {}
});
```

### Get all data in table
```js
storage.data().then((data) => console.log(data)); // > { key: { upValue: 'up' }, a: 'bup', c: { dup: 'eup' } }
```

### Get all created storage instances
```js
Sifrr.Storage.all;
```

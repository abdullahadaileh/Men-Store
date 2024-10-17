'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const price = require('./price-f1f1114d.js');
require('./currency-ba038e2f.js');

const ScFormatInterval = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.value = 0;
    this.interval = '';
    this.every = '/';
    this.fallback = '';
  }
  render() {
    return price.translateInterval(this.value, this.interval, ` ${this.every}`, this.fallback);
  }
};

exports.sc_format_interval = ScFormatInterval;

//# sourceMappingURL=sc-format-interval.cjs.entry.js.map
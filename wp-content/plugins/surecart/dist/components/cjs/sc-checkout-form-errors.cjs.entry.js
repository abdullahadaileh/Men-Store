'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const getters$1 = require('./getters-20c3c3fd.js');
const mutations = require('./mutations-8d7c4499.js');
const getters = require('./getters-1e382cac.js');
const store = require('./store-96a02d63.js');
require('./index-fb76df07.js');
require('./index-00f0fc21.js');
require('./utils-a086ed6e.js');

const scCheckoutFormErrorsCss = ":host{display:block}ul{margin:6px 0px;padding:0px;list-style:none}";

const ScCheckoutFormErrors = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.removeStateListener = () => { };
  }
  /**
   * Get the alert type.
   * @returns string
   */
  getAlertType() {
    switch (mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.type) {
      case 'error':
        return 'danger';
      case 'default':
        return 'primary';
      default:
        return mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.type;
    }
  }
  componentWillLoad() {
    // remove notice if finalizing or updating.
    this.removeStateListener = store.onChange('formState', () => {
      if (['finalizing', 'updating'].includes(getters.currentFormState())) {
        mutations.removeNotice();
      }
    });
  }
  disconnectedCallback() {
    this.removeStateListener();
  }
  getTopLevelError() {
    var _a;
    // checkout invalid is not friendly.
    if ((mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.code) === 'checkout.invalid' && ((_a = getters$1.getAdditionalErrorMessages()) === null || _a === void 0 ? void 0 : _a.length)) {
      return '';
    }
    return mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.message;
  }
  render() {
    // don't show component if no error message or is finalizing or updating.
    if (!(mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.message) || ['finalizing', 'updating'].includes(getters.currentFormState())) {
      return index.h(index.Host, { style: { display: 'none' } });
    }
    return (index.h(index.Host, null, index.h("sc-alert", { type: this.getAlertType(), scrollOnOpen: true, open: !!(mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.message), closable: !!(mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.dismissible) }, !!this.getTopLevelError() && index.h("span", { slot: "title", innerHTML: this.getTopLevelError() }), (getters$1.getAdditionalErrorMessages() || []).map((message, index$1) => (index.h("div", { innerHTML: message, key: index$1 })))), index.h("slot", null)));
  }
};
ScCheckoutFormErrors.style = scCheckoutFormErrorsCss;

exports.sc_checkout_form_errors = ScCheckoutFormErrors;

//# sourceMappingURL=sc-checkout-form-errors.cjs.entry.js.map
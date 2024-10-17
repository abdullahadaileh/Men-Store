import { r as registerInstance, c as createEvent, h, a as getElement } from './index-644f5478.js';
import { l as loadScript, g as getScriptLoadParams } from './functions-b67a547b.js';
import { a as apiFetch } from './fetch-2525e763.js';
import { g as fetchCheckout } from './index-d7508e37.js';
import { c as createErrorNotice } from './mutations-0a628afa.js';
import './add-query-args-f4c5962b.js';
import './mutations-b8f9af9f.js';
import './index-1046c77e.js';
import './utils-00526fde.js';
import './get-query-arg-cb6b8763.js';
import './index-c5a96d53.js';
import './google-357f4c4c.js';
import './currency-728311ef.js';
import './price-178c2e2b.js';

const paypalButtonsCss = ":host{display:block}.paypal-buttons{position:relative;line-height:0;text-align:center}.paypal-buttons:not(.paypal-buttons--busy):after{content:\" \";border-bottom:1px solid var(--sc-input-border-color);width:100%;height:0;top:50%;left:0;right:0;position:absolute}";

const ScPaypalButtons = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.scSetState = createEvent(this, "scSetState", 7);
    this.scPaid = createEvent(this, "scPaid", 7);
    this.clientId = undefined;
    this.busy = false;
    this.merchantId = undefined;
    this.merchantInitiated = undefined;
    this.mode = undefined;
    this.order = undefined;
    this.buttons = ['paypal', 'card'];
    this.label = 'paypal';
    this.color = 'gold';
    this.loaded = undefined;
  }
  handleOrderChange(val, prev) {
    if ((val === null || val === void 0 ? void 0 : val.updated_at) === (prev === null || prev === void 0 ? void 0 : prev.updated_at)) {
      return;
    }
    this.cardContainer.innerHTML = '';
    this.paypalContainer.innerHTML = '';
    this.loadScript();
  }
  /** Load the script */
  async loadScript() {
    var _a, _b;
    if (!this.clientId || !this.merchantId)
      return;
    try {
      const paypal = await loadScript(getScriptLoadParams({
        clientId: this.clientId,
        merchantId: this.merchantId,
        merchantInitiated: this.merchantInitiated,
        reusable: (_a = this.order) === null || _a === void 0 ? void 0 : _a.reusable_payment_method_required,
        currency: (_b = this.order) === null || _b === void 0 ? void 0 : _b.currency,
      }));
      this.renderButtons(paypal);
    }
    catch (err) {
      console.error('failed to load the PayPal JS SDK script', err);
    }
  }
  /** Load the script on component load. */
  componentDidLoad() {
    this.loadScript();
  }
  /** Render the buttons. */
  renderButtons(paypal) {
    const createFunc = this.order.reusable_payment_method_required ? 'createBillingAgreement' : 'createOrder';
    const config = {
      /**
       * Validate the form, client-side when the button is clicked.
       */
      onClick: async (_, actions) => {
        const form = this.el.closest('sc-checkout');
        const isValid = await form.validate();
        return isValid ? actions.resolve() : actions.reject();
      },
      onInit: () => {
        this.loaded = true;
      },
      onCancel: () => {
        this.scSetState.emit('REJECT');
      },
      /**
       * The transaction has been approved.
       * We can capture it.
       */
      onApprove: async () => {
        var _a, _b, _c, _d;
        try {
          this.order = (await fetchCheckout({ id: (_a = this.order) === null || _a === void 0 ? void 0 : _a.id }));
        }
        catch (e) {
          console.error(e);
          createErrorNotice({ code: 'could_not_capture', message: wp.i18n.__('The payment did not process. Please try again.', 'surecart') });
          this.scSetState.emit('REJECT');
        }
        try {
          this.scSetState.emit('PAYING');
          const intent = (await apiFetch({
            method: 'PATCH',
            path: `surecart/v1/payment_intents/${((_c = (_b = this.order) === null || _b === void 0 ? void 0 : _b.payment_intent) === null || _c === void 0 ? void 0 : _c.id) || ((_d = this.order) === null || _d === void 0 ? void 0 : _d.payment_intent)}/capture`,
          }));
          if (['succeeded', 'processing'].includes(intent === null || intent === void 0 ? void 0 : intent.status)) {
            this.scSetState.emit('PAID');
            this.scPaid.emit();
          }
          else {
            createErrorNotice({ code: 'could_not_capture', message: wp.i18n.__('Payment processing failed. Kindly attempt the transaction once more.', 'surecart') });
            this.scSetState.emit('REJECT');
          }
        }
        catch (err) {
          console.error(err);
          createErrorNotice({ code: 'could_not_capture', message: wp.i18n.__('Payment processing failed. Kindly attempt the transaction once more.', 'surecart') });
          this.scSetState.emit('REJECT');
        }
      },
      /**
       * Transaction errored.
       * @param err
       */
      onError: err => {
        console.error(err);
        createErrorNotice(err);
        this.scSetState.emit('REJECT');
      },
    };
    config[createFunc] = async () => {
      return new Promise(async (resolve, reject) => {
        var _a, _b;
        // get the checkout component.
        const checkout = this.el.closest('sc-checkout');
        // submit and get the finalized order
        const order = (await checkout.submit());
        // an error occurred. reject with the error.
        if (order instanceof Error) {
          return reject(order);
        }
        // assume there was a validation issue here.
        // that is handled by our fetch function.
        if ((order === null || order === void 0 ? void 0 : order.status) !== 'finalized') {
          return reject(new Error('Something went wrong. Please try again.'));
        }
        // resolve the payment intent id.
        if ((_a = order === null || order === void 0 ? void 0 : order.payment_intent) === null || _a === void 0 ? void 0 : _a.external_intent_id) {
          return resolve((_b = order === null || order === void 0 ? void 0 : order.payment_intent) === null || _b === void 0 ? void 0 : _b.external_intent_id);
        }
        // we don't have the correct payment intent for some reason.
        createErrorNotice({ code: 'missing_payment_intent', message: wp.i18n.__('Something went wrong. Please contact us for payment.', 'surecart') });
        return reject();
      });
    };
    if (paypal.FUNDING.PAYPAL) {
      const paypalButton = paypal.Buttons({
        fundingSource: paypal.FUNDING.PAYPAL,
        style: {
          label: this.label,
          color: this.color,
        },
        ...config,
      });
      if (paypalButton.isEligible()) {
        paypalButton.render(this.paypalContainer);
      }
    }
    if (paypal.FUNDING.CARD) {
      const cardButton = paypal.Buttons({
        fundingSource: paypal.FUNDING.CARD,
        style: {
          color: 'black',
        },
        ...config,
      });
      if (cardButton.isEligible()) {
        cardButton.render(this.cardContainer);
      }
    }
  }
  render() {
    return (h("div", { part: `base ${this.busy || (!this.loaded && 'base--busy')}`, class: { 'paypal-buttons': true, 'paypal-buttons--busy': this.busy || !this.loaded } }, (!this.loaded || this.busy) && h("sc-skeleton", { style: { 'height': '55px', '--border-radius': '4px', 'cursor': 'wait' } }), h("div", { class: "sc-paypal-button-container", hidden: !this.loaded || this.busy }, h("div", { part: "paypal-card-button", hidden: !this.buttons.includes('card'), class: "sc-paypal-card-button", ref: el => (this.cardContainer = el) }), h("div", { part: "paypal-button", hidden: !this.buttons.includes('paypal'), class: "sc-paypal-button", ref: el => (this.paypalContainer = el) }))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "order": ["handleOrderChange"]
  }; }
};
ScPaypalButtons.style = paypalButtonsCss;

const scSecureNoticeCss = ":host{display:block;--sc-secure-notice-icon-color:var(--sc-color-gray-300);--sc-secure-notice-font-size:var(--sc-font-size-small);--sc-secure-notice-color:var(--sc-color-gray-500)}.notice{color:var(--sc-secure-notice-color);font-size:var(--sc-secure-notice-font-size);display:flex;align-items:center;gap:5px}.notice__text{flex:1;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap}.notice__icon{color:var(--sc-secure-notice-icon-color);margin-right:5px}";

const ScSecureNotice = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h("div", { class: "notice", part: "base" }, h("svg", { class: "notice__icon", part: "icon", xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 512 512", fill: "currentColor" }, h("path", { d: "M368,192H352V112a96,96,0,1,0-192,0v80H144a64.07,64.07,0,0,0-64,64V432a64.07,64.07,0,0,0,64,64H368a64.07,64.07,0,0,0,64-64V256A64.07,64.07,0,0,0,368,192Zm-48,0H192V112a64,64,0,1,1,128,0Z" })), h("span", { class: "notice__text", part: "text" }, h("slot", { name: "prefix" }), h("slot", null), h("slot", { name: "suffix" }))));
  }
};
ScSecureNotice.style = scSecureNoticeCss;

export { ScPaypalButtons as sc_paypal_buttons, ScSecureNotice as sc_secure_notice };

//# sourceMappingURL=sc-paypal-buttons_2.entry.js.map
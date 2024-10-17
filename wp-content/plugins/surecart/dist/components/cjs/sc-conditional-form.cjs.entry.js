'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const watchers = require('./watchers-fecceee2.js');
const getters = require('./getters-8b2c88a6.js');
require('./index-00f0fc21.js');
require('./mutations-164b66b1.js');
require('./utils-a086ed6e.js');
require('./get-query-arg-53bf21e2.js');
require('./add-query-args-17c551b6.js');
require('./index-fb76df07.js');
require('./google-62bdaeea.js');
require('./currency-ba038e2f.js');
require('./price-f1f1114d.js');
require('./address-07819c5b.js');

/**
 * Check if any of the rule groups is passed or not.
 *
 * @param {array} groups Rule groups.
 * @param {object} props Data.
 * @returns {boolean}
 */
const hasAnyRuleGroupPassed = (groups, props) => {
  return (groups || []).some(({ rules }) => hasRulesPassed(rules, props));
};
/**
 * CHeck if all rules are passed or not.
 *
 * @param {array} rules Rules.
 * @param {object} props Data.
 * @returns {boolean}
 */
const hasRulesPassed = (rules, { checkout, processor }) => {
  return rules
    .map(rule => {
    var _a, _b;
    const ruleValue = Array.isArray(rule === null || rule === void 0 ? void 0 : rule.value) ? (rule === null || rule === void 0 ? void 0 : rule.value).map(ruleValue => (ruleValue === null || ruleValue === void 0 ? void 0 : ruleValue.value) || ruleValue) : rule === null || rule === void 0 ? void 0 : rule.value;
    switch (rule === null || rule === void 0 ? void 0 : rule.condition) {
      case 'total':
        return compareNumberValues(parseFloat(checkout.total_amount), parseFloat(ruleValue), rule === null || rule === void 0 ? void 0 : rule.operator);
      case 'products':
        return compareObjectValues(getCartProductIds(checkout), ruleValue, rule === null || rule === void 0 ? void 0 : rule.operator);
      case 'coupons':
        return compareObjectValues(getCartCouponIds(checkout), ruleValue, rule === null || rule === void 0 ? void 0 : rule.operator);
      case 'shipping_country':
        return compareObjectValues([(_a = checkout === null || checkout === void 0 ? void 0 : checkout.shipping_address) === null || _a === void 0 ? void 0 : _a.country], ruleValue, rule === null || rule === void 0 ? void 0 : rule.operator);
      case 'billing_country':
        return compareObjectValues([(_b = checkout === null || checkout === void 0 ? void 0 : checkout.billing_address) === null || _b === void 0 ? void 0 : _b.country], ruleValue, rule === null || rule === void 0 ? void 0 : rule.operator);
      case 'processors':
        return compareObjectValues([processor], ruleValue, rule === null || rule === void 0 ? void 0 : rule.operator);
      default:
        return false;
    }
  })
    .every(rules => rules);
};
/**
 * Get array of products from checkout.
 *
 * @param {object} checkout CHeckout data.
 * @returns {array}
 */
const getCartProductIds = (checkout) => {
  var _a;
  return (((_a = checkout === null || checkout === void 0 ? void 0 : checkout.line_items) === null || _a === void 0 ? void 0 : _a.data) || []).map(({ price }) => { var _a; return (_a = price === null || price === void 0 ? void 0 : price.product) === null || _a === void 0 ? void 0 : _a.id; });
};
/**
 * Get array of coupons from checkout.
 *
 * @param {object} checkout CHeckout data.
 * @returns {array}
 */
const getCartCouponIds = (checkout) => {
  var _a, _b, _c, _d;
  return ((_b = (_a = checkout === null || checkout === void 0 ? void 0 : checkout.discount) === null || _a === void 0 ? void 0 : _a.coupon) === null || _b === void 0 ? void 0 : _b.id) ? [(_d = (_c = checkout === null || checkout === void 0 ? void 0 : checkout.discount) === null || _c === void 0 ? void 0 : _c.coupon) === null || _d === void 0 ? void 0 : _d.id] : [];
};
/**
 * Compare object values.
 *
 * @param {array} cart_values order values.
 * @param {array} rule_values rules values.
 * @param {string} operator rule operator.
 * @returns {boolean}
 */
const compareObjectValues = (cart_values, rule_values, operator) => {
  switch (operator) {
    case 'all':
      return rule_values.filter(n1 => cart_values.some(n2 => n1 == n2)).length === rule_values.length;
    case 'any':
      return cart_values.filter(n1 => rule_values.some(n2 => n1 == n2)).length >= 1;
    case 'none':
      return cart_values.filter(n1 => rule_values.some(n2 => n1 == n2)).length === 0;
    case 'exist':
      return cart_values.length >= 1;
    case 'not_exist':
      return cart_values.length === 0;
    default:
      return false;
  }
};
/**
 * Compare string values.
 *
 * @param string number1 The actual number from cart/order.
 * @param array  number2 Rule values.
 * @param string operator Rule operator.
 * @returns {boolean}
 */
const compareNumberValues = (number1, number2, operator) => {
  switch (operator) {
    case '==':
      return number1 === number2;
    case '!=':
      return number1 !== number2;
    case '>':
      return number1 > number2;
    case '<':
      return number1 < number2;
    case '<=':
      return number1 <= number2;
    case '>=':
      return number1 >= number2;
  }
  return false;
};

const scConditionalFormCss = ":host{display:block}";

const ScConditionalForm = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.rule_groups = undefined;
  }
  render() {
    let show = hasAnyRuleGroupPassed(this.rule_groups, { checkout: getters.currentCheckout(), processor: watchers.state === null || watchers.state === void 0 ? void 0 : watchers.state.id });
    if (!show)
      return null;
    return (index.h(index.Host, null, index.h("slot", null)));
  }
};
ScConditionalForm.style = scConditionalFormCss;

exports.sc_conditional_form = ScConditionalForm;

//# sourceMappingURL=sc-conditional-form.cjs.entry.js.map
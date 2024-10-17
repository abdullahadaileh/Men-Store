'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const getters = require('./getters-3a50490a.js');
require('./store-1aade79c.js');
require('./utils-a086ed6e.js');
require('./index-00f0fc21.js');

const scUpsellCountdownTimerCss = ":host{display:flex;justify-content:var(--sc-upsell-countdown-timer-justify-content, center);align-items:var(--sc-upsell-countdown-timer-align-items, center);text-align:var(--sc-upsell-countdown-timer-text-align, center);flex-wrap:wrap;gap:var(--sc-upsell-countdown-timer-gap, 0.5em);line-height:1;padding:var(--sc-upsell-countdown-timer-padding, var(--sc-spacing-medium));border-radius:var(--sc-upsell-countdown-timer-border-radius, var(--sc-border-radius-pill));background-color:var(--sc-upsell-countdown-timer-background-color, rgb(226, 249, 235));color:var(--sc-upsell-countdown-timer-color, rgb(71, 91, 80))}";

const ScUpsellCountdownTimer = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.timeRemaining = Infinity;
    this.formattedTime = undefined;
    this.showIcon = true;
  }
  componentDidLoad() {
    this.updateCountdown();
  }
  updateCountdown() {
    this.formattedTime = getters.getFormattedRemainingTime();
    setInterval(() => {
      this.formattedTime = getters.getFormattedRemainingTime();
    }, 1000);
  }
  render() {
    return (index.h(index.Host, { role: "timer", class: {
        'sc-upsell-countdown-timer': true,
      } }, this.showIcon && index.h("sc-icon", { name: "clock" }), index.h("span", null, index.h("slot", { name: "offer-expire-text" }), " ", index.h("strong", null, this.formattedTime))));
  }
};
ScUpsellCountdownTimer.style = scUpsellCountdownTimerCss;

exports.sc_upsell_countdown_timer = ScUpsellCountdownTimer;

//# sourceMappingURL=sc-upsell-countdown-timer.cjs.entry.js.map
import { r as registerInstance, h, H as Host } from './index-644f5478.js';
import { d as getFormattedRemainingTime } from './getters-2e810784.js';
import './store-77f83bce.js';
import './utils-00526fde.js';
import './index-1046c77e.js';

const scUpsellCountdownTimerCss = ":host{display:flex;justify-content:var(--sc-upsell-countdown-timer-justify-content, center);align-items:var(--sc-upsell-countdown-timer-align-items, center);text-align:var(--sc-upsell-countdown-timer-text-align, center);flex-wrap:wrap;gap:var(--sc-upsell-countdown-timer-gap, 0.5em);line-height:1;padding:var(--sc-upsell-countdown-timer-padding, var(--sc-spacing-medium));border-radius:var(--sc-upsell-countdown-timer-border-radius, var(--sc-border-radius-pill));background-color:var(--sc-upsell-countdown-timer-background-color, rgb(226, 249, 235));color:var(--sc-upsell-countdown-timer-color, rgb(71, 91, 80))}";

const ScUpsellCountdownTimer = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.timeRemaining = Infinity;
    this.formattedTime = undefined;
    this.showIcon = true;
  }
  componentDidLoad() {
    this.updateCountdown();
  }
  updateCountdown() {
    this.formattedTime = getFormattedRemainingTime();
    setInterval(() => {
      this.formattedTime = getFormattedRemainingTime();
    }, 1000);
  }
  render() {
    return (h(Host, { role: "timer", class: {
        'sc-upsell-countdown-timer': true,
      } }, this.showIcon && h("sc-icon", { name: "clock" }), h("span", null, h("slot", { name: "offer-expire-text" }), " ", h("strong", null, this.formattedTime))));
  }
};
ScUpsellCountdownTimer.style = scUpsellCountdownTimerCss;

export { ScUpsellCountdownTimer as sc_upsell_countdown_timer };

//# sourceMappingURL=sc-upsell-countdown-timer.entry.js.map
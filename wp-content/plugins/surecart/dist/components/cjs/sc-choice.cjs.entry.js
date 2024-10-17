'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const formData = require('./form-data-69000afe.js');
const pageAlign = require('./page-align-bf197eb4.js');

const scChoiceCss = ":host{display:flex;flex-direction:column;align-items:stretch;justify-content:stretch;min-width:0;align-self:stretch;--mobile-size:100px}[hidden]{border:0 !important;clip:rect(0 0 0 0) !important;height:1px !important;margin:-1px !important;overflow:hidden !important;padding:0 !important;position:absolute !important;width:1px !important}.choice{background:var(--sc-choice-background-color);font-family:var(--sc-input-font-family);font-size:var(--sc-input-font-size-medium);font-weight:var(--sc-input-font-weight);user-select:none;border:var(--sc-choice-border);border-radius:var(--sc-choice-border-radius, var(--sc-input-border-radius-large));box-shadow:var(--sc-choice-box-shadow);cursor:pointer;padding:var(--sc-choice-padding, 1.3em 1.1em);position:relative;text-decoration:none;color:var(--sc-input-color);height:100%;transition:background-color 150ms ease, border-color 150ms ease, color 150ms ease, box-shadow 150ms ease}.choice--is-rtl{text-align:right}.choice__content{cursor:pointer;display:flex;gap:0.75em}.choice--checked{border-color:var(--sc-color-primary-500);box-shadow:0 0 0 1px var(--sc-color-primary-500);z-index:1}.choice__title{display:inline-block;font-weight:var(--sc-input-label-font-weight);font-size:var(--sc-input-label-font-size-medium)}.choice--size-small{padding:0.75em 0.9em}.choice--size-large{padding:1.3em 1.1em}.choice__icon{display:inline-flex;width:var(--sc-radio-size);height:var(--sc-radio-size)}.choice__icon svg{width:100%;height:100%}.choice__control{flex:0 0 auto;position:relative;display:inline-flex;align-items:center;justify-content:center;border:solid var(--sc-input-border-width) var(--sc-input-border-color);background-color:var(--sc-input-background-color);color:transparent;transition:var(--sc-input-transition, var(--sc-transition-medium)) border-color, var(--sc-input-transition, var(--sc-transition-medium)) background-color, var(--sc-input-transition, var(--sc-transition-medium)) color, var(--sc-input-transition, var(--sc-transition-medium)) box-shadow}.choice__control.choice__radio{width:var(--sc-radio-size);height:var(--sc-radio-size);border-radius:50%}.choice__control.choice__checkbox{width:var(--sc-toggle-size);height:var(--sc-toggle-size);border-radius:4px}.choice__control input[type=radio],.choice__control input[type=checkbox]{position:absolute;opacity:0;padding:0;margin:0;pointer-events:none}.choice:not(.choice--checked):not(.choice--disabled) .choice__control:hover{border-color:var(--sc-input-border-color-hover);background-color:var(--sc-input-background-color-hover)}.choice.choice--focused:not(.choice--checked):not(.choice--disabled) .choice__control{border-color:var(--var-sc-checked-focus-border-color, var(--sc-input-background-color));background-color:var(--sc-input-background-color-focus);box-shadow:0 0 0 var(--sc-focus-ring-width) var(--sc-color-primary-500)}.choice.choice--focused:not(.choice--checked):not(.choice--disabled){outline-style:solid;outline-color:var(--sc-color-primary-500);outline-width:var(--sc-focus-ring-width);outline-offset:2px}.choice--checked .choice__control{color:var(--var-sc-checked-color, var(--sc-input-background-color));border-color:var(--sc-color-primary-500);background-color:var(--sc-color-primary-500)}.choice.choice--checked:not(.choice--disabled) .choice__control:hover{border-color:var(--var-sc-checked-hover-radio-border-color, var(--sc-input-background-color));background-color:var(--sc-color-primary-500)}.choice.choice--checked:not(.choice--disabled).choice--focused .choice__control{border-color:var(--var-sc-checked-focus-radio-border-color, var(--sc-input-background-color));background-color:var(--sc-color-primary-500);box-shadow:0 0 0 var(--sc-focus-ring-width) var(--sc-focus-ring-color-primary)}.choice--disabled{opacity:0.5;cursor:not-allowed}.choice:not(.choice--checked) svg circle{opacity:0}.choice__label{width:100%;line-height:1;user-select:none}.choice--layout-columns .choice__label{display:flex;justify-content:space-between;flex-wrap:wrap;gap:0.5em}.choice--layout-columns .choice__price{text-align:right;margin:0;display:flex;gap:var(--sc-spacing-xx-small)}.choice__description{display:inline-block;color:var(--sc-color-gray-500);font-size:var(--sc-font-size-medium)}.choice__label-text{display:block;display:flex;flex-direction:column;gap:0.2em;flex:1}.choice__price{display:block}";

let id = 0;
const ScChoice = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.scBlur = index.createEvent(this, "scBlur", 7);
    this.scChange = index.createEvent(this, "scChange", 7);
    this.scFocus = index.createEvent(this, "scFocus", 7);
    this.inputId = `choice-${++id}`;
    this.labelId = `choice-label-${id}`;
    this.hasFocus = false;
    this.isStacked = false;
    this.name = undefined;
    this.size = 'medium';
    this.value = undefined;
    this.type = 'radio';
    this.disabled = false;
    this.checked = false;
    this.required = false;
    this.invalid = false;
    this.showLabel = true;
    this.showPrice = true;
    this.showControl = true;
    this.hasDefaultSlot = undefined;
    this.hasPrice = undefined;
    this.hasPer = undefined;
    this.hasDescription = undefined;
  }
  /** Simulates a click on the choice. */
  async triggerClick() {
    this.input.click();
  }
  async triggerFocus() {
    this.input.focus();
  }
  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  async reportValidity() {
    this.invalid = !this.input.checkValidity();
    if (this.required) {
      const choices = this.getAllChoices();
      if (!choices.some(c => c.checked)) {
        this.input.setCustomValidity(this.type === 'radio' ? wp.i18n.__('Please choose one.', 'surecart') : wp.i18n.__('Please choose at least one.', 'surecart'));
        this.invalid = !this.input.checkValidity();
      }
      else {
        this.input.setCustomValidity('');
        this.invalid = !this.input.checkValidity();
      }
    }
    return this.input.reportValidity();
  }
  handleCheckedChange() {
    this.input.setCustomValidity('');
    if (this.type === 'radio' && this.checked) {
      this.getSiblingChoices().map(choice => (choice.checked = false));
    }
    this.input.checked = this.checked;
  }
  handleBlur() {
    this.hasFocus = false;
    this.scBlur.emit();
  }
  handleFocus() {
    this.hasFocus = true;
    this.scFocus.emit();
  }
  /** Sets a custom validation message. If `message` is not empty, the field will be considered invalid. */
  async setCustomValidity(message) {
    this.input.setCustomValidity(message);
    this.invalid = !this.input.checkValidity();
  }
  getAllChoices() {
    const choiceGroup = this.el.closest('sc-choices') || this.el.parentElement;
    // Radios must be part of a radio group
    if (!choiceGroup) {
      return [];
    }
    return [...choiceGroup.querySelectorAll('sc-choice')];
  }
  getSiblingChoices() {
    return this.getAllChoices().filter(choice => choice !== this.el);
  }
  handleKeyDown(event) {
    // On arrow key press
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      const choices = this.getAllChoices().filter(choice => !choice.disabled);
      const incr = ['ArrowUp', 'ArrowLeft'].includes(event.key) ? -1 : 1;
      let index = choices.indexOf(this.el) + incr;
      if (index < 0)
        index = choices.length - 1;
      if (index > choices.length - 1)
        index = 0;
      choices[index].triggerFocus();
      choices[index].checked = true;
      event.preventDefault();
    }
    if ('Enter' === event.key || ' ' === event.key) {
      this.handleClickEvent();
    }
  }
  // Prevent clicks on the label from briefly blurring the input
  handleMouseDown(event) {
    event.preventDefault();
    this.input.focus();
  }
  componentDidLoad() {
    this.handleResize();
    this.formController = new formData.FormSubmitController(this.el, {
      value: (control) => (control.checked ? control.value : undefined),
    }).addFormData();
  }
  disconnectedCallback() {
    var _a;
    (_a = this.formController) === null || _a === void 0 ? void 0 : _a.removeFormData();
  }
  handleResize() {
    if (!(window === null || window === void 0 ? void 0 : window.ResizeObserver)) {
      return;
    }
    const resizeObserver = new window.ResizeObserver(entries => {
      for (let entry of entries) {
        if (entry.contentBoxSize) {
          const contentBoxSize = Array.isArray(entry.contentBoxSize) ? entry.contentBoxSize[0] : entry.contentBoxSize;
          setTimeout(() => (this.isStacked = (contentBoxSize === null || contentBoxSize === void 0 ? void 0 : contentBoxSize.inlineSize) < 350), 0);
        }
      }
    });
    resizeObserver.observe(this.el);
  }
  handleSlotChange() {
    this.hasPrice = !!this.el.querySelector('[slot="price"]');
    this.hasPer = !!this.el.querySelector('[slot="per"]');
    this.hasDescription = !!this.el.querySelector('[slot="description"]');
    this.hasDefaultSlot = !!this.el.querySelector('[slot="default"]');
  }
  handleClickEvent() {
    if (this.type === 'checkbox') {
      this.checked = !this.checked;
      this.scChange.emit(this.input.checked);
    }
    else if (!this.checked) {
      this.checked = true;
      this.scChange.emit(this.input.checked);
    }
  }
  render() {
    return (index.h(index.Host, { tabindex: "0", onFocus: () => this.input.focus() }, index.h("div", { part: "base", class: {
        'choice': true,
        'choice--checked': this.checked,
        'choice--disabled': this.disabled,
        'choice--focused': this.hasFocus,
        'choice--layout-columns': !this.isStacked,
        'choice--is-rtl': pageAlign.isRtl(),
        [`choice--size-${this.size}`]: true,
      }, onKeyDown: e => this.handleKeyDown(e), onMouseDown: e => this.handleMouseDown(e) }, index.h("slot", { name: "header" }), index.h("label", { class: "choice__content", part: "content", htmlFor: this.inputId }, index.h("span", { part: "control", class: {
        choice__control: true,
        choice__checkbox: this.type === 'checkbox',
        choice__radio: this.type === 'radio',
      }, hidden: !this.showControl }, index.h("span", { part: "checked-icon", class: "choice__icon" }, this.type === 'checkbox' ? (index.h("svg", { viewBox: "0 0 16 16" }, index.h("g", { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd", "stroke-linecap": "round" }, index.h("g", { stroke: "currentColor", "stroke-width": "2" }, index.h("g", { transform: "translate(3.428571, 3.428571)" }, index.h("path", { d: "M0,5.71428571 L3.42857143,9.14285714" }), index.h("path", { d: "M9.14285714,0 L3.42857143,9.14285714" })))))) : (index.h("svg", { viewBox: "0 0 16 16" }, index.h("g", { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd" }, index.h("g", { fill: "currentColor" }, index.h("circle", { cx: "8", cy: "8", r: "3.42857143" })))))), index.h("input", { id: this.inputId, ref: el => (this.input = el), type: this.type, name: this.name, value: this.value, checked: this.checked, disabled: this.disabled, "aria-checked": this.checked ? 'true' : 'false', "aria-disabled": this.disabled ? 'true' : 'false', "aria-labelledby": this.labelId, tabindex: "0",
      // required={this.required}
      onBlur: () => this.handleBlur(), onFocus: () => this.handleFocus(), onChange: () => this.handleClickEvent() })), index.h("span", { part: "label", id: this.labelId, class: "choice__label" }, index.h("span", { class: "choice__label-text", hidden: !this.showLabel }, index.h("span", { class: "choice__title", part: "title" }, index.h("slot", { onSlotchange: () => this.handleSlotChange() })), index.h("span", { class: "choice__description description", part: "description", hidden: !this.hasDescription }, index.h("slot", { name: "description", onSlotchange: () => this.handleSlotChange() }))), index.h("span", { class: "choice__price", hidden: !this.showPrice || (!this.hasPrice && !this.hasPer) }, index.h("span", { class: "choice__title" }, index.h("slot", { name: "price", onSlotchange: () => this.handleSlotChange() })), ' ', index.h("span", { class: "choice__description" }, index.h("slot", { name: "per", onSlotchange: () => this.handleSlotChange() }))))), index.h("slot", { name: "footer" }))));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "checked": ["handleCheckedChange"]
  }; }
};
ScChoice.style = scChoiceCss;

exports.sc_choice = ScChoice;

//# sourceMappingURL=sc-choice.cjs.entry.js.map
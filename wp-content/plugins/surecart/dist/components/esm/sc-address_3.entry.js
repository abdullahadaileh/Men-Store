import { r as registerInstance, c as createEvent, h, a as getElement, F as Fragment } from './index-644f5478.js';
import { c as countryChoices, a as hasPostal, b as hasCity, h as hasState } from './address-8d75115e.js';
import { r as reportChildrenValidity, F as FormSubmitController } from './form-data-dd63c61f.js';
import { i as isRtl } from './page-align-8602c4c7.js';
import { s as speak } from './index-c5a96d53.js';
import { z as zones } from './tax-79350864.js';

const scAddressCss = ":host{display:block}.sc-address{display:block;position:relative}.sc-address [hidden]{display:none}.sc-address--loading{min-height:230px}.sc-address sc-skeleton{display:block;margin-bottom:1em}.sc-address__control{display:block}.sc-address__control>*{margin-bottom:var(--sc-address-column-spacing, -1px)}.sc-address__columns{display:flex;flex-direction:row;align-items:center;flex-wrap:wrap;justify-content:space-between}.sc-address__columns>*{flex:1;width:50%;margin-right:var(--sc-address-column-spacing, -1px)}.sc-address__columns>*:last-child{margin-right:0}";

const ScAddress = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.scChangeAddress = createEvent(this, "scChangeAddress", 7);
    this.scInputAddress = createEvent(this, "scInputAddress", 7);
    this.address = {
      country: null,
      city: null,
      line_1: null,
      line_2: null,
      postal_code: null,
      state: null,
    };
    this.names = {
      name: 'shipping_name',
      country: 'shipping_country',
      city: 'shipping_city',
      line_1: 'shipping_line_1',
      line_2: 'shipping_line_2',
      postal_code: 'shipping_postal_code',
      state: 'shipping_state',
    };
    this.placeholders = {};
    this.loading = false;
    this.disabled = undefined;
    this.label = undefined;
    this.showName = undefined;
    this.showLine2 = undefined;
    this.required = false;
    this.requireName = false;
    this.showCity = true;
    this.showPostal = true;
    this.regions = undefined;
    this.countryChoices = countryChoices;
  }
  /** When the state changes, we want to update city and postal fields. */
  handleAddressChange() {
    if (!this.address.country)
      return;
    this.setRegions();
    this.showPostal = hasPostal(this.address.country);
    this.showCity = hasCity(this.address.country);
    this.scChangeAddress.emit(this.address);
    this.scInputAddress.emit(this.address);
  }
  handleNameChange() {
    if (this.requireName) {
      this.showName = true;
    }
  }
  decodeHtmlEntities(html) {
    var _a;
    return ((_a = new DOMParser().parseFromString(html, 'text/html')) === null || _a === void 0 ? void 0 : _a.body.textContent) || html;
  }
  updateAddress(address) {
    this.address = { ...this.address, ...address };
  }
  handleAddressInput(address) {
    this.scInputAddress.emit({ ...this.address, ...address });
  }
  clearAddress() {
    var _a;
    this.address = {
      name: (_a = this.address) === null || _a === void 0 ? void 0 : _a.name,
      country: null,
      city: null,
      line_1: null,
      line_2: null,
      postal_code: null,
      state: null,
    };
  }
  /** Set the regions based on the country. */
  setRegions() {
    if (hasState(this.address.country)) {
      import('./countries-dfee7456.js').then(module => {
        const countryRegions = module === null || module === void 0 ? void 0 : module[this.address.country];
        this.regions = (countryRegions || []).map(region => ({
          ...region,
          label: this.decodeHtmlEntities(region.label),
        }));
      });
    }
    else {
      this.regions = [];
    }
  }
  componentWillLoad() {
    var _a;
    this.handleAddressChange();
    const country = ((_a = this.countryChoices.find(country => country.value === this.address.country)) === null || _a === void 0 ? void 0 : _a.value) || null;
    this.updateAddress({ country });
    this.handleNameChange();
  }
  async reportValidity() {
    return reportChildrenValidity(this.el);
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
    return (h("div", { class: "sc-address", part: "base" }, h("sc-form-control", { label: this.label, exportparts: "label, help-text, form-control", class: "sc-address__control", required: this.required }, this.showName && (h("sc-input", { exportparts: "base:input__base, input, form-control, label, help-text", value: (_a = this === null || this === void 0 ? void 0 : this.address) === null || _a === void 0 ? void 0 : _a.name, onScChange: (e) => this.updateAddress({ name: e.target.value || null }), onScInput: (e) => this.handleAddressInput({ name: e.target.value || null }), autocomplete: "street-address", placeholder: this.placeholders.name || wp.i18n.__('Name or Company Name', 'surecart'), name: (_b = this.names) === null || _b === void 0 ? void 0 : _b.name, "squared-bottom": true, disabled: this.disabled, required: this.requireName, "aria-label": this.placeholders.name || wp.i18n.__('Name or Company Name', 'surecart') })), h("sc-select", { exportparts: "base:select__base, input, form-control, label, help-text, trigger, panel, caret, search__base, search__input, search__form-control, menu__base, spinner__base, empty", part: "name__input", value: (_c = this.address) === null || _c === void 0 ? void 0 : _c.country, onScChange: (e) => {
        this.clearAddress();
        this.updateAddress({ country: e.target.value });
      }, choices: this.countryChoices, autocomplete: 'country-name', placeholder: this.placeholders.country || wp.i18n.__('Country', 'surecart'), name: (_d = this.names) === null || _d === void 0 ? void 0 : _d.country, search: true, unselect: false, "squared-bottom": true, squared: this.showName, disabled: this.disabled, required: this.required, "aria-label": this.placeholders.country || wp.i18n.__('Country', 'surecart') }), h("sc-input", { exportparts: "base:input__base, input, form-control, label, help-text", value: (_e = this === null || this === void 0 ? void 0 : this.address) === null || _e === void 0 ? void 0 : _e.line_1, onScChange: (e) => this.updateAddress({ line_1: e.target.value || null }), onScInput: (e) => this.handleAddressInput({ line_1: e.target.value || null }), autocomplete: "street-address", placeholder: this.placeholders.line_1 || wp.i18n.__('Address', 'surecart'), name: (_f = this.names) === null || _f === void 0 ? void 0 : _f.line_1, squared: true, disabled: this.disabled, required: this.required, "aria-label": this.placeholders.line_1 || wp.i18n.__('Address', 'surecart') }), this.showLine2 && (h("sc-input", { exportparts: "base:input__base, input, form-control, label, help-text", value: (_g = this === null || this === void 0 ? void 0 : this.address) === null || _g === void 0 ? void 0 : _g.line_2, onScChange: (e) => this.updateAddress({ line_2: e.target.value || null }), onScInput: (e) => this.handleAddressInput({ line_2: e.target.value || null }), autocomplete: "street-address", placeholder: this.placeholders.line_2 || wp.i18n.__('Address Line 2', 'surecart'), name: (_h = this.names) === null || _h === void 0 ? void 0 : _h.line_2, squared: true, disabled: this.disabled, "aria-label": this.placeholders.line_2 || wp.i18n.__('Address Line 2', 'surecart') })), h("div", { class: "sc-address__columns", part: "columns" }, this.showCity && (h("sc-input", { exportparts: "base:input__base, input, form-control, label, help-text", placeholder: this.placeholders.city || wp.i18n.__('City', 'surecart'), name: (_j = this.names) === null || _j === void 0 ? void 0 : _j.city, value: (_k = this === null || this === void 0 ? void 0 : this.address) === null || _k === void 0 ? void 0 : _k.city, onScChange: (e) => this.updateAddress({ city: e.target.value || null }), onScInput: (e) => this.handleAddressInput({ city: e.target.value || null }), required: this.required, squared: !!((_l = this === null || this === void 0 ? void 0 : this.regions) === null || _l === void 0 ? void 0 : _l.length), "squared-top": true, disabled: this.disabled, "squared-right": this.showPostal, "aria-label": this.placeholders.city || wp.i18n.__('City', 'surecart') })), this.showPostal && (h("sc-input", { exportparts: "base:input__base, input, form-control, label, help-text", placeholder: this.placeholders.postal_code || wp.i18n.__('Postal Code/Zip', 'surecart'), name: (_m = this.names) === null || _m === void 0 ? void 0 : _m.postal_code, onScChange: (e) => this.updateAddress({ postal_code: e.target.value || null }), onScInput: (e) => this.handleAddressInput({ postal_code: e.target.value || null }), autocomplete: 'postal-code', required: this.required, value: (_o = this === null || this === void 0 ? void 0 : this.address) === null || _o === void 0 ? void 0 : _o.postal_code, squared: !!((_p = this === null || this === void 0 ? void 0 : this.regions) === null || _p === void 0 ? void 0 : _p.length), "squared-top": true, disabled: this.disabled, maxlength: ((_q = this.address) === null || _q === void 0 ? void 0 : _q.country) === 'US' ? 5 : null, "squared-left": this.showCity, "aria-label": this.placeholders.postal_code || wp.i18n.__('Postal Code/Zip', 'surecart') }))), !!((_r = this === null || this === void 0 ? void 0 : this.regions) === null || _r === void 0 ? void 0 : _r.length) && !!((_s = this === null || this === void 0 ? void 0 : this.address) === null || _s === void 0 ? void 0 : _s.country) && (h("sc-select", { exportparts: "base:select__base, input, form-control, label, help-text, trigger, panel, caret, search__base, search__input, search__form-control, menu__base, spinner__base, empty", placeholder: this.placeholders.state || wp.i18n.__('State/Province/Region', 'surecart'), name: (_t = this.names) === null || _t === void 0 ? void 0 : _t.state, autocomplete: 'address-level1', value: (_u = this === null || this === void 0 ? void 0 : this.address) === null || _u === void 0 ? void 0 : _u.state, onScChange: (e) => { var _a; return this.updateAddress({ state: e.target.value || ((_a = e.detail) === null || _a === void 0 ? void 0 : _a.value) || null }); }, choices: this.regions, required: this.required, disabled: this.disabled, search: true, "squared-top": true, "aria-label": this.placeholders.state || wp.i18n.__('State/Province/Region', 'surecart') }))), this.loading && h("sc-block-ui", { exportparts: "base:block-ui, content:block-ui__content" })));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "address": ["handleAddressChange"],
    "requireName": ["handleNameChange"]
  }; }
};
ScAddress.style = scAddressCss;

const scCheckboxCss = ":host{display:block}.checkbox{display:flex;font-family:var(--sc-input-font-family);font-size:var(--sc-input-font-size-medium);font-weight:var(--sc-input-font-weight);color:var(--sc-input-color);vertical-align:middle;cursor:pointer}.checkbox__control{flex:0 0 auto;position:relative;display:inline-flex;align-items:center;justify-content:center;width:var(--sc-checkbox-size);height:var(--sc-checkbox-size);border:solid var(--sc-input-border-width) var(--sc-input-border-color);border-radius:2px;background-color:var(--sc-input-background-color);color:var(--sc-color-white);transition:var(--sc-input-transition, var(--sc-transition-medium)) border-color, var(--sc-input-transition, var(--sc-transition-medium)) opacity, var(--sc-input-transition, var(--sc-transition-medium)) background-color, var(--sc-input-transition, var(--sc-transition-medium)) color, var(--sc-input-transition, var(--sc-transition-medium)) box-shadow}.checkbox__control input[type=checkbox]{position:absolute;opacity:0;padding:0;margin:0;pointer-events:none}.checkbox__control .checkbox__icon{display:inline-flex;width:var(--sc-checkbox-size);height:var(--sc-checkbox-size)}.checkbox__control .checkbox__icon svg{width:100%;height:100%}.checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__control:hover{border-color:var(--sc-input-border-color-hover);background-color:var(--sc-input-background-color-hover)}.checkbox.checkbox--focused:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__control{border-color:var(--sc-input-border-color-focus);background-color:var(--sc-input-background-color-focus);box-shadow:0 0 0 var(--sc-focus-ring-width) var(--sc-focus-ring-color-primary)}.checkbox--checked .checkbox__control,.checkbox--indeterminate .checkbox__control{border-color:var(--sc-color-primary-500);background-color:var(--sc-color-primary-500)}.checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__control:hover,.checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__control:hover{opacity:0.8}.checkbox.checkbox--checked:not(.checkbox--disabled).checkbox--focused .checkbox__control,.checkbox.checkbox--indeterminate:not(.checkbox--disabled).checkbox--focused .checkbox__control{border-color:var(--sc-color-white);background-color:var(--sc-color-primary-500);box-shadow:0 0 0 var(--sc-focus-ring-width) var(--sc-focus-ring-color-primary)}.checkbox--disabled{opacity:0.5;cursor:not-allowed}.checkbox__label{line-height:var(--sc-checkbox-size);margin-top:var(--sc-input-border-width);margin-left:0.5em;flex:1}.checkbox--is-required .checkbox__label:after{content:\" *\";color:var(--sc-color-danger-500)}::slotted(*){display:inline-block}.checkbox--is-rtl .checkbox__label{margin-left:0;margin-right:0.5em}";

let id = 0;
const ScCheckbox = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.scBlur = createEvent(this, "scBlur", 7);
    this.scChange = createEvent(this, "scChange", 7);
    this.scFocus = createEvent(this, "scFocus", 7);
    this.inputId = `checkbox-${++id}`;
    this.labelId = `checkbox-label-${id}`;
    this.hasFocus = false;
    this.name = undefined;
    this.value = undefined;
    this.disabled = false;
    this.edit = false;
    this.required = false;
    this.checked = false;
    this.indeterminate = false;
    this.invalid = false;
  }
  firstUpdated() {
    this.input.indeterminate = this.indeterminate;
  }
  /** Simulates a click on the checkbox. */
  async triggerClick() {
    return this.input.click();
  }
  /** Sets focus on the checkbox. */
  async triggerFocus(options) {
    return this.input.focus(options);
  }
  /** Removes focus from the checkbox. */
  async triggerBlur() {
    return this.input.blur();
  }
  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  async reportValidity() {
    this.invalid = !this.input.checkValidity();
    return this.input.reportValidity();
  }
  /** Sets a custom validation message. If `message` is not empty, the field will be considered invalid. */
  setCustomValidity(message) {
    this.input.setCustomValidity(message);
    this.invalid = !this.input.checkValidity();
  }
  handleClick() {
    this.checked = !this.checked;
    this.indeterminate = false;
  }
  handleBlur() {
    this.hasFocus = false;
    this.scBlur.emit();
  }
  handleFocus() {
    this.hasFocus = true;
    this.scFocus.emit();
  }
  handleLabelMouseDown() {
    // Prevent clicks on the label from briefly blurring the input
    // event.preventDefault();
    this.input.focus();
  }
  handleStateChange() {
    this.input.checked = this.checked;
    this.input.indeterminate = this.indeterminate;
    this.scChange.emit();
  }
  componentDidLoad() {
    this.formController = new FormSubmitController(this.el, {
      value: (control) => (control.checked ? control.value : undefined),
    }).addFormData();
  }
  disconnectedCallback() {
    var _a;
    (_a = this.formController) === null || _a === void 0 ? void 0 : _a.removeFormData();
  }
  render() {
    const Tag = this.edit ? 'div' : 'label';
    return (h(Tag, { part: "base", class: {
        'checkbox': true,
        'checkbox--is-required': this.required,
        'checkbox--checked': this.checked,
        'checkbox--disabled': this.disabled,
        'checkbox--focused': this.hasFocus,
        'checkbox--indeterminate': this.indeterminate,
        'checkbox--is-rtl': isRtl()
      }, htmlFor: this.inputId, onMouseDown: () => this.handleLabelMouseDown() }, h("span", { part: "control", class: "checkbox__control" }, this.checked ? (h("span", { part: "checked-icon", class: "checkbox__icon" }, h("svg", { viewBox: "0 0 16 16" }, h("g", { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd", "stroke-linecap": "round" }, h("g", { stroke: "currentColor", "stroke-width": "2" }, h("g", { transform: "translate(3.428571, 3.428571)" }, h("path", { d: "M0,5.71428571 L3.42857143,9.14285714" }), h("path", { d: "M9.14285714,0 L3.42857143,9.14285714" }))))))) : (''), !this.checked && this.indeterminate ? (h("span", { part: "indeterminate-icon", class: "checkbox__icon" }, h("svg", { viewBox: "0 0 16 16" }, h("g", { stroke: "none", "stroke-width": "1", fill: "none", "fill-rule": "evenodd", "stroke-linecap": "round" }, h("g", { stroke: "currentColor", "stroke-width": "2" }, h("g", { transform: "translate(2.285714, 6.857143)" }, h("path", { d: "M10.2857143,1.14285714 L1.14285714,1.14285714" }))))))) : (''), h("input", { id: this.inputId, ref: el => (this.input = el), type: "checkbox", name: this.name, value: this.value, checked: this.checked, disabled: this.disabled, required: this.required, role: "checkbox", "aria-checked": this.checked ? 'true' : 'false', "aria-labelledby": this.labelId, onClick: () => this.handleClick(), onBlur: () => this.handleBlur(), onFocus: () => this.handleFocus() })), h("span", { part: "label", id: this.labelId, class: "checkbox__label" }, h("slot", null))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "checked": ["handleStateChange"],
    "indeterminate": ["handleStateChange"]
  }; }
};
ScCheckbox.style = scCheckboxCss;

const scTaxIdInputCss = ":host{display:block;z-index:3;position:relative}";

const ScTaxIdInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.scChange = createEvent(this, "scChange", 7);
    this.scInput = createEvent(this, "scInput", 7);
    this.scInputType = createEvent(this, "scInputType", 7);
    this.scSetState = createEvent(this, "scSetState", 7);
    this.country = undefined;
    this.show = false;
    this.type = 'other';
    this.number = null;
    this.status = 'unknown';
    this.loading = undefined;
    this.help = undefined;
    this.otherLabel = wp.i18n.__('Tax ID', 'surecart');
    this.caGstLabel = wp.i18n.__('GST Number', 'surecart');
    this.auAbnLabel = wp.i18n.__('ABN Number', 'surecart');
    this.gbVatLabel = wp.i18n.__('UK VAT', 'surecart');
    this.euVatLabel = wp.i18n.__('EU VAT', 'surecart');
    this.taxIdTypes = [];
    this.required = false;
  }
  async reportValidity() {
    return this.input.reportValidity();
  }
  onLabelChange() {
    zones.ca_gst.label = this.caGstLabel || zones.ca_gst.label;
    zones.au_abn.label = this.auAbnLabel || zones.au_abn.label;
    zones.gb_vat.label = this.gbVatLabel || zones.gb_vat.label;
    zones.eu_vat.label = this.euVatLabel || zones.eu_vat.label;
    zones.other.label = this.otherLabel || zones.other.label;
  }
  componentWillLoad() {
    this.onLabelChange();
  }
  renderStatus() {
    if (this.status === 'valid') {
      return h("sc-icon", { name: "check", slot: "prefix", style: { color: 'var(--sc-color-success-500)' } });
    }
    if (this.status === 'invalid') {
      return h("sc-icon", { name: "x", slot: "prefix", style: { color: 'var(--sc-color-danger-500)' } });
    }
  }
  filteredZones() {
    if (!!this.taxIdTypes.length) {
      return Object.keys(zones)
        .filter(name => this.taxIdTypes.includes(name))
        .reduce((obj, key) => {
        obj[key] = zones[key];
        return obj;
      }, {});
    }
    return zones;
  }
  onTaxIdTypesChange() {
    // If there is no other type, set the first one as default type.
    if (!!this.taxIdTypes.length) {
      this.type = !this.taxIdTypes.includes('other') ? this.taxIdTypes[0] : 'other';
    }
  }
  getZoneLabel() {
    var _a, _b;
    const filteredZones = this.filteredZones() || {};
    // Get the label of the current type or the other type.
    // If there is no other type, get the first one.
    return ((_a = filteredZones === null || filteredZones === void 0 ? void 0 : filteredZones[(this === null || this === void 0 ? void 0 : this.type) || 'other']) === null || _a === void 0 ? void 0 : _a.label) || ((_b = filteredZones === null || filteredZones === void 0 ? void 0 : filteredZones[Object.keys(filteredZones)[0]]) === null || _b === void 0 ? void 0 : _b.label);
  }
  render() {
    var _a, _b, _c, _d, _e;
    return (h(Fragment, null, h("sc-input", { name: "tax_identifier.number_type", required: this.required, value: this.type, style: { display: 'none' } }), h("sc-input", { ref: el => (this.input = el), label: this.getZoneLabel(), "aria-label": wp.i18n.__('Tax ID', 'surecart'), placeholder: wp.i18n.__('Enter Tax ID', 'surecart'), name: "tax_identifier.number", value: this.number, onScInput: (e) => {
        e.stopImmediatePropagation();
        this.scInput.emit({
          number: e.target.value,
          number_type: this.type || 'other',
        });
      }, onScChange: (e) => {
        e.stopImmediatePropagation();
        this.scChange.emit({
          number: e.target.value,
          number_type: this.type || 'other',
        });
      }, help: this.help, required: this.required }, this.loading && this.type === 'eu_vat' ? h("sc-spinner", { slot: "prefix", style: { '--spinner-size': '10px' } }) : this.renderStatus(), ((_a = Object.keys(this.filteredZones() || {})) === null || _a === void 0 ? void 0 : _a.length) === 1 ? (h("span", { slot: "suffix" }, (_c = (_b = Object.values(this.filteredZones() || {})) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c['label_small'])) : (h("sc-dropdown", { slot: "suffix", position: "bottom-right", role: "select", "aria-multiselectable": "false", "aria-label": wp.i18n.__('Select number type', 'surecart') }, h("sc-button", { type: "text", slot: "trigger", caret: true, loading: false, style: { color: 'var(--sc-input-label-color)' }, tabindex: "0" }, (_e = (_d = this.filteredZones()) === null || _d === void 0 ? void 0 : _d[(this === null || this === void 0 ? void 0 : this.type) || 'other']) === null || _e === void 0 ? void 0 : _e.label_small), h("sc-menu", null, Object.keys(this.filteredZones() || {}).map(name => (h("sc-menu-item", { role: "option", onClick: () => {
        this.scInput.emit({
          number: this.number,
          number_type: name,
        });
        this.scChange.emit({
          number: this.number,
          number_type: name,
        });
        this.type = name;
      }, onKeyDown: e => {
        var _a;
        if (e.key === 'Enter') {
          this.scInput.emit({
            number: this.number,
            number_type: name,
          });
          this.scChange.emit({
            number: this.number,
            number_type: name,
          });
          this.type = name;
          (_a = this.input) === null || _a === void 0 ? void 0 : _a.triggerFocus();
          speak(wp.i18n.sprintf(wp.i18n.__('%s selected', 'surecart'), zones[name].label_small, 'assertive'));
        }
      }, checked: this.type === name, "aria-selected": this.type === name ? 'true' : 'false', "aria-label": zones[name].label_small }, zones[name].label_small)))))))));
  }
  static get watchers() { return {
    "otherLabel": ["onLabelChange"],
    "caGstLabel": ["onLabelChange"],
    "auAbnLabel": ["onLabelChange"],
    "gbVatLabel": ["onLabelChange"],
    "euVatLabel": ["onLabelChange"],
    "taxIdTypes": ["onTaxIdTypesChange"]
  }; }
};
ScTaxIdInput.style = scTaxIdInputCss;

export { ScAddress as sc_address, ScCheckbox as sc_checkbox, ScTaxIdInput as sc_tax_id_input };

//# sourceMappingURL=sc-address_3.entry.js.map
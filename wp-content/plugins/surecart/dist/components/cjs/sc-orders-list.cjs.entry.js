'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const fetch = require('./fetch-2dba325c.js');
const lazy = require('./lazy-bc8baeab.js');
const addQueryArgs = require('./add-query-args-17c551b6.js');

const scOrdersListCss = ":host{display:block}.orders-list{display:grid;gap:0.75em}.orders-list__status{display:flex;align-items:center;gap:var(--sc-spacing-x-small)}.orders-list__heading{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between}.orders-list__title{font-size:var(--sc-font-size-x-large);font-weight:var(--sc-font-weight-bold);line-height:var(--sc-line-height-dense)}.orders-list a{text-decoration:none;font-weight:var(--sc-font-weight-semibold);display:inline-flex;align-items:center;gap:0.25em;color:var(--sc-color-primary-500)}.order__row{color:var(--sc-color-gray-800);text-decoration:none;display:grid;align-items:center;justify-content:space-between;gap:0;grid-template-columns:1fr 1fr 1fr auto;margin:0;padding:var(--sc-spacing-small) var(--sc-spacing-large)}.order__row:not(:last-child){border-bottom:1px solid var(--sc-color-gray-200)}.order__row:hover{background:var(--sc-color-gray-50)}.order__date{font-weight:var(--sc-font-weight-semibold)}";

const ScOrdersList = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.query = {
      page: 1,
      per_page: 10,
    };
    this.allLink = undefined;
    this.heading = undefined;
    this.isCustomer = undefined;
    this.orders = [];
    this.loading = undefined;
    this.busy = undefined;
    this.error = undefined;
    this.pagination = {
      total: 0,
      total_pages: 0,
    };
  }
  /** Only fetch if visible */
  componentWillLoad() {
    lazy.onFirstVisible(this.el, () => {
      this.initialFetch();
    });
  }
  async initialFetch() {
    try {
      this.loading = true;
      await this.getOrders();
    }
    catch (e) {
      console.error(this.error);
      this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
    }
    finally {
      this.loading = false;
    }
  }
  async fetchOrders() {
    try {
      this.busy = true;
      await this.getOrders();
    }
    catch (e) {
      console.error(this.error);
      this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
    }
    finally {
      this.busy = false;
    }
  }
  /** Get all orders */
  async getOrders() {
    if (!this.isCustomer) {
      return;
    }
    const response = (await await fetch.apiFetch({
      path: addQueryArgs.addQueryArgs(`surecart/v1/orders/`, {
        expand: ['checkout', 'checkout.line_items', 'checkout.charge'],
        ...this.query,
      }),
      parse: false,
    }));
    this.pagination = {
      total: parseInt(response.headers.get('X-WP-Total')),
      total_pages: parseInt(response.headers.get('X-WP-TotalPages')),
    };
    this.orders = (await response.json());
    return this.orders;
  }
  nextPage() {
    this.query.page = this.query.page + 1;
    this.fetchOrders();
  }
  prevPage() {
    this.query.page = this.query.page - 1;
    this.fetchOrders();
  }
  renderStatusBadge(order) {
    const { status, checkout } = order;
    const { charge } = checkout;
    if (charge && typeof charge === 'object') {
      if (charge === null || charge === void 0 ? void 0 : charge.fully_refunded) {
        return index.h("sc-tag", { type: "danger" }, wp.i18n.__('Refunded', 'surecart'));
      }
      if (charge === null || charge === void 0 ? void 0 : charge.refunded_amount) {
        return index.h("sc-tag", { type: "info" }, wp.i18n.__('Partially Refunded', 'surecart'));
      }
    }
    return index.h("sc-order-status-badge", { status: status });
  }
  renderLoading() {
    return (index.h("sc-card", { noPadding: true }, index.h("sc-stacked-list", null, index.h("sc-stacked-list-row", { style: { '--columns': '4' }, "mobile-size": 500 }, [...Array(4)].map(() => (index.h("sc-skeleton", { style: { width: '100px', display: 'inline-block' } })))))));
  }
  renderEmpty() {
    return (index.h("div", null, index.h("sc-divider", { style: { '--spacing': '0' } }), index.h("slot", { name: "empty" }, index.h("sc-empty", { icon: "shopping-bag" }, wp.i18n.__("You don't have any orders.", 'surecart')))));
  }
  renderList() {
    return this.orders.map(order => {
      var _a, _b;
      const { checkout, created_at, id } = order;
      if (!checkout)
        return null;
      const { line_items, amount_due, currency, charge } = checkout;
      return (index.h("sc-stacked-list-row", { href: addQueryArgs.addQueryArgs(window.location.href, {
          action: 'show',
          model: 'order',
          id,
        }), style: { '--columns': '4' }, "mobile-size": 500 }, index.h("div", null, typeof charge !== 'string' && (index.h("sc-format-date", { class: "order__date", date: ((charge === null || charge === void 0 ? void 0 : charge.created_at) || created_at) * 1000, month: "short", day: "numeric", year: "numeric" }))), index.h("div", null, index.h("sc-text", { truncate: true, style: {
          '--color': 'var(--sc-color-gray-500)',
        } }, wp.i18n.sprintf(wp.i18n._n('%s item', '%s items', ((_a = line_items === null || line_items === void 0 ? void 0 : line_items.pagination) === null || _a === void 0 ? void 0 : _a.count) || 0, 'surecart'), ((_b = line_items === null || line_items === void 0 ? void 0 : line_items.pagination) === null || _b === void 0 ? void 0 : _b.count) || 0))), index.h("div", { class: "orders-list__status" }, this.renderStatusBadge(order), index.h("sc-order-shipment-badge", { status: order === null || order === void 0 ? void 0 : order.shipment_status })), index.h("div", null, index.h("sc-format-number", { type: "currency", currency: currency, value: amount_due }))));
    });
  }
  renderContent() {
    var _a;
    if (this.loading) {
      return this.renderLoading();
    }
    if (((_a = this.orders) === null || _a === void 0 ? void 0 : _a.length) === 0) {
      return this.renderEmpty();
    }
    return (index.h("sc-card", { "no-padding": true }, index.h("sc-stacked-list", null, this.renderList())));
  }
  render() {
    var _a, _b;
    return (index.h("sc-dashboard-module", { class: "orders-list", error: this.error }, index.h("span", { slot: "heading" }, index.h("slot", { name: "heading" }, this.heading || wp.i18n.__('Order History', 'surecart'))), !!this.allLink && !!((_a = this.orders) === null || _a === void 0 ? void 0 : _a.length) && (index.h("sc-button", { type: "link", href: this.allLink, slot: "end", "aria-label": wp.i18n.sprintf(wp.i18n.__('View all %s', 'surecart'), this.heading || wp.i18n.__('Order History', 'surecart')) }, wp.i18n.__('View all', 'surecart'), index.h("sc-icon", { "aria-hidden": "true", name: "chevron-right", slot: "suffix" }))), this.renderContent(), !this.allLink && (index.h("sc-pagination", { page: this.query.page, perPage: this.query.per_page, total: this.pagination.total, totalPages: this.pagination.total_pages, totalShowing: (_b = this === null || this === void 0 ? void 0 : this.orders) === null || _b === void 0 ? void 0 : _b.length, onScNextPage: () => this.nextPage(), onScPrevPage: () => this.prevPage() })), this.busy && index.h("sc-block-ui", null)));
  }
  get el() { return index.getElement(this); }
};
ScOrdersList.style = scOrdersListCss;

exports.sc_orders_list = ScOrdersList;

//# sourceMappingURL=sc-orders-list.cjs.entry.js.map
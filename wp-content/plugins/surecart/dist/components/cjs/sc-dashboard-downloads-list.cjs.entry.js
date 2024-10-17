'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const fetch = require('./fetch-2dba325c.js');
const lazy = require('./lazy-bc8baeab.js');
const addQueryArgs = require('./add-query-args-17c551b6.js');

const scDashboardDownloadsListCss = ":host{display:block}.download__details{opacity:0.75}";

const ScDownloadsList = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.query = {
      page: 1,
      per_page: 10,
    };
    this.allLink = undefined;
    this.heading = undefined;
    this.isCustomer = undefined;
    this.requestNonce = undefined;
    this.purchases = [];
    this.loading = undefined;
    this.busy = undefined;
    this.error = undefined;
    this.pagination = {
      total: 0,
      total_pages: 0,
    };
  }
  componentWillLoad() {
    lazy.onFirstVisible(this.el, () => {
      this.initialFetch();
    });
  }
  async initialFetch() {
    if (!this.isCustomer) {
      return;
    }
    try {
      this.loading = true;
      await this.getItems();
    }
    catch (e) {
      console.error(this.error);
      this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
    }
    finally {
      this.loading = false;
    }
  }
  async fetchItems() {
    if (!this.isCustomer) {
      return;
    }
    try {
      this.busy = true;
      await this.getItems();
    }
    catch (e) {
      console.error(this.error);
      this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
    }
    finally {
      this.busy = false;
    }
  }
  /** Get all subscriptions */
  async getItems() {
    const response = (await await fetch.apiFetch({
      path: addQueryArgs.addQueryArgs(`surecart/v1/purchases/`, {
        expand: ['product', 'product.downloads', 'download.media'],
        downloadable: true,
        revoked: false,
        ...this.query,
      }),
      parse: false,
    }));
    this.pagination = {
      total: parseInt(response.headers.get('X-WP-Total')),
      total_pages: parseInt(response.headers.get('X-WP-TotalPages')),
    };
    this.purchases = (await response.json());
    return this.purchases;
  }
  nextPage() {
    this.query.page = this.query.page + 1;
    this.fetchItems();
  }
  prevPage() {
    this.query.page = this.query.page - 1;
    this.fetchItems();
  }
  render() {
    var _a;
    return (index.h("sc-purchase-downloads-list", { heading: this.heading, allLink: this.allLink && this.pagination.total_pages > 1 ? this.allLink : '', loading: this.loading, busy: this.busy, requestNonce: this.requestNonce, error: this.error, purchases: this.purchases }, index.h("span", { slot: "heading" }, index.h("slot", { name: "heading" }, this.heading || wp.i18n.__('Downloads', 'surecart'))), index.h("sc-pagination", { slot: "after", page: this.query.page, perPage: this.query.per_page, total: this.pagination.total, totalPages: this.pagination.total_pages, totalShowing: (_a = this === null || this === void 0 ? void 0 : this.purchases) === null || _a === void 0 ? void 0 : _a.length, onScNextPage: () => this.nextPage(), onScPrevPage: () => this.prevPage() })));
  }
  get el() { return index.getElement(this); }
};
ScDownloadsList.style = scDashboardDownloadsListCss;

exports.sc_dashboard_downloads_list = ScDownloadsList;

//# sourceMappingURL=sc-dashboard-downloads-list.cjs.entry.js.map
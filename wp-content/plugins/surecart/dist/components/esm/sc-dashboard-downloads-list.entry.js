import { r as registerInstance, h, a as getElement } from './index-644f5478.js';
import { a as apiFetch } from './fetch-2525e763.js';
import { o as onFirstVisible } from './lazy-64c2bf3b.js';
import { a as addQueryArgs } from './add-query-args-f4c5962b.js';

const scDashboardDownloadsListCss = ":host{display:block}.download__details{opacity:0.75}";

const ScDownloadsList = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
    onFirstVisible(this.el, () => {
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
    const response = (await await apiFetch({
      path: addQueryArgs(`surecart/v1/purchases/`, {
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
    return (h("sc-purchase-downloads-list", { heading: this.heading, allLink: this.allLink && this.pagination.total_pages > 1 ? this.allLink : '', loading: this.loading, busy: this.busy, requestNonce: this.requestNonce, error: this.error, purchases: this.purchases }, h("span", { slot: "heading" }, h("slot", { name: "heading" }, this.heading || wp.i18n.__('Downloads', 'surecart'))), h("sc-pagination", { slot: "after", page: this.query.page, perPage: this.query.per_page, total: this.pagination.total, totalPages: this.pagination.total_pages, totalShowing: (_a = this === null || this === void 0 ? void 0 : this.purchases) === null || _a === void 0 ? void 0 : _a.length, onScNextPage: () => this.nextPage(), onScPrevPage: () => this.prevPage() })));
  }
  get el() { return getElement(this); }
};
ScDownloadsList.style = scDashboardDownloadsListCss;

export { ScDownloadsList as sc_dashboard_downloads_list };

//# sourceMappingURL=sc-dashboard-downloads-list.entry.js.map
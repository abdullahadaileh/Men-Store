'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const index$1 = require('./index-fb76df07.js');
const fetch = require('./fetch-2dba325c.js');
require('./google-55083ae7.js');
const addQueryArgs = require('./add-query-args-17c551b6.js');
require('./currency-ba038e2f.js');
require('./google-62bdaeea.js');

const scProductItemListCss = ":host {\n  display: block;\n}\n\n.product-item-list {\n  display: grid;\n  grid-template-columns: repeat(var(--sc-product-item-list-column), 1fr);\n  gap: var(--sc-product-item-list-gap);\n}\n.product-item-list__wrapper {\n  container-type: inline-size;\n  display: grid;\n  gap: var(--sc-spacing-medium);\n}\n@container (max-width: 576px) {\n  .product-item-list__wrapper .product-item-list {\n    grid-template-columns: 1fr;\n  }\n}\n@container (min-width: 576px) and (max-width: 768px) {\n  .product-item-list__wrapper .product-item-list {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}\n.product-item-list__sort, .product-item-list__empty, .product-item-list__search, .product-item-list__search-tag {\n  font-size: 16px;\n}\n.product-item-list__search, .product-item-list__sort {\n  display: flex;\n  align-items: center;\n  gap: var(--sc-spacing-small);\n}\n.product-item-list__controls {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-between;\n  align-items: center;\n}\n.product-item-list__loader {\n  display: grid;\n  gap: 0.88rem;\n  padding-top: var(--sc-product-item-padding-top);\n  padding-bottom: var(--sc-product-item-padding-bottom);\n  padding-left: var(--sc-product-item-padding-left);\n  padding-right: var(--sc-product-item-padding-right);\n  margin-top: var(--sc-product-item-margin-top);\n  margin-bottom: var(--sc-product-item-margin-bottom);\n  margin-left: var(--sc-product-item-margin-left);\n  margin-right: var(--sc-product-item-margin-right);\n  border: solid var(--sc-product-item-border-width) var(--sc-product-item-border-color);\n  border-radius: var(--sc-product-item-border-radius);\n  color: var(--sc-product-title-text-color);\n  background-color: var(--sc-product-item-background-color);\n  line-height: 1;\n}\n.product-item-list__pagination {\n  padding: 40px 0 0;\n  width: 100%;\n  font-size: var(--sc-font-size-small, var(--wp--preset--font-size--x-small));\n}\n.product-item-list__search-tag {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: var(--sc-spacing-small);\n}\n.product-item-list__search-label {\n  font-size: var(--sc-font-size-small, var(--wp--preset--font-size--x-small));\n}\n\n.search-button,\n.clear-button {\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity var(--sc-transition-medium) ease-in-out;\n  cursor: pointer;\n}\n\n.product-item-list__has-search .search-button,\n.product-item-list__has-search .clear-button {\n  opacity: 1;\n  visibility: visible;\n}\n\nsc-product-item::part(image) {\n  aspect-ratio: var(--sc-product-image-aspect-ratio);\n}\n\nsc-dropdown sc-button::part(base):focus-visible {\n  border: 1px dashed var(--sc-product-item-border-color, --sc-color-gray-50);\n}\n\nsc-pagination {\n  font-size: var(--sc-pagination-font-size);\n}";

const ScProductItemList = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.scSearched = index.createEvent(this, "scSearched", 7);
    this.scProductsViewed = index.createEvent(this, "scProductsViewed", 7);
    this.ids = undefined;
    this.sort = 'created_at:desc';
    this.query = undefined;
    this.searchEnabled = true;
    this.sortEnabled = true;
    this.collectionEnabled = true;
    this.collectionId = undefined;
    this.pageTitle = undefined;
    this.featured = false;
    this.paginationEnabled = true;
    this.ajaxPagination = true;
    this.paginationAutoScroll = true;
    this.layoutConfig = undefined;
    this.paginationAlignment = 'center';
    this.limit = 15;
    this.page = 1;
    this.products = undefined;
    this.loading = false;
    this.busy = false;
    this.error = undefined;
    this.currentPage = 1;
    this.currentQuery = undefined;
    this.pagination = {
      total: 0,
      total_pages: 0,
    };
    this.collections = undefined;
    this.selectedCollections = [];
  }
  handleProductsChanged(newProducts, oldProducts) {
    var _a;
    const productIds = new Set([...(oldProducts || []).map(product => product.id), ...(newProducts || []).map(product => product.id)]);
    if ((newProducts === null || newProducts === void 0 ? void 0 : newProducts.length) === (oldProducts === null || oldProducts === void 0 ? void 0 : oldProducts.length) && productIds.size === newProducts.length) {
      return;
    }
    const title = [
      this.pageTitle,
      this.paginationEnabled ? wp.i18n.sprintf(wp.i18n.__('Page %d', 'surecart'), this.currentPage) : undefined,
      this.sort ? this.renderSortName() : undefined,
      this.query || ((_a = this.selectedCollections) === null || _a === void 0 ? void 0 : _a.length) ? wp.i18n.__('Search results', 'surecart') : undefined,
    ]
      .filter(item => !!item)
      .join(' - ');
    this.scProductsViewed.emit({
      products: this.products,
      pageTitle: title,
      collectionId: this.collectionId,
    });
  }
  componentWillLoad() {
    var _a;
    if (!((_a = this === null || this === void 0 ? void 0 : this.products) === null || _a === void 0 ? void 0 : _a.length)) {
      this.getProducts();
    }
    else {
      this.handleProductsChanged(this.products);
    }
    if (this.collectionEnabled) {
      this.getCollections();
    }
  }
  // Append URL if no 'product-page' found
  doPagination(page) {
    // handle ajax pagination
    if (this.ajaxPagination) {
      this.page = page;
      this.updateProducts();
      this.paginationAutoScroll && this.el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    // handle server pagination.
    const newUrl = addQueryArgs.addQueryArgs(location.href, { 'product-page': page });
    window.location.replace(newUrl);
  }
  // Fetch all products
  async getProducts() {
    const { 'product-page': page } = addQueryArgs.getQueryArgs(window.location.href);
    this.page = this.paginationEnabled && page ? parseInt(page) : 1;
    try {
      this.loading = true;
      await this.fetchProducts();
    }
    catch (error) {
      console.error(error);
    }
    finally {
      this.loading = false;
    }
  }
  // Fetch all collections
  async getCollections() {
    try {
      this.collections = (await fetch.apiFetch({
        path: addQueryArgs.addQueryArgs('surecart/v1/product_collections/', {
          per_page: 100,
        }),
      }));
    }
    catch (error) {
      console.error(error);
    }
  }
  async handleSortChange() {
    this.page = 1;
    this.updateProducts();
  }
  async updateProducts(emitSearchEvent = false) {
    var _a;
    try {
      this.busy = true;
      await this.fetchProducts();
      if (!!this.query && emitSearchEvent) {
        this.scSearched.emit({
          searchString: this.query,
          searchResultCount: (_a = this.products) === null || _a === void 0 ? void 0 : _a.length,
          searchResultIds: this.products.map(product => product.id),
        });
      }
    }
    catch (error) {
      console.log('error');
      console.error(error);
      this.error = error.message || wp.i18n.__('An unknown error occurred.', 'surecart');
    }
    finally {
      this.busy = false;
    }
  }
  handleIdsChange() {
    if (this.debounce !== null) {
      clearTimeout(this.debounce);
      this.debounce = null;
    }
    this.debounce = window.setTimeout(() => {
      // your debounced traitment
      this.updateProducts();
      this.debounce = null;
    }, 200);
  }
  async fetchProducts() {
    var _a, _b;
    let collectionIds = ((_a = this.selectedCollections) === null || _a === void 0 ? void 0 : _a.map(collection => collection.id)) || [];
    // If we have a collectionId, we should only fetch products from that collection.
    if (this.collectionId) {
      collectionIds = [this.collectionId];
    }
    try {
      const response = (await fetch.apiFetch({
        path: addQueryArgs.addQueryArgs(`surecart/v1/products/`, {
          expand: ['prices', 'featured_product_media', 'product_medias', 'product_media.media', 'variants'],
          archived: false,
          status: ['published'],
          per_page: this.limit,
          page: this.page,
          sort: this.sort,
          product_collection_ids: collectionIds,
          ...(this.featured ? { featured: true } : {}),
          ...(((_b = this.ids) === null || _b === void 0 ? void 0 : _b.length) ? { ids: this.ids } : {}),
          ...(this.query ? { query: this.query } : {}),
        }),
        parse: false,
      }));
      this.currentQuery = this.query;
      this.pagination = {
        total: parseInt(response.headers.get('X-WP-Total')),
        total_pages: parseInt(response.headers.get('X-WP-TotalPages')),
      };
      this.products = (await response.json());
      if (!!collectionIds.length || !!this.query) {
        index$1.speak(wp.i18n.sprintf(wp.i18n.__('%s products found', 'surecart'), this.pagination.total));
      }
    }
    catch (response) {
      // we will want to handle nonce error if we are bypassing the apiFetch parser.
      await fetch.handleNonceError(response)
        .then(() => this.fetchProducts())
        .catch(error => {
        this.error = error.message || wp.i18n.__('An unknown error occurred.', 'surecart');
      });
    }
  }
  renderSortName() {
    switch (this.sort) {
      case 'created_at:desc':
        return wp.i18n.__('Latest', 'surecart');
      case 'created_at:asc':
        return wp.i18n.__('Oldest', 'surecart');
      case 'name:asc':
        return wp.i18n.__('Alphabetical, A-Z', 'surecart');
      case 'name:desc':
        return wp.i18n.__('Alphabetical, Z-A', 'surecart');
      default:
        return wp.i18n.__('Sort', 'surecart');
    }
  }
  toggleSelectCollection(collection) {
    // if collection not in selectedCollections, add it, otherwise remove it
    if (!this.selectedCollections.find(c => c.id === collection.id)) {
      this.selectedCollections = [...this.selectedCollections, collection];
    }
    else {
      this.selectedCollections = this.selectedCollections.filter(c => c.id !== collection.id);
    }
  }
  getCollectionsAfterFiltered() {
    var _a;
    return ((_a = this.collections) !== null && _a !== void 0 ? _a : []).filter(collection => {
      return !this.selectedCollections.some(selected => selected.id === collection.id);
    });
  }
  isPaginationAvailable() {
    var _a;
    return !!((_a = this.products) === null || _a === void 0 ? void 0 : _a.length) && this.pagination.total > this.products.length && this.paginationEnabled;
  }
  render() {
    var _a, _b, _c, _d, _e, _f;
    return (index.h("div", { class: {
        'product-item-list__wrapper': true,
        'product-item-list__has-search': !!this.query,
      } }, this.error && (index.h("sc-alert", { type: "danger", open: true }, this.error)), (this.searchEnabled || this.sortEnabled || this.collectionEnabled) && (index.h("div", { class: "product-item-list__header" }, index.h("div", { class: "product-item-list__controls" }, index.h("div", { class: "product-item-list__sort" }, this.sortEnabled && (index.h("sc-dropdown", { style: { '--panel-width': '15em' } }, index.h("sc-button", { type: "text", caret: true, slot: "trigger" }, index.h("sc-visually-hidden", null, wp.i18n.__('Dropdown to sort products.', 'surecart'), " "), this.renderSortName(), index.h("sc-visually-hidden", null, " ", wp.i18n.__('selected.', 'surecart'))), index.h("sc-menu", { "aria-label": wp.i18n.__('Sort Products', 'surecart') }, index.h("sc-menu-item", { "aria-label": wp.i18n.__('Sort by latest', 'surecart'), onClick: () => (this.sort = 'created_at:desc') }, wp.i18n.__('Latest', 'surecart')), index.h("sc-menu-item", { "aria-label": wp.i18n.__('Sort by oldest', 'surecart'), onClick: () => (this.sort = 'created_at:asc') }, wp.i18n.__('Oldest', 'surecart')), index.h("sc-menu-item", { "aria-label": wp.i18n.__('Sort by name, A to Z', 'surecart'), onClick: () => (this.sort = 'name:asc') }, wp.i18n.__('Alphabetical, A-Z', 'surecart')), index.h("sc-menu-item", { "aria-label": wp.i18n.__('Sort by name, Z to A', 'surecart'), onClick: () => (this.sort = 'name:desc') }, wp.i18n.__('Alphabetical, Z-A', 'surecart'))))), this.collectionEnabled && ((_a = this.collections) !== null && _a !== void 0 ? _a : []).length > 0 && (index.h("sc-dropdown", { style: { '--panel-width': '15rem' } }, index.h("sc-button", { type: "text", caret: true, slot: "trigger" }, index.h("sc-visually-hidden", null, wp.i18n.sprintf(wp.i18n.__('Dropdown to filter products by collection. %s selected.', 'surecart'), ((_b = this.selectedCollections) === null || _b === void 0 ? void 0 : _b.length) ? this.selectedCollections.map(collection => collection === null || collection === void 0 ? void 0 : collection.name).join(',') : wp.i18n.__('None', 'surecart'))), index.h("span", { "aria-hidden": true }, " ", wp.i18n.__('Filter', 'surecart'))), index.h("sc-menu", { "aria-label": wp.i18n.__('Filter products', 'surecart') }, ((_c = this.collections) !== null && _c !== void 0 ? _c : []).map(collection => {
      return (index.h("sc-menu-item", { checked: this.selectedCollections.some(selected => (selected === null || selected === void 0 ? void 0 : selected.id) === (collection === null || collection === void 0 ? void 0 : collection.id)), onClick: () => this.toggleSelectCollection(collection), key: collection === null || collection === void 0 ? void 0 : collection.id, "aria-label": wp.i18n.sprintf(wp.i18n.__('Filter by %s', 'surecart'), collection === null || collection === void 0 ? void 0 : collection.name) }, collection.name));
    }))))), index.h("div", { class: "product-item-list__search" }, this.searchEnabled &&
      (((_d = this.query) === null || _d === void 0 ? void 0 : _d.length) && this.query === this.currentQuery ? (index.h("div", { class: "product-item-list__search-tag" }, index.h("div", { class: "product-item-list__search-label" }, wp.i18n.__('Search Results:', 'surecart')), index.h("sc-tag", { clearable: true, onScClear: () => {
          this.query = '';
          this.currentQuery = '';
          this.updateProducts();
        }, "aria-label": wp.i18n.sprintf(wp.i18n.__('Searched for %s. Press space to clear search.', 'surecart'), this.query) }, this.query))) : (index.h("sc-input", { type: "text", placeholder: wp.i18n.__('Search', 'surecart'), size: "small", onKeyUp: e => {
          if (e.key === 'Enter') {
            this.query = e.target.value;
            this.updateProducts(true);
          }
        }, value: this.query, clearable: true }, this.query ? (index.h("sc-icon", { class: "clear-button", slot: "prefix", name: "x", onClick: () => {
          this.query = '';
        } })) : (index.h("sc-icon", { slot: "prefix", name: "search" })), index.h("sc-button", { class: "search-button", type: "link", slot: "suffix", busy: this.busy, onClick: () => {
          this.updateProducts(true);
        } }, wp.i18n.__('Search', 'surecart'))))))), this.collectionEnabled && this.selectedCollections.length > 0 && (index.h("div", { class: "product-item-list__search-tag" }, this.selectedCollections.map(collection => (index.h("sc-tag", { key: collection === null || collection === void 0 ? void 0 : collection.id, clearable: true, onScClear: () => {
        this.toggleSelectCollection(collection);
      } }, collection === null || collection === void 0 ? void 0 : collection.name))))))), !((_e = this.products) === null || _e === void 0 ? void 0 : _e.length) && !this.loading && (index.h("sc-empty", { class: "product-item-list__empty", icon: "shopping-bag" }, wp.i18n.__('No products found.', 'surecart'))), index.h("section", { class: "product-item-list", "aria-label": wp.i18n.__('Product list', 'surecart') }, this.loading
      ? [...Array(((_f = this.products) === null || _f === void 0 ? void 0 : _f.length) || this.limit || 10)].map((_, index$1) => (index.h("div", { class: "product-item-list__loader", key: index$1 }, (this.layoutConfig || []).map(layout => {
        var _a, _b;
        switch (layout.blockName) {
          case 'surecart/product-item-title':
            return (index.h("div", { style: {
                textAlign: 'var(--sc-product-title-align)',
              } }, index.h("sc-skeleton", { style: {
                width: '80%',
                display: 'inline-block',
              } })));
          case 'surecart/product-item-image':
            return (index.h("sc-skeleton", { style: {
                'width': '100%',
                'minHeight': '90%',
                'aspectRatio': (_b = (_a = layout.attributes) === null || _a === void 0 ? void 0 : _a.ratio) !== null && _b !== void 0 ? _b : '1/1.4',
                '--sc-border-radius-pill': '12px',
                'display': 'inline-block',
              } }));
          case 'surecart/product-item-price':
            return (index.h("div", { style: {
                textAlign: 'var(--sc-product-price-align)',
              } }, index.h("sc-skeleton", { style: {
                width: '40%',
                display: 'inline-block',
              } })));
          default:
            return null;
        }
      }))))
      : (this.products || []).map((product, index$1) => {
        return (index.h("sc-product-item", { key: product === null || product === void 0 ? void 0 : product.id, ...(this.products.length - 1 === index$1
            ? {
              'aria-label': wp.i18n.sprintf(wp.i18n.__('You have reached the end of product list. %s', 'surecart'), this.isPaginationAvailable() ? wp.i18n.__('Press tab to browse more products using pagination.', 'surecart') : wp.i18n.__('No more products to browse.', 'surecart')),
            }
            : {}), exportparts: "title, price, image", product: product, layoutConfig: this.layoutConfig }));
      })), this.isPaginationAvailable() && (index.h("div", { class: {
        'product-item-list__pagination': true,
        '--is-aligned-left': this.paginationAlignment === 'left',
        '--is-aligned-center': this.paginationAlignment === 'center',
        '--is-aligned-right': this.paginationAlignment === 'right',
      } }, index.h("sc-pagination", { page: this.page, perPage: this.limit, total: this.pagination.total, totalPages: this.pagination.total_pages, totalShowing: this.limit, onScNextPage: () => this.doPagination(this.page + 1), onScPrevPage: () => this.doPagination(this.page - 1) }))), (this.busy || this.loading) && index.h("sc-block-ui", null)));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "products": ["handleProductsChanged"],
    "sort": ["handleSortChange"],
    "selectedCollections": ["handleSortChange"],
    "query": ["handleSortChange"],
    "ids": ["handleIdsChange"],
    "limit": ["handleIdsChange"],
    "featured": ["handleIdsChange"]
  }; }
};
ScProductItemList.style = scProductItemListCss;

exports.sc_product_item_list = ScProductItemList;

//# sourceMappingURL=sc-product-item-list.cjs.entry.js.map
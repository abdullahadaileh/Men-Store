import { Invoice } from '../../../../types';
export declare class ScInvoicesList {
  el: HTMLScInvoicesListElement;
  /** Query to fetch invoices */
  query: {
    page: number;
    per_page: number;
  };
  allLink: string;
  heading: string;
  invoices: Array<Invoice>;
  /** Loading state */
  loading: boolean;
  busy: boolean;
  /** Error message */
  error: string;
  pagination: {
    total: number;
    total_pages: number;
  };
  /** Only fetch if visible */
  componentWillLoad(): void;
  initialFetch(): Promise<void>;
  fetchItems(): Promise<void>;
  /** Get all orders */
  getItems(): Promise<Invoice[]>;
  nextPage(): void;
  prevPage(): void;
  renderStatusBadge(invoice: Invoice): any;
  renderLoading(): any;
  renderEmpty(): any;
  renderList(): any[];
  renderContent(): any;
  render(): any;
}

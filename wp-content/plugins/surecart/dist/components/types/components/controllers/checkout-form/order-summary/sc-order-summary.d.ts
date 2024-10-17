import { EventEmitter } from '../../../../stencil-public-runtime';
import { Checkout } from '../../../../types';
export declare class ScOrderSummary {
  private body;
  el: HTMLScOrderSummaryElement;
  order: Checkout;
  busy: boolean;
  closedText: string;
  openText: string;
  collapsible: boolean;
  collapsedOnMobile: boolean;
  collapsedOnDesktop: boolean;
  collapsed: boolean;
  /** Show the toggle */
  scShow: EventEmitter<void>;
  /** Show the toggle */
  scHide: EventEmitter<void>;
  isMobileScreen(): boolean;
  componentWillLoad(): void;
  handleClick(e: any): void;
  /** It's empty if there are no items or the mode does not match. */
  empty(): boolean;
  renderHeader(): any;
  handleOpenChange(): Promise<void>;
  render(): any;
}

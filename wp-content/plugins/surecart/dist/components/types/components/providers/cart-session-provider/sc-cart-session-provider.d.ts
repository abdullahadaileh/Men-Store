import { EventEmitter } from '../../../stencil-public-runtime';
export declare class ScCartSessionProvider {
  /** Element */
  el: HTMLElement;
  /** Set the state */
  scSetState: EventEmitter<'loading' | 'busy' | 'navigating' | 'idle'>;
  handleUpdateSession(e: any): void;
  /** Handles coupon updates. */
  handleCouponApply(e: any): Promise<void>;
  /** Handle the error response. */
  handleErrorResponse(e: any): void;
  /** Fetch a session. */
  fetch(args?: {}): Promise<void>;
  /** Update a the order */
  update(data?: {}, query?: {}): Promise<void>;
  /** Updates a session with loading status changes. */
  loadUpdate(data?: {}): Promise<void>;
  render(): any;
}

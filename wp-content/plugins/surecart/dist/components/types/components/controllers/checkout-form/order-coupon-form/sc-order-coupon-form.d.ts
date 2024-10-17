import { EventEmitter } from '../../../../stencil-public-runtime';
export declare class ScOrderCouponForm {
  label: string;
  loading: boolean;
  collapsed: boolean;
  placeholder: string;
  buttonText: string;
  open: boolean;
  value: string;
  scApplyCoupon: EventEmitter<string>;
  render(): any;
}

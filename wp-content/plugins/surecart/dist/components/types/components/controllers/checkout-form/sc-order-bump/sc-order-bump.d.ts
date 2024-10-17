import { EventEmitter } from '../../../../stencil-public-runtime';
import { Bump, LineItemData } from '../../../../types';
export declare class ScOrderBump {
  /** The bump */
  bump: Bump;
  /** Should we show the controls */
  showControl: boolean;
  cdnRoot: string;
  /** Add line item event */
  scAddLineItem: EventEmitter<LineItemData>;
  /** Remove line item event */
  scRemoveLineItem: EventEmitter<LineItemData>;
  /** Update the line item. */
  updateLineItem(add: boolean): void;
  componentDidLoad(): void;
  newPrice(): any;
  renderInterval(): any;
  renderPrice(): any;
  renderDiscount(): any;
  render(): any;
}

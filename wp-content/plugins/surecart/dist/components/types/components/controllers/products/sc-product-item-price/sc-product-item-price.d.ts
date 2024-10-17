import { Price, ProductMetrics } from 'src/types';
export declare class ScProductItemPrice {
  prices: Price[];
  /** Show price range? */
  range: boolean;
  /** Product metrics */
  metrics: ProductMetrics;
  componentWillLoad(): void;
  render(): any;
}

import { Price, Product } from 'src/types';
/**
 * Product viewed event.
 */
export declare const productViewed: (product: Product, selectedPrice: Price, quantity?: number) => void;

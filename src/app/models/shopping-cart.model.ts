import {CartItem} from "app/models/cart-item.model";

/**
 * Shopping cart model
 */
export class ShoppingCart {
  /**
   * Items
   * @type {CartItem[]}
   */
  public items: CartItem[] = new Array<CartItem>();
  /**
   * Delivery options
   */
  public deliveryOptionId: string;
  /**
   * Total gross
   * @type {number}
   */
  public grossTotal: number = 0;
  /**
   * Total delivery
   * @type {number}
   */
  public deliveryTotal: number = 0;
  /**
   * Total items
   * @type {number}
   */
  public itemsTotal: number = 0;

  /**
   * Updates values form shopping cart
   * @param {ShoppingCart} src
   */
  public updateFrom(src: ShoppingCart) {
    this.items = src.items;
    this.deliveryOptionId = src.deliveryOptionId;
    this.grossTotal = src.grossTotal;
    this.deliveryTotal = src.deliveryTotal;
    this.itemsTotal = src.itemsTotal;
  }
}

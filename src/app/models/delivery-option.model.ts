/**
 * Delivery option model
 */
export class DeliveryOption {
  /**
   * Id
   */
  public id: string;
  /**
   * Name
   */
  public name: string;
  /**
   * Description
   */
  public description: string;
  /**
   * Price
   */
  public price: number;

  /**
   * Updates delivery options
   * @param {DeliveryOption} src
   */
  public updateFrom(src: DeliveryOption): void {
    this.id = src.id;
    this.name = src.name;
    this.description = src.description;
    this.price = src.price;
  }
}

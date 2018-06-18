import { Ingredient } from "app/models/ingredient.model";

export class Product {
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
   * Ingredients
   */
  public ingredients: Ingredient[];

  /**
   * Updates product
   * @param {Product} src
   */
  public updateFrom(src: Product): void {
    this.id = src.id;
    this.name = src.name;
    this.description = src.description;
    this.price = src.price;
    this.ingredients = src.ingredients.map((i) => {
      let ingredient = new Ingredient();
      ingredient.updateFrom(i);
      return ingredient;
    });
  }
}

/**
 * Ingredient model
 */
export class Ingredient {
  /**
   * Name
   */
  public name: string;
  /**
   * Percentage
   */
  public percentage: number;

  /**
   * Updates ingredients
   * @param {Ingredient} src
   */
  public updateFrom(src: Ingredient): void {
    this.name = src.name;
    this.percentage = src.percentage;
  }
}

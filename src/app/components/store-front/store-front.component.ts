import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {Product} from "app/models/product.model";
import {ShoppingCart} from "app/models/shopping-cart.model";
import {ProductsDataService} from "app/services/products.service";
import {ShoppingCartService} from "app/services/shopping-cart.service";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";

/**
 * Component that contains a list of products
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-store-front",
  styleUrls: ["./store-front.component.scss"],
  templateUrl: "./store-front.component.html"
})
export class StoreFrontComponent implements OnInit {
  /**
   * List of products
   */
  public products: Observable<Product[]>;

  /**
   * Constructor
   * @param {ProductsDataService} productsService
   * @param {ShoppingCartService} shoppingCartService
   */
  public constructor(private productsService: ProductsDataService,
                     private shoppingCartService: ShoppingCartService) {
  }

  /**
   * Adds product to the card
   * @param {Product} product
   */
  public addProductToCart(product: Product): void {
    this.shoppingCartService.addItem(product, 1);
  }

  /**
   * Removes product from the card
   * @param {Product} product
   */
  public removeProductFromCart(product: Product): void {
    this.shoppingCartService.addItem(product, -1);
  }

  /**
   * Returns information if product is in the card
   * @param {Product} product
   * @returns {boolean}
   */
  public productInCart(product: Product): boolean {
    return Observable.create((obs: Observer<boolean>) => {
      const sub = this.shoppingCartService
        .get()
        .subscribe((cart) => {
          obs.next(cart.items.some((i) => i.productId === product.id));
          obs.complete();
        });
      sub.unsubscribe();
    });
  }

  /**
   * Initializes products in the card
   */
  public ngOnInit(): void {
    this.products = this.productsService.all();
  }
}

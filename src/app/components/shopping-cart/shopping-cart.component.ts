import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { Product } from "app/models/product.model";
import { ShoppingCart } from "app/models/shopping-cart.model";
import { ProductsDataService } from "app/services/products.service";
import { ShoppingCartService } from "app/services/shopping-cart.service";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

/**
 * Shopping cart component
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html"
})

/**
 * Shopping cart class
 */
export class ShoppingCartComponent implements OnInit, OnDestroy {
  /**
   * Products
   */
  public products: Observable<Product[]>;
  /**
   * Card
   */
  public cart: Observable<ShoppingCart>;
  /**
   * Item count
   */
  public itemCount: number;
  /**
   * Cart subscription
   */
  private cartSubscription: Subscription;

  /**
   * Constructor
   * @param {ProductsDataService} productsService
   * @param {ShoppingCartService} shoppingCartService
   */
  public constructor(private productsService: ProductsDataService,
                     private shoppingCartService: ShoppingCartService) {
  }

  /**
   * Cleans cart
   */
  public emptyCart(): void {
    this.shoppingCartService.empty();
  }

  /**
   * Initializes set up values
   */
  public ngOnInit(): void {
    this.products = this.productsService.all();
    this.cart = this.shoppingCartService.get();
    this.cartSubscription = this.cart.subscribe((cart) => {
      this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
    });
  }

  /**
   * Destroys component
   */
  public ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}

import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { CartItem } from "app/models/cart-item.model";
import { DeliveryOption } from "app/models/delivery-option.model";
import { Product } from "app/models/product.model";
import { ShoppingCart } from "app/models/shopping-cart.model";
import { DeliveryOptionsDataService } from "app/services/delivery-options.service";
import { ProductsDataService } from "app/services/products.service";
import { ShoppingCartService } from "app/services/shopping-cart.service";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

/**
 * Cart interface
 */
interface ICartItemWithProduct extends CartItem {
  /**
   * Product
   */
  product: Product;
  /**
   * Total cost
   */
  totalCost: number;
}

/**
 * Checkout component
 */
@Component({
  selector: "app-checkout",
  styleUrls: ["./checkout.component.scss"],
  templateUrl: "./checkout.component.html"
})

/**
 * Checkout class
 */
export class CheckoutComponent implements OnInit, OnDestroy {
  /**
   * Delivery options
   */
  public deliveryOptions: Observable<DeliveryOption[]>;
  /**
   * Cart
   */
  public cart: Observable<ShoppingCart>;
  /**
   * Cart items
   */
  public cartItems: ICartItemWithProduct[];
  /**
   * Item count
   */
  public itemCount: number;
  /**
   * Product list
   */
  private products: Product[];
  /**
   * Cart subscription
   */
  private cartSubscription: Subscription;

  /**
   * Constructor
   * @param {ProductsDataService} productsService
   * @param {DeliveryOptionsDataService} deliveryOptionService
   * @param {ShoppingCartService} shoppingCartService
   */
  public constructor(private productsService: ProductsDataService,
                     private deliveryOptionService: DeliveryOptionsDataService,
                     private shoppingCartService: ShoppingCartService) {
  }

  /**
   * Clears cart
   */
  public emptyCart(): void {
    this.shoppingCartService.empty();
  }

  /**
   * Sets delivery options
   * @param {DeliveryOption} option
   */
  public setDeliveryOption(option: DeliveryOption): void {
    this.shoppingCartService.setDeliveryOption(option);
  }

  /**
   * Initializes start up values
   */
  public ngOnInit(): void {
    this.deliveryOptions = this.deliveryOptionService.all();
    this.cart = this.shoppingCartService.get();
    this.cartSubscription = this.cart.subscribe((cart) => {
      this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
      this.productsService.all().subscribe((products) => {
        this.products = products;
        this.cartItems = cart.items
                           .map((item) => {
                              const product = this.products.find((p) => p.id === item.productId);
                              return {
                                ...item,
                                product,
                                totalCost: product.price * item.quantity };
                           });
      });
    });
  }

  /**
   * Destroys subscription
   */
  public ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}

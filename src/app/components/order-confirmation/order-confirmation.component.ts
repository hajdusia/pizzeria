import { Component, OnInit } from "@angular/core";
import { ShoppingCartService } from "../../services/shopping-cart.service";

/**
 * Order confirmation component
 */
@Component({
  selector: "app-order-confirmation",
  templateUrl: "./order-confirmation.component.html"
})

/**
 * Order confirmation class
 */
export class OrderConfirmationComponent implements OnInit {
  /**
   * Contructor
   * @param {ShoppingCartService} shoppingCartService
   */
  public constructor(private shoppingCartService: ShoppingCartService) {}

  /**
   * Initializes strat up values
   */
  public ngOnInit(): void {
    this.shoppingCartService.empty();
  }
}

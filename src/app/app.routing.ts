import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { CheckoutComponent } from "./components/checkout/checkout.component";
import { OrderConfirmationComponent } from "./components/order-confirmation/order-confirmation.component";
import { StoreFrontComponent } from "./components/store-front/store-front.component";

@NgModule({
    exports: [RouterModule],
    imports: [
        RouterModule.forRoot([
            {
                component: CheckoutComponent,
                path: "checkout"
            },
            {
                component: OrderConfirmationComponent,
                path: "confirmed"
            },
            {
                component: StoreFrontComponent,
                path: "**"
            }])
    ]
})
export class AppRoutingModule { }

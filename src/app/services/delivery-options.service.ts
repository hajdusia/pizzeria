import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { DeliveryOption } from "../models/delivery-option.model";
import { CachcingServiceBase } from "./caching.service";

/**
 * Delivery options data service
 */
@Injectable()
export class DeliveryOptionsDataService extends CachcingServiceBase {
  /**
   * Delivery options
   */
  private deliveryOptions: Observable<DeliveryOption[]>;

  /**
   * Constructor
   * @param {Http} http
   */
  public constructor(private http: Http) {
    super();
  }

  /**
   * Get available delivery options
   * @returns {Observable<DeliveryOption[]>}
   */
  public all(): Observable<DeliveryOption[]> {
    return this.cache<DeliveryOption[]>(() => this.deliveryOptions,
                                        (val: Observable<DeliveryOption[]>) => this.deliveryOptions = val,
                                        () => this.http
                                                  .get("./assets/delivery-options.json")
                                                  .map((response) => response.json()
                                                                             .map((item) => {
                                                                                let model = new DeliveryOption();
                                                                                model.updateFrom(item);
                                                                                return model;
                                                                              })));

  }
}

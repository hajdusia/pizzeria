import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Product } from "app/models/product.model";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { CachcingServiceBase } from "./caching.service";

/**
 * Product count
 * @type {number}
 */
let count = 0;

/**
 * Product data service
 */
@Injectable()
export class ProductsDataService extends CachcingServiceBase {
  /**
   * Products
   */
  private products: Observable<Product[]>;

  /**
   * Constructor
   * @param {Http} http
   */
  public constructor(private http: Http) {
    super();
  }

  /**
   * Gets all products
   * @returns {Observable<Product[]>}
   */
  public all(): Observable<Product[]> {
    return this.cache<Product[]>(() => this.products,
                                 (val: Observable<Product[]>) => this.products = val,
                                 () => this.http
                                           .get("./assets/products.json")
                                           .map((response) => response.json()
                                                                      .map((item) => {
                                                                        let model = new Product();
                                                                        model.updateFrom(item);
                                                                        return model;
                                                                      })));

  }
}

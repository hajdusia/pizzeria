import "rxjs/add/operator/share";
import { Observable } from "rxjs/Observable";

/**
 * Caching service
 */
export abstract class CachcingServiceBase {
  /**
   * Gets cache
   * @param {() => Observable<T>} getter
   * @param {(val: Observable<T>) => void} setter
   * @param {() => Observable<T>} retreive
   * @returns {Observable<T>}
   */
  protected cache<T>(getter: () => Observable<T>,
                     setter: (val: Observable<T>) => void,
                     retreive: () => Observable<T>): Observable<T> {
    const cached = getter();
    if (cached !== undefined) {
      return cached;
    } else {
      const val = retreive().share();
      setter(val);
      return val;
    }
  }
}

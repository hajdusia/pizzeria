import { Injectable } from "@angular/core";
import "rxjs/add/operator/share";

/**
 * Abstract class of storage service
 */
export abstract class StorageService {
  /**
   * Abstract storage
   * @returns {Storage}
   */
  public abstract get(): Storage;
}

/**
 * Implementation of local storage service
 */
@Injectable()
export class LocalStorageService extends StorageService {
  /**
   * Storage
   * @returns {Storage}
   */
  public get(): Storage {
    return localStorage;
  }
}

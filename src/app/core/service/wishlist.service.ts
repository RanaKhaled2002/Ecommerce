import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WishlistService  {

  constructor(private _HttpClient:HttpClient) { }

  baseUrl:string = `https://ecommerce.routemisr.com`;
  wishlistNumber:BehaviorSubject<number>=new BehaviorSubject(0);


  addToWishlist(pId:string)
  {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/wishlist`,{productId:pId});
  }

  getUserWishlist()
  {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/wishlist`);
  }

  deleteProductFromWishlist(pId:string)
  {
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/wishlist/${pId}`);
  }
}

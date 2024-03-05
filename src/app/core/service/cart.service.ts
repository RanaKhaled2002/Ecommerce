import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient,private _AuthService:AuthService) { }

  baseUrl:string = `https://ecommerce.routemisr.com`;
  cartNumber:BehaviorSubject<number>=new BehaviorSubject(0);
  userId:string = this._AuthService.userId;
  
  addProduct(pId:string)
  {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/cart`,{productId:pId});
  }

  updateCart(pId:string,count:string)
  {
    return this._HttpClient.put(`${this.baseUrl}/api/v1/cart/${pId}`,{count:count});
  }

  getUserCart()
  {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/cart`);
  }

  rmoveSpecificItem(pId:string)
  {
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart/${pId}`);
  }

  clearCart()
  {
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart`)
  }

  checkOutSession(cartId:string|null,orderInfo:object):Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,{shippingAddress:orderInfo})
  }

  cashPayment(cartId:string|null,orderInfo:object):Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/orders/${cartId}`,{shippingAddress:orderInfo});
  }

  getAllUserOrders():Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/orders/user/${this.userId}`)
  }

}

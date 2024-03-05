import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl:string = `https://ecommerce.routemisr.com`;

  constructor(private _HttpClient:HttpClient) { }

  getAllProduct(pageNumber:number = 1):Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/products?page=${pageNumber}`);
  }

  getSpecificProduct(pId:string):Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/products/${pId}`);
  }

  getAllCategories():Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/categories`)
  }

  getAllBrands():Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/brands`);
  }

  getSpecificCategory(pId:string):Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/categories/${pId}`);
  }
}

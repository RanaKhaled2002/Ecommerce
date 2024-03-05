import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {AccountData} from '../interface/account-data'
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl:string = `https://ecommerce.routemisr.com`;
  userToken:BehaviorSubject<any> = new BehaviorSubject(null);
  userId:string = '';


  constructor(private _HttpClient:HttpClient) { }

  registerData(rData:AccountData):Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signup`,rData)
  }

  loginData(rData:AccountData):Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signin`,rData);
  }

  forgetPassword(rData:AccountData):Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/forgotPasswords`,rData);
  }

  verfiyPassword(rData:AccountData):Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/verifyResetCode`,rData);
  }
  
  resetPassword(rData:AccountData):Observable<any>
  {
    return this._HttpClient.put(`${this.baseUrl}/api/v1/auth/resetPassword`,rData);
  }

  decodeToken()
  {
    if(localStorage.getItem("userToken")!=null)
    {
      this.userToken.next(localStorage.getItem("userToken"));
      this.userToken.next(jwtDecode(this.userToken.getValue()));
      this.userId = this.userToken.getValue().id;
    }
    else
    {
      this.userToken.next(null);
    }
  }

  updatePassword(rData:AccountData):Observable<any>
  {
    return this._HttpClient.put(`${this.baseUrl}/api/v1/users/changeMyPassword`,rData);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/core/service/cart.service';
import {Product} from 'src/app/core/interface/product'
import { CuttextPipe } from 'src/app/core/pipe/cuttext.pipe';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,CuttextPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems:Product[]|null=null;
  totalPrice!:string;
  cartId:string="";
  constructor(private _CartService:CartService){}

  ngOnInit(): void {
    localStorage.setItem("currentPage",'/cart');

    this._CartService.getUserCart().subscribe({
      next:(res:any)=>{
        console.log(res)
        if(res.numOfCartItems == 0)
        {
          this.cartItems = null;
        }
        else
        {
          this.cartId = res.data._id;
          this.cartItems = res.data.products;
          this.totalPrice = res.data.totalCartPrice;
        }
      },
      error:(err)=>{console.log(err)},
    })
  }

  removeItme(pId:string)
  {
    this._CartService.rmoveSpecificItem(pId).subscribe({
      next:(res:any)=>{
        this.cartItems = res?.data?.products;
        this.totalPrice = res?.data?.totalCartPrice;
        this._CartService.cartNumber.next(res.numOfCartItems);
        console.log(this.cartItems?.length)
        if(this.cartItems?.length==0)
        {
          this.cartItems = null;
        }
      },
      error:(err)=>{console.log(err)},
    })
  }

  updateCart(operation:string,count:string,pId:string)
  {
    if(operation == 'plus')
    {
      count = (Number(count) + 1).toString();
    }
    else
    {
      count = (Number(count) - 1).toString();
    }
    if(Number(count) >= 1)
    {
      this._CartService.updateCart(pId,count).subscribe({
        next:(res:any)=>{
          this.cartItems = res.data.products;
          this.totalPrice = res.data.totalCartPrice;
        },
        error:(err)=>{console.log(err);}
      })
    }
  }

  clearCart()
  {
    this._CartService.clearCart().subscribe({
      next:(res:any)=>{
        if(res.message=="success")
        {
          this.cartItems = null;
          this.totalPrice = "";
          this._CartService.cartNumber.next(0);
        }
      },
      error:(err)=>{console.log(err)},
    })
  }

}

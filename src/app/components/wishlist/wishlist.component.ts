import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from 'src/app/core/service/wishlist.service';
import {Product} from 'src/app/core/interface/product';
import { CartService } from 'src/app/core/service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CuttextPipe } from 'src/app/core/pipe/cuttext.pipe';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule,CuttextPipe,RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  constructor(private _WishlistService:WishlistService,private _CartService:CartService,private _Renderer2:Renderer2,private _ToastrService:ToastrService){}
  allProduct:Product[]= [];
  wishlist:string[]|null=null;


  ngOnInit(): void {
    this._WishlistService.getUserWishlist().subscribe({
      next:(res:any)=>{
        if(res.count==0)
        {
          this.wishlist = null
        }
        else
        {
          this.allProduct = res.data;
          const newData = res.data.map((item:any)=>item._id)
          this.wishlist = newData;
          this._WishlistService.wishlistNumber.next(res.data.length);
        }
        
      },
      error:(err)=>{console.log(err)},
     })
  }

  addProduct(pId:string,element:HTMLButtonElement)
  {
    this._Renderer2.setAttribute(element,'disabled','true');
    this._CartService.addProduct(pId).subscribe({
      next:(res:any)=>{
        this._ToastrService.success(res.message);
        this._Renderer2.removeAttribute(element,'disabled');
        this._CartService.cartNumber.next(res.numOfCartItems);
        this.removeFromWishList(pId)
      },
      error:(err)=>{
        console.log(err);
        this._Renderer2.removeAttribute(element,'diabled');
      },
    })
  }

  addToWishlist(pId:string)
  {
    this._WishlistService.addToWishlist(pId).subscribe({
      next:(res:any)=>{
        this.wishlist = res.data;
        this._ToastrService.success(res.message);
        console.log(res.data.length)
        this._WishlistService.wishlistNumber.next(res.data.length);
      },
      error:(err)=>{console.log(err)},
    })
  }

  removeFromWishList(pId:string)
  {
    this._WishlistService.deleteProductFromWishlist(pId).subscribe({
      next:(res:any)=>{
       this.wishlist =  res.data;
       this._ToastrService.success(res.message);
       const newProductData = this.allProduct?.filter((item:any)=>this.wishlist?.includes(item._id));
       this.allProduct = newProductData;
       this._WishlistService.wishlistNumber.next(res.data.length);
       if(this.allProduct?.length==0)
        {
          this.wishlist = null;
        }
      },
      error:(err)=>{console.log(err)},
    })
  }

 
}

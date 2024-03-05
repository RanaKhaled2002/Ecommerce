import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/service/product.service';
import {Product} from 'src/app/core/interface/product'
import { RouterLink } from '@angular/router';
import { CuttextPipe } from 'src/app/core/pipe/cuttext.pipe';
import { CartService } from 'src/app/core/service/cart.service';
import { ToastrService } from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { WishlistService } from 'src/app/core/service/wishlist.service';



@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule,RouterLink,CuttextPipe,NgxPaginationModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(private _ProductService:ProductService,private _Renderer2:Renderer2,private _CartService:CartService,private _ToastrService:ToastrService,private _WishlistService:WishlistService){}

  allProduct:Product[] = [];
  pageSize:number  = 0;
  currentPage:number = 1;
  total:number = 0;
  wishlist:string[]=[];



  ngOnInit(): void {
    
    // Get All Product
    this._ProductService.getAllProduct().subscribe({
      next :(res)=>{
        this.allProduct=res.data;
      },
      error:(err)=>{console.log(err)},
    })

    // Get All Wishlist Product
    this._WishlistService.getUserWishlist().subscribe({
      next :(res:any)=>{
        const newData = res.data.map((item:any)=>item._id)
        this.wishlist = newData;
        this._WishlistService.wishlistNumber.next(res.data.length);
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
       this._WishlistService.wishlistNumber.next(res.data.length);
      },
      error:(err)=>{console.log(err)},
    })
  }

  pageChanged(event:any)
  {
    this._ProductService.getAllProduct(event).subscribe({
      next :(res)=>{
        this.allProduct=res.data;
        this.pageSize = res.metadata.limit;
        this.currentPage = res.metadata.currentPage;
        this.total = res.results;
      },
      error:(err)=>{console.log(err)},
    })
  }
}

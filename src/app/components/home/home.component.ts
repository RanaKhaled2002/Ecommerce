import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/service/product.service';
import {Product,Category} from 'src/app/core/interface/product'
import { CuttextPipe } from 'src/app/core/pipe/cuttext.pipe';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from 'src/app/core/service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from 'src/app/core/pipe/search.pipe';
import { FormsModule } from '@angular/forms';
import { WishlistService } from 'src/app/core/service/wishlist.service';





@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CuttextPipe,CarouselModule,RouterLink,SearchPipe,FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _ProductService:ProductService,private _CartService:CartService,private _ToastrService:ToastrService,private _Renderer2:Renderer2,private _WishlistService:WishlistService){}

  allProduct:Product[] = [];
  allCategories: Category[] = [];
  searchValue:string = ""
  wishlist:string[]=[];

  ngOnInit(): void {
    
    // Get All Product
    this._ProductService.getAllProduct().subscribe({
      next :(res)=>{
        this.allProduct=res.data;
      },
      error:(err)=>{console.log(err)},
    })

    // Get All Categories
    this._ProductService.getAllCategories().subscribe({
      next :(res:any)=>{
        this.allCategories = res.data;
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

  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout:5000,
    autoplaySpeed: 1000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: false
  }

  mainSlideOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout:5000,
    autoplaySpeed: 1000,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: true
  }
  

}

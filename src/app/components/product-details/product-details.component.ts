import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/service/product.service';
import { ActivatedRoute } from '@angular/router';
import {Product} from 'src/app/core/interface/product'
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/core/service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/core/service/wishlist.service';






@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule,CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  constructor(private _ProductService:ProductService,private _ActivatedRoute:ActivatedRoute,private _CartService:CartService,private _ToastrService:ToastrService,private _Renderer2:Renderer2,private _WishlistService:WishlistService){}

  pId!:string;
  productDetails!:Product;
  wishlist:string[]=[];



  ngOnInit(): void {

    // get id
    this._ActivatedRoute.params.subscribe({
      next:(params)=>{
        this.pId=params['id'];
      },
      error:(err)=>{console.log(err)},
    })

     // get product details
     this._ProductService.getSpecificProduct(this.pId).subscribe({
      next:(res)=>{
        this.productDetails=res.data;
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

  imagesOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
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

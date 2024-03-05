import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { CartService } from 'src/app/core/service/cart.service';
import { WishlistService } from 'src/app/core/service/wishlist.service';





@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.scss']
})
export class NavBlankComponent implements OnInit {

  constructor(private _AuthService:AuthService,private _Router:Router,private _CartService:CartService,private _Renderer2:Renderer2,private _WishlistService:WishlistService){}

  @ViewChild('navBar') navElement!:ElementRef;
  @HostListener('window:scroll')
  onscroll()
  {
    if(scrollY>300)
    {
      this._Renderer2.addClass(this.navElement.nativeElement,'p-3');
      this._Renderer2.addClass(this.navElement.nativeElement,'shadow');
    }
    else
    {
      this._Renderer2.removeClass(this.navElement.nativeElement,'p-3');
      this._Renderer2.removeClass(this.navElement.nativeElement,'shadow');

    }
  }

  cartNumber:number = 0;
  wishlistNumber:number = 0;

  ngOnInit(): void {

    this._CartService.cartNumber.subscribe({
      next:(data)=>{
        this.cartNumber = data;
      },
      error:(err)=>{console.log(err)},
    })
    
    this._CartService.getUserCart().subscribe({
      next:(res:any)=>{
        this.cartNumber = res.numOfCartItems;
      },
      error:(err)=>{
        console.log(err.error.statusMsg)
        if(err.error.statusMsg == "fail")
        {
          this.cartNumber = 0;
        }
      }
    }) 

    this._WishlistService.wishlistNumber.subscribe({
      next:(data)=>{
        this.wishlistNumber = data;
      },
      error:(err)=>{console.log(err)},
    })


  }

  logout()
  {
    localStorage.removeItem("userToken");
    localStorage.removeItem("currentPage");
    this._Router.navigate(['/login']);
  }

}

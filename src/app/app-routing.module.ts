import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

const routes: Routes = [
  // blank
  {path:"", 
  canActivate:[authGuard],
  loadComponent:()=>import('./layout/blank-layout/blank-layout.component').then((m)=>m.BlankLayoutComponent),
  children:[
    {path:"",redirectTo:"home",pathMatch:"full"},
    {path:"home",loadComponent:()=>import('./components/home/home.component').then((m)=>m.HomeComponent),title:"Home"},
    {path:"product",loadComponent:()=>import('./components/product/product.component').then((m)=>m.ProductComponent),title:"Products"},
    {path:"productDetails/:id",loadComponent:()=>import('./components/product-details/product-details.component').then((m)=>m.ProductDetailsComponent),title:"Product Details"},
    {path:"category",loadComponent:()=>import('./components/category/category.component').then((m)=>m.CategoryComponent),title:"Categories"},
    {path:"cart",loadComponent:()=>import('./components/cart/cart.component').then((m)=>m.CartComponent),title:"Cart"},
    {path:"brand",loadComponent:()=>import('./components/brand/brand.component').then((m)=>m.BrandComponent),title:"Brands"},
    {path:"payment/:id",loadComponent:()=>import('./components/payment/payment.component').then((m)=>m.PaymentComponent),title:"Online Payment"},
    {path:"allorders",loadComponent:()=>import('./components/allorders/allorders.component').then((m)=>m.AllordersComponent),title:"All Orders"},
    {path:"wishlist",loadComponent:()=>import('./components/wishlist/wishlist.component').then((m)=>m.WishlistComponent),title:"WishList"},
    {path:"cash/:id",loadComponent:()=>import('./components/cash/cash.component').then((m)=>m.CashComponent),title:"Cash Payment"},
    {path:"changePassword",loadComponent:()=>import('./components/changepassword/changepassword.component').then((m)=>m.ChangepasswordComponent),title:"Change Password"},
  ]
  },

  // auth
  {path:"",
    loadComponent:()=>import('./layout/auth-layout/auth-layout.component').then((m)=>m.AuthLayoutComponent),
  children:[
    {path:"login",loadComponent:()=>import('./components/login/login.component').then((m)=>m.LoginComponent),title:"Login"},
    {path:"register",loadComponent:()=>import('./components/register/register.component').then((m)=>m.RegisterComponent),title:"Register"},
  ]
  },

  // not found
  {path:"**",
    loadComponent:()=>import('./components/notfound/notfound.component').then((m)=>m.NotfoundComponent),title:"Not Found"
  },
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

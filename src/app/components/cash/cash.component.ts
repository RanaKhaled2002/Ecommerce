import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/core/service/cart.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-cash',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.scss']
})
export class CashComponent {

  cartId:string|null = "";
  checkCorrectData:boolean = false;

  constructor(private _ActivatedRoute:ActivatedRoute,private _CartService:CartService,private _ToastrService:ToastrService,private _Router:Router){}

  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe({
      next:(p)=>{
        this.cartId = p['id'];
      },
      error:(err)=>{console.log(err)},
    })
  }

  paymentForm : FormGroup = new FormGroup({
    details:new FormControl(null,[Validators.required]),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^(01)[0125][0-9]{8}/)]),
    city:new FormControl(null,[Validators.required]),
  });

  submit()
  {
    this.checkCorrectData = true;
    this._CartService.cashPayment(this.cartId,this.paymentForm.value).subscribe({
      next:(data)=>
      {
        console.log(data);
        if(data.status == 'success')
        {
          this._ToastrService.success("Your Order Is Under Processing");
          this._CartService.cartNumber.next(0);
          this._Router.navigate(['/allorders']);
        }
      },
      error:(err)=>
      {
        console.log(err)
      }
    })
  }

}

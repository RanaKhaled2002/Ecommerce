import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from 'src/app/core/service/cart.service';



@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  cartId:string|null = "";
  checkCorrectData:boolean = false;

  constructor(private _ActivatedRoute:ActivatedRoute,private _CartService:CartService){}

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
    this._CartService.checkOutSession(this.cartId,this.paymentForm.value).subscribe({
      next:(data)=>
      {
        console.log(data);
        if(data.status =='success')
        {
          this.checkCorrectData = false;
          window.open(data.session.url,'_self');
        }
      
      },
      error:(err)=>
      {
        console.log(err)
      }
    })
  }

}

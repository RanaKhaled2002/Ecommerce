import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/core/service/cart.service';
import {Order} from 'src/app/core/interface/order';
import { CuttextPipe } from 'src/app/core/pipe/cuttext.pipe';


@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CommonModule,CuttextPipe],
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss']
})
export class AllordersComponent implements OnInit {

  allOrders:Order[]|null = [];

  constructor(private _CartService:CartService){}

  ngOnInit(): void {
    this._CartService.getAllUserOrders().subscribe({
      next:(res)=>{
        if(res.length == 0)
        {
          this.allOrders = null;
        }
        else
        {
          this.allOrders = res;
        }
      },
      error:(err)=>{console.log(err)},
    })
  }
}

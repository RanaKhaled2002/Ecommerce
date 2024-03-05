import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Brand} from 'src/app/core/interface/product'
import { ProductService } from 'src/app/core/service/product.service';


@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent {

  constructor(private _ProductService:ProductService){}

  allBrands!:Brand[];

  ngOnInit(): void {
    this._ProductService.getAllBrands().subscribe({
      next:(res:any)=>{
        this.allBrands = res.data;
      },
      error:(err)=>{console.log(err)},
    });
  }
}

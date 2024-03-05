import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Category} from 'src/app/core/interface/product';
import { ProductService } from 'src/app/core/service/product.service';


@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  constructor(private _ProductService:ProductService){}

  allCategories!:Category[];
  image:string = '';
  name:string = '';

  ngOnInit(): void {

    this._ProductService.getAllCategories().subscribe({
      next:(res:any)=>{
        this.allCategories = res.data;
      },
      error:(err)=>{console.log(err)},
    })
  }

  getSpecificCategory(pId:string)
  {
    this._ProductService.getSpecificCategory(pId).subscribe({
      next:(res)=>{
        this.image = res.data.image;
        this.name = res.data.name;
      },
      error:(err)=>{console.log(err)},
    })
  }
}

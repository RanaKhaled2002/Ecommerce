import { Pipe, PipeTransform } from '@angular/core';
import {Product} from 'src/app/core/interface/product';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(product:Product[], title:string): Product[] {
    return product.filter((item)=> item.title?.toLocaleLowerCase().includes(title.toLocaleLowerCase()));
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cuttext',
  standalone: true
})
export class CuttextPipe implements PipeTransform {

  transform(name:string,limit:number): unknown {
    return name.split(" ").slice(0,limit).join(" ");
  }

}

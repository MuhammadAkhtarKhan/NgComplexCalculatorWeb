import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberColor',
  standalone:true
})
export class NumberColorPipe implements PipeTransform {

 transform(value: number): string {
  if(value==undefined || value==null){
    value=0;
  }
    return value <= 0 ? 'red' : 'blue';
  }

}

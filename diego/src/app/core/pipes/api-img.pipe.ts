import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'apiImg',
  standalone: true
})
export class ApiImgPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bonus'
})
export class BonusPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

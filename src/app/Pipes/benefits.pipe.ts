import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'benefits'
})
export class BenefitsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

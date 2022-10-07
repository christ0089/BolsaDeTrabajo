import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'workHours'
})
export class WorkHoursPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status',
})
export class StatusPipe implements PipeTransform {
  transform(value: 'notified' | 'contracted' | "dismissed", ...args: unknown[]): unknown {
    switch (value) {
      case 'notified':
        return 'esta interesada en tu CV';
      case 'contracted':
        return 'te quiere contratar';
      case 'dismissed':
        return 'cancelo tú solicitud';
      default: 
        return ''
    }
  }
}

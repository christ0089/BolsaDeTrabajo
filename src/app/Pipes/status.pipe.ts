import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status',
})
export class StatusPipe implements PipeTransform {
  transform(value: 'notified' | 'contracted', ...args: unknown[]): unknown {
    switch (value) {
      case 'notified':
        return 'esta interasada en tu CV';
      case 'contracted':
        return 'te quiere contratar';
      default: 
        return ''
    }
  }
}

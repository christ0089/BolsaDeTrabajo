import { Pipe, PipeTransform } from '@angular/core';
import { JobStatus } from '../Models/job_application';

@Pipe({
  name: 'statusChip'
})
export class StatusChipPipe implements PipeTransform {

  transform(value: JobStatus, ...args: unknown[]): unknown {
    switch (value) {
      case 'applied':
        return 'Nueva aplicación';
      case 'notified':
        return 'Interesado';
      case 'contracted':
        return 'Contratado';
      case 'dismissed':
        return 'Cancelada';
      default: 
        return ''
    }
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { BonusTypes } from '../Models/job_postition';

@Pipe({
  name: 'bonus',
})
export class BonusPipe implements PipeTransform {
  transform(value: BonusTypes | string, ...args: unknown[]): unknown {
    switch (value) {
      case 'monthly_bonus':
        return 'Bono Mensual';
      case 'productivity_bonus':
        return 'Bono de Productividad';
      case 'punctuality_bonus':
        return 'Bono de Puntualidad';
      case 'quarter_bonus':
        return 'Bono Quatrimestral';
      case 'yearly_bonus':
        return 'Bono Anual';
      default:
        return '';
    }
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'benefits'
})
export class BenefitsPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    switch (value) {
      case 'health_insurance':
        return 'Seguro Medico';
      case 'dental_insurance':
        return 'Seguro Dental';
      case 'vales_despensas':
        return 'Vales de Despensas';
      default:
        return '';
    }
  }

}

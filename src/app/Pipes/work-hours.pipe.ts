import { Pipe, PipeTransform } from '@angular/core';
import { BonusTypes, WorkHoursTypes } from '../Models/job_postition';

@Pipe({
  name: 'workHours'
})
export class WorkHoursPipe implements PipeTransform {

  transform(value: WorkHoursTypes | string, ...args: unknown[]): unknown {

    switch(value) {
      case "10_hours":
        return "10 Horas"
      case "12_hours":
        return "12 Horas"
      case "8_hours":
        return "8 Horas"
      case "flexible":
        return "Flexible"
      case "guard":
        return "Guardia"
      case "includes_holidays":
        return "Incluye dias festivos"
      case "includes_weekends":
        return "Incluye fin de semanas"
      case "morning_shift":
        return "Guardia de Mañana"
      case "night_shift":
        return "Guardia Nocturna"
      default: 
        return ""
    }
  }

}

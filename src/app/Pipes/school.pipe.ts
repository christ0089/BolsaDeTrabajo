import { Pipe, PipeTransform } from '@angular/core';
import { School_Level_Type } from '../Models/job_postition';

@Pipe({
  name: 'school'
})
export class SchoolPipe implements PipeTransform {

  transform(value: School_Level_Type, ...args: unknown[]): unknown {

    switch (value) {
      case "highschool":
        return "Preparatoria"
      case "masters":
        return "Maestría"
      case "middleschool":
        return "Secundaría"
      case "university":
        return "Licienciatura"
    }
    return null;
  }

}

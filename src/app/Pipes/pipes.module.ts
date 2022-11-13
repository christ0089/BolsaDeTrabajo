import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BenefitsPipe } from './benefits.pipe';
import { BonusPipe } from './bonus.pipe';
import { WorkHoursPipe } from './work-hours.pipe';
import { StatusPipe } from './status.pipe';
import { StatusChipPipe } from './status-chip.pipe';
import { SchoolPipe } from './school.pipe';



@NgModule({
  declarations: [
    BenefitsPipe,
    BonusPipe,
    WorkHoursPipe,
    StatusPipe,
    StatusChipPipe,
    SchoolPipe
  ],
  imports: [
    CommonModule
  ], exports: [
    BenefitsPipe,
    BonusPipe,
    StatusChipPipe,
    StatusPipe,
    SchoolPipe,
    WorkHoursPipe
  ]
})
export class PipesModule { }

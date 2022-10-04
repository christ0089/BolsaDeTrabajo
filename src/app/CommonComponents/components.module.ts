import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormQuestionComponent } from './question/question.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LocationComponent } from './location/location.component';
import { GeoQuestionComponent } from './geo-question/geo-question.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { ChipsComponent } from './chips/chips.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { JobItemComponent } from './job-item/job-item.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { ApplicationInfoComponent } from '../EmployeerComponents/application-info/application-info.component';
import { EmployerInfoFormComponent } from '../EmployeerComponents/employer-info-form/employer-info-form.component';
import { JobPositionFormComponent } from '../EmployeerComponents/job-position-form/job-position-form.component';
import { NewQuestionComponent } from '../EmployeerComponents/new-question/new-question.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    DragDropModule,
    MatSelectModule,
    MatButtonModule,
    MatTabsModule,
    MatCheckboxModule,
    MatChipsModule,
    MatProgressBarModule,
    MatRadioModule,
    MatListModule,
    MatDatepickerModule,
    NzMenuModule,
    NzCardModule,
    NzPageHeaderModule,
    NzLayoutModule,
  ],
  declarations: [
    DynamicFormQuestionComponent,
    LocationComponent,
    ChipsComponent,
    JobItemComponent,
    GeoQuestionComponent,
    ApplicationInfoComponent,
    EmployerInfoFormComponent,
    JobPositionFormComponent,
    NewQuestionComponent,
  ],
  providers: [],
  exports: [
    DynamicFormQuestionComponent,
    LocationComponent,
    ChipsComponent,
    JobItemComponent,
    GeoQuestionComponent,
    ApplicationInfoComponent,
    EmployerInfoFormComponent,
    JobPositionFormComponent,
    NewQuestionComponent,
  ],
})
export class ComponentModule {}
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
import { MatBadgeModule} from '@angular/material/badge';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LocationComponent } from './location/location.component';
import { GeoQuestionComponent } from './geo-question/geo-question.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzCardModule } from 'ng-zorro-antd/card';

import { JobItemComponent } from './job-item/job-item.component';
import { ChipsComponent } from './chips/chips.component';
import { ApplicationInfoComponent } from '../EmployeerComponents/application-info/application-info.component';
import { EmployerInfoFormComponent } from '../EmployeerComponents/employer-info-form/employer-info-form.component';
import { JobPositionFormComponent } from '../EmployeerComponents/job-position-form/job-position-form.component';
import { EmployeerComponent } from './employeer-dropdown/employeer.component';
import { UserRolesViewComponent } from '../EmployeerComponents/user-roles-view/user-roles.component';
import { JobDescriptionComponent } from './job-description/job-description.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { ApplicationStatusComponent } from '../EmployeerComponents/application-status/application-status.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PipesModule } from '../Pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    DragDropModule,
    MatSelectModule,
    MatButtonModule,
    MatBadgeModule,
    MatTabsModule,
    MatDialogModule,
    MatCheckboxModule,
    MatChipsModule,
    MatProgressBarModule,
    MatRadioModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NzMenuModule,
    NzCardModule,
    NzPageHeaderModule,
    PipesModule,
    NzLayoutModule,
  ],
  declarations: [
    DynamicFormQuestionComponent,
    LocationComponent,
    ChipsComponent,
    JobItemComponent,
    GeoQuestionComponent,
    ApplicationInfoComponent,
    EmployeerComponent,
    EmployerInfoFormComponent,
    JobPositionFormComponent,
    UserRolesViewComponent,
    JobDescriptionComponent,
    ApplicationStatusComponent,
    FavoriteComponent,
   // NotificationsComponent,
  ],
  providers: [],
  exports: [
    DynamicFormQuestionComponent,
    LocationComponent,
    ChipsComponent,
    JobItemComponent,
    GeoQuestionComponent,
    ApplicationStatusComponent,
    EmployeerComponent,
    ApplicationInfoComponent,
    EmployerInfoFormComponent,
    JobPositionFormComponent,
    JobDescriptionComponent,
    FavoriteComponent,
 //   NotificationsComponent
  ],
})
export class ComponentModule {}

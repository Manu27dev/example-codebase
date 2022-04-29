import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { CurrentTrainingComponent } from './current-training/current-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { TrainingComponent } from './training.component';
import { TrainingRoutingModule } from './training-routing.module';
import { AuthGuard } from './../auth/servicies/auth.guard';
import { StoreModule } from '@ngrx/store';
import { TrainingReducer } from './training.reducer';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    StopTrainingComponent,
  ],
  imports: [
    SharedModule,
    TrainingRoutingModule,
    StoreModule.forFeature('training', TrainingReducer),
  ],
  exports: [],
  providers: [AuthGuard],
  entryComponents: [StopTrainingComponent],
})
export class TrainingModule {}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TrainingService } from './servicies/training.service';
import * as fromTraining from './training.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit {
  onGoTraining$!: Observable<boolean>;
  // exerciseSubscription!: Subscription;
  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    this.onGoTraining$ = this.store.select(fromTraining.getIsTraining);
    // this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(
    //   (exercise) => {
    //     if (exercise) {
    //       this.onGoTraining = true;
    //     } else {
    //       this.onGoTraining = false;
    //     }
    //   }
    // );
  }
  // ngOnDestroy(): void {
  //   if (this.exerciseSubscription) {
  //     this.exerciseSubscription.unsubscribe();
  //   }
  // }
}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TrainingService } from './../servicies/training.service';
import { Exercise } from './../model/exercise.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { UiService } from './../../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  @Output() trainingStart = new EventEmitter<void>();
  exercises$!: Observable<Exercise[] | null>;
  isLoading$!: Observable<boolean>;
  // private exerciseSubscription!: Subscription;
  // private loadingSubscription!: Subscription;

  constructor(
    private trainingService: TrainingService,
    private uiService: UiService,
    private store: Store<fromTraining.State>
  ) {}

  onStarTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercise();
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
    this.fetchExercises();
    // this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
    //   (isLoading) => {
    //     this.isLoading = isLoading;
    //   }
    // );
    // this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
    //   (exercises) => {
    //     this.exercises = exercises;
    //   }
    // );
  }

  // ngOnDestroy(): void {
  //   if (this.exerciseSubscription) {
  //     this.exerciseSubscription.unsubscribe();
  //   }
  // if (this.loadingSubscription) {
  //   this.loadingSubscription.unsubscribe();
  // }
}

import { Injectable } from '@angular/core';
import { Exercise } from './../model/exercise.model';
import { Subject, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, take } from 'rxjs/operators';
import { UiService } from './../../shared/ui.service';
import { Store } from '@ngrx/store';
import * as Training from '../training.actions';
import * as fromTraining from '../training.reducer';
import * as UI from '../../shared/ui.actions';
import { StartTraining } from './../training.actions';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  // { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
  // { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
  // { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
  // { id: 'burpees', name: 'Burpees', duration: 30, calories: 8 },

  private availableExercise: Exercise[] = [];
  private runningExercise!: Exercise | null;
  private finischedExercies: Exercise[] = [];
  private fbSubscription: Subscription[] = [];
  // exerciseChanged = new Subject<Exercise | null>();
  // exercisesChanged = new Subject<Exercise[] | null>();
  // finischedExercisesChanged = new Subject<Exercise[] | null>();

  constructor(
    private db: AngularFirestore,
    private uiService: UiService,
    private store: Store<fromTraining.State>
  ) {}

  fetchAvailableExercise() {
    this.store.dispatch(new UI.StartLoading());
    // this.uiService.loadingStateChanged.next(true);
    this.fbSubscription.push(
      this.db
        .collection('availableExercise')
        .snapshotChanges()
        .pipe(
          map((docArray) => {
            return docArray.map((doc) => {
              return {
                id: doc.payload.doc.id,
                name: (doc.payload.doc.data() as Exercise).name,
                duration: (doc.payload.doc.data() as Exercise).duration,
                calories: (doc.payload.doc.data() as Exercise).calories,
              };
            });
          })
        )
        .subscribe(
          (exercises: Exercise[]) => {
            this.store.dispatch(new UI.StopLoading());
            this.store.dispatch(new Training.SetAvailableTrainings(exercises));

            // this.uiService.loadingStateChanged.next(false);
            // this.availableExercise = exercises;
            // this.exercisesChanged.next([...this.availableExercise]);
          },
          (error) => {
            this.store.dispatch(new UI.StopLoading());
            // this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar(
              'Fetching Exercise failed,please try again later',
              undefined,
              3000
            );
            // this.exercisesChanged.next(null);
          }
        )
    );
    // return this.availableExercise.slice();
    // creerà una copia cosi non andremo ad influire sull array
  }

  startExercise(selectId: string) {
    this.store.dispatch(new Training.StartTraining(selectId));
    // this.runningExercise = this.availableExercise.find(
    //   (ex) => ex.id === selectId
    // ) as Exercise;
    // this.exerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise() {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe((ex) => {
        this.addDataToDatabase({
          ...ex,
          date: new Date(),
          state: 'completed',
        } as Exercise);
        this.store.dispatch(new Training.StopTraining());
      });
    // this.runningExercise = null;
    // this.exerciseChanged.next(null);
  }
  cancelExercise(progress: number) {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe((ex: Exercise | any) => {
        this.addDataToDatabase({
          ...ex,
          duration: ex.duration * (progress / 100),
          calories: ex.calories * (progress / 100),
          date: new Date(),
          state: 'cancelled',
        } as Exercise);
        this.store.dispatch(new Training.StopTraining());
      });
    // this.addDataToDatabase({
    //   ...this.runningExercise,
    //   duration: (this.runningExercise as Exercise).duration * (progress / 100),
    //   calories: (this.runningExercise as Exercise).calories * (progress / 100),
    //   date: new Date(),
    //   state: 'cancelled',
    // } as Exercise);
    // this.store.dispatch(new Training.StopTraining());
    // this.runningExercise = null;
    // this.exerciseChanged.next(null);
  }

  // getRunningExercise() {
  //   return { ...this.runningExercise };
  // }

  fetchCompletedOrCancelledExercises() {
    this.fbSubscription.push(
      this.db
        .collection('finischedExercises')
        .valueChanges()
        .subscribe(
          (exercises: Exercise[] | any[]) => {
            this.store.dispatch(new Training.SetFinishedTrainings(exercises));
            // this.finischedExercisesChanged.next(exercises);
          },
          (error) => {
            console.log;
          }
        )
    );
  }

  cancelSubscription() {
    this.fbSubscription.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finischedExercises').add(exercise);
  }
}

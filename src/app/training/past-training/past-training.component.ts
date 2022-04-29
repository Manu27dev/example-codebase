import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { _MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../model/exercise.model';
import { TrainingService } from './../servicies/training.service';
import * as fromTraining from '../training.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css'],
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new _MatTableDataSource<Exercise>();
  // exChangedSubscription!: Subscription;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) {}

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase(); // per rimuovere ogni spazio e metterlo in minuscolo
  }

  ngOnInit(): void {
    this.store
      .select(fromTraining.getFinishedExercises)
      .subscribe((exercises: Exercise[] | null) => {
        this.dataSource.data = exercises as Exercise[];
      });

    this.trainingService.fetchCompletedOrCancelledExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // ngOnDestroy(): void {
  //   if (this.exChangedSubscription) {
  //     this.exChangedSubscription.unsubscribe();
  //   }
  // }
}

import { User } from '../model/user.model';
import { AuthData } from '../model/auth.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TrainingService } from './../../training/servicies/training.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UiService } from './../../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../app.reducer';
import * as UI from '../../shared/ui.actions';
import * as Auth from '../auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authChange = new Subject<boolean>();
  // private user!: User | null;
  // private isAuthThenAutenticated = false;
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UiService,
    private store: Store<fromRoot.State>
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.store.dispatch(new Auth.SetAuthenticated());
        // this.isAuthThenAutenticated = true;
        // this.authChange.next(true);
        this.router.navigateByUrl('/welcome');
      } else {
        this.trainingService.cancelSubscription();
        // this.authChange.next(false);
        this.store.dispatch(new Auth.SetUnauthenticated());
        this.router.navigateByUrl('/login');
        // this.isAuthThenAutenticated = false;
      }
    });
  }

  registerUser(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((res) => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
      })
      .catch((error) => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar(error.message, undefined, 3000);
        // this.snackBar.open(error.message, undefined, {
        //   duration: 3000,
        // });
      });
    // this.user = {
    //   email: authData.email,
    //   userId: Math.round(Math.random() * 1000).toString(),
    // };
  }

  login(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((res) => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
      })
      .catch((error) => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar(error.message, undefined, 3000);
        // this.snackBar.open(error.message, undefined, {
        //   duration: 3000,
        // });
      });
    // this.user = {
    //   email: authData.email,
    //   userId: Math.round(Math.random() * 1000).toString(),
    // };
  }

  logout() {
    // this.user = null;
    this.afAuth.signOut();
  }

  // getUser() {
  //   return { ...this.user };
  // }

  // isAuth() {
  //   return this.isAuthThenAutenticated;
  // }
}

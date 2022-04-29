import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from './../../auth/servicies/auth.service';
import { Subscription, Observable } from 'rxjs';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth$!: Observable<boolean>;
  authSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) {}

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
    // this.authSubscription = this.authService.authChange.subscribe(
    //   (authSatus) => {
    //     this.isAuth = authSatus;
    //   }
    // );
  }

  // ngOnDestroy() {
  //   this.authSubscription.unsubscribe();
  // }
}

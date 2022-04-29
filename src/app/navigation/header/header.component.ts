import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';
import { AuthService } from './../../auth/servicies/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth$!: Observable<boolean>;
  authSubscription!: Subscription;
  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) {}

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
    // this.authSubscription = this.authService.authChange.subscribe(
    //   (authStatus) => {
    //     this.isAuth = authStatus;
    //   }
    // );
  }

  // ngOnDestroy() {
  //   this.authSubscription.unsubscribe();
  // }
}

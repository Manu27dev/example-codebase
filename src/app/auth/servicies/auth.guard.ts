import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
// import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    // private authService: AuthService,
    private router: Router,
    private store: Store<fromRoot.State>
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // return this.store.select(fromRoot.getIsAuth).pipe(take(1));
    return this.store.select(fromRoot.getIsAuth);
    // if (this.authService.isAuth()) {
    //   return true;
    // } else {
    //   this.router.navigateByUrl('/login');
    //   return false;
    // }
  }

  canLoad(route: Route) {
    // return this.authService.isAuth()
    //   ? true
    //   : this.router.navigateByUrl('/login');
    return this.store.select(fromRoot.getIsAuth);
  }
}

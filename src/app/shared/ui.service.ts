import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  // loadingStateChanged = new Subject<boolean>();
  constructor(private snackBar: MatSnackBar) {}

  showSnackbar(message: string, action: undefined, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }
}

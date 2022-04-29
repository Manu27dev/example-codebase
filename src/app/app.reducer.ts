// export interface State {
//   isLoading: boolean;
// }

// const initialState: State = {
//   isLoading: false,
// };

// export function appReducer(state = initialState, action: any) {
//   switch (action.type) {
//     case 'START_LOADING':
//       return {
//         isLoading: true,
//       };
//     case 'STOP_LOADING':
//       return {
//         isLoading: false,
//       };
//     default:
//       return state;
//   }
// }

import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { UiActions } from './shared/ui.actions';
import * as fromUi from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';

export interface State {
  ui: fromUi.State;
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUi.uiReducer as any,
  auth: fromAuth.authReducer as any,
};

export const getUiState = createFeatureSelector<fromUi.State>('ui');
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);

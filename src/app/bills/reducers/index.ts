import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';
  import * as fromCollection from './collection.reducer';
  import * as fromRoot from '../../reducers';

  export interface BillsState {
    collection: fromCollection.State;
  }

  export interface State extends fromRoot.State {
    bills: BillsState;
  }

  export const reducers: ActionReducerMap<BillsState> = {
    collection: fromCollection.reducer,
  };

  /**
   * A selector function is a map function factory. We pass it parameters and it
   * returns a function that maps from the larger state tree into a smaller
   * piece of state. This selector simply selects the `bills` state.
   *
   * Selectors are used with the `select` operator.
   *
   * ```ts
   * class MyComponent {
   *   constructor(state$: Observable<State>) {
   *     this.billsState$ = state$.pipe(select(getBillsState));
   *   }
   * }
   * ```
   */

  /**
   * The createFeatureSelector function selects a piece of state from the root of the state object.
   * This is used for selecting feature states that are loaded eagerly or lazily.
   */
  export const getBillsState = createFeatureSelector<BillsState>('bills');

import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';
  import * as fromCollection from './collection.reducer';
  import * as fromBills from './bills';
  import * as fromRoot from '../../reducers';

  export interface BillsState {
    collection: fromCollection.State;
    bills: fromBills.State;
  }

  export interface State extends fromRoot.State {
    bills: BillsState;
  }

  export const reducers: ActionReducerMap<BillsState> = {
    collection: fromCollection.reducer,
    bills: fromBills.reducer
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

  /**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them usable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */
export const getBillEntitiesState = createSelector(
  getBillsState,
  state => state.bills
);

export const getSelectedBillId = createSelector(
  getBillEntitiesState,
  fromBills.getSelectedId
);

/**
 * Adapters created with @ngrx/entity generate
 * commonly used selector functions including
 * getting all ids in the record set, a dictionary
 * of the records by id, an array of records and
 * the total number of records. This reduces boilerplate
 * in selecting records from the entity state.
 */
export const {
  selectIds: getBillIds,
  selectEntities: getBillEntities,
  selectAll: getAllBills,
  selectTotal: getTotalBills,
} = fromBills.adapter.getSelectors(getBillEntitiesState);

export const getSelectedBill = createSelector(
  getBillEntities,
  getSelectedBillId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

export const getCollectionState = createSelector(
  getBillsState,
  (state: BillsState) => state.collection
);

export const getCollectionLoaded = createSelector(
  getCollectionState,
  fromCollection.getLoaded
);
export const getCollectionLoading = createSelector(
  getCollectionState,
  fromCollection.getLoading
);
export const getCollectionExpendElement = createSelector(
  getCollectionState,
  fromCollection.getExpandedElement
);
export const getCollectionSortingBills = createSelector(
  getCollectionState,
  fromCollection.getSortBill
);
export const getCollectionBillIds = createSelector(
  getCollectionState,
  fromCollection.getIds
);

export const getBillCollection = createSelector(
  getBillEntities,
  getCollectionBillIds,
  (entities, ids) => {
    return ids.map(id => entities[id]);
  }
);

export const isSelectedBillInCollection = createSelector(
  getCollectionBillIds,
  getSelectedBillId,
  (ids, selected) => {
    return ids.indexOf(selected) > -1;
  }
);

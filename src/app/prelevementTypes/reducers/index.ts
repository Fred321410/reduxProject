import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';
  import * as fromCollection from './collection.reducer';
  import * as fromRoot from '../../reducers';

  export interface PrelevementTypesState {
    collection: fromCollection.State;
  }

  export interface State extends fromRoot.State {
    prelevementTypes: PrelevementTypesState;
  }

  export const reducers: ActionReducerMap<PrelevementTypesState> = {
    collection: fromCollection.reducer
  };

  export const getPrelevementTypesState = createFeatureSelector<PrelevementTypesState>('prelevementTypes');


export const getCollectionState = createSelector(
  getPrelevementTypesState,
  (state: PrelevementTypesState) => state.collection
);

export const getCollectionPrelevementTypes = createSelector(
  getCollectionState,
  fromCollection.getPrelevementTypes
);



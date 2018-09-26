import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';
  import * as fromCollection from './collection.reducer';
  import * as fromType from './types';
  import * as fromRoot from '../../reducers';

  export interface TypesState {
    collection: fromCollection.State;
    types: fromType.State;
  }

  export interface State extends fromRoot.State {
    types: TypesState;
  }

  export const reducers: ActionReducerMap<TypesState> = {
    collection: fromCollection.reducer,
    types: fromType.reducer
  };

  export const getTypesState = createFeatureSelector<TypesState>('types');

export const getTypeEntitiesState = createSelector(
  getTypesState,
  state => state.types
);

export const getSelectedTypeId = createSelector(
  getTypeEntitiesState,
  fromType.getSelectedId
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
  selectIds: getTypeIds,
  selectEntities: getTypeEntities,
  selectAll: getAllTypes,
  selectTotal: getTotalTypes,
} = fromType.adapter.getSelectors(getTypeEntitiesState);


export const getCollectionState = createSelector(
  getTypesState,
  (state: TypesState) => state.collection
);

export const getCollectionLoaded = createSelector(
  getCollectionState,
  fromCollection.getLoaded
);
export const getCollectionLoading = createSelector(
  getCollectionState,
  fromCollection.getLoading
);

export const getCollectionTypeIds = createSelector(
  getCollectionState,
  fromCollection.getIds
);
export const getTypeCollection = createSelector(
  getTypeEntities,
  getCollectionTypeIds,
  (entities, ids) => {
    return ids.map(id => entities[id]);
  }
);


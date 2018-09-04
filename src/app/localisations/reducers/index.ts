import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';
  import * as fromCollection from './collection.reducer';
  import * as fromLocalisation from './localiations';
  import * as fromRoot from '../../reducers';

  export interface LocalisationsState {
    collection: fromCollection.State;
    localisations: fromLocalisation.State;
  }

  export interface State extends fromRoot.State {
    localisations: LocalisationsState;
  }

  export const reducers: ActionReducerMap<LocalisationsState> = {
    collection: fromCollection.reducer,
    localisations: fromLocalisation.reducer
  };

  export const getLocalisationsState = createFeatureSelector<LocalisationsState>('localisations');

export const getLocalisationEntitiesState = createSelector(
  getLocalisationsState,
  state => state.localisations
);

export const getSelectedLocalisationId = createSelector(
  getLocalisationEntitiesState,
  fromLocalisation.getSelectedId
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
  selectIds: getLocalisationIds,
  selectEntities: getLocalisationEntities,
  selectAll: getAllLocalisations,
  selectTotal: getTotalLocalisations,
} = fromLocalisation.adapter.getSelectors(getLocalisationEntitiesState);


export const getCollectionState = createSelector(
  getLocalisationsState,
  (state: LocalisationsState) => state.collection
);

export const getCollectionLoaded = createSelector(
  getCollectionState,
  fromCollection.getLoaded
);
export const getCollectionLoading = createSelector(
  getCollectionState,
  fromCollection.getLoading
);

export const getCollectionLocalisationIds = createSelector(
  getCollectionState,
  fromCollection.getIds
);
export const getCollectionColsNumber = createSelector(
  getCollectionState,
  fromCollection.getColsNumber
);
export const getLocalisationCollection = createSelector(
  getLocalisationEntities,
  getCollectionLocalisationIds,
  (entities, ids) => {
    return ids.map(id => entities[id]);
  }
);


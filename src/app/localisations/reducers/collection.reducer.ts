import {
  CollectionActionTypes,
  CollectionActions,
} from '../actions/collections';

export interface State {
  loaded: boolean;
  loading: boolean;
  ids: number[];
}

const initialState: State = {
  loaded: false,
  loading: false,
  ids: [],
};

export function reducer(
  state = initialState,
  action: CollectionActions
): State {
  switch (action.type) {
    case CollectionActionTypes.Load: {
      return {
        ...state,
        loading: true,
      };
    }
    case CollectionActionTypes.LoadSuccess: {
      console.log(action);
      return {
        loaded: true,
        loading: false,
        ids: action.payload.map(localisation => localisation.id),
      };
    }
    case CollectionActionTypes.AddLocalisationSuccess:
    case CollectionActionTypes.RemoveLocalisationFail:
    case CollectionActionTypes.RemoveLocalisationSuccess:
    case CollectionActionTypes.AddLocalisationFail:

    default: {
      return state;
    }
  }
}

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getIds = (state: State) => state.ids;


import {
  CollectionActionTypes,
  CollectionActions,
} from '../actions/collections';

export interface State {
  loaded: boolean;
  loading: boolean;
  ids: string[];
  colsNumber: number;
}

const initialState: State = {
  loaded: false,
  loading: false,
  ids: [],
  colsNumber: 2
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
      return {
        ...state,
        loaded: true,
        loading: false,
        ids: action.payload.map(localisation => localisation.id),
      };
    }
    case CollectionActionTypes.ReSize: {
      if (action.payload <= 448) {
        return {
          ...state,
          colsNumber: 1,
        };
      } else {
        return {
          ...state,
          colsNumber: (action.payload % 448 > 60) ? Math.trunc(action.payload / 448) : Math.trunc(action.payload / 448) - 1,
        };
      }
    }
    case CollectionActionTypes.AddLocalisationSuccess: {
      if (state.ids.indexOf(action.payload.id) > -1) {
        return state;
      }

      return {
        ...state,
        ids: [...state.ids, action.payload.id],
      };
    }
    case CollectionActionTypes.RemoveLocalisationFail:
    case CollectionActionTypes.RemoveLocalisationSuccess:
    case CollectionActionTypes.AddLocalisationFail: {
      return {
        ...state,
        ids: state.ids.filter(id => id !== action.payload.id),
      };
    }

    default: {
      return state;
    }
  }
}

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getIds = (state: State) => state.ids;

export const getColsNumber = (state: State) => state.colsNumber;


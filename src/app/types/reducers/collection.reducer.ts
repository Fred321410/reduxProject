import {
  CollectionActionTypes,
  CollectionActions,
} from '../actions/collections';
import {Type} from '../models/type';

export interface State {
  loaded: boolean;
  loading: boolean;
  ids: string[];
  expendPanel: Type;
}

const initialState: State = {
  loaded: false,
  loading: false,
  ids: [],
  expendPanel: null
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
        ids: action.payload.map(type => type.id)
      };
    }
    case CollectionActionTypes.AddTypeSuccess: {
      if (state.ids.indexOf(action.payload.id) > -1) {
        return state;
      }

      return {
        ...state,
        ids: [...state.ids, action.payload.id],
      };
    }
    case CollectionActionTypes.RemoveTypeFail:
    case CollectionActionTypes.RemoveTypeSuccess:
    case CollectionActionTypes.AddTypeFail: {
      return {
        ...state,
        ids: state.ids.filter(id => id !== action.payload.id),
      };
    }
    case CollectionActionTypes.ExpendTypePanel: {
      return {
        ...state,
        expendPanel: action.payload
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


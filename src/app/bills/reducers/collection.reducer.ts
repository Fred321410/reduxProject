import {
  CollectionActionTypes,
  CollectionActions,
} from './../actions/collections';
import { Bill } from '../models/bill';

export interface State {
  loaded: boolean;
  loading: boolean;
  ids: string[];
  expandedElement: Bill;
}

const initialState: State = {
  loaded: false,
  loading: false,
  ids: [],
  expandedElement: null
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
        loaded: true,
        loading: false,
        ids: action.payload.map(bill => bill.id),
        expandedElement: null
      };
    }

    case CollectionActionTypes.AddBillSuccess:
    case CollectionActionTypes.RemoveBillFail: {
      if (state.ids.indexOf(action.payload.id) > -1) {
        return state;
      }

      return {
        ...state,
        ids: [...state.ids, action.payload.id],
      };
    }

    case CollectionActionTypes.RemoveBillSuccess:
    case CollectionActionTypes.AddBillFail: {
      return {
        ...state,
        ids: state.ids.filter(id => id !== action.payload.id),
      };
    }
    case CollectionActionTypes.ExpendBillRow: {
      return {
        ...state,
        expandedElement: action.payload,
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

export const getExpandedElement = (state: State) => state.expandedElement;

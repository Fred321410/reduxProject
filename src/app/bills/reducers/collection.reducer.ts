import {
  CollectionActionTypes,
  CollectionActions,
} from '../actions/collections';
import { Bill } from '../models/bill';
import {SortBill} from '../models/sortBill';

export interface State {
  loaded: boolean;
  loading: boolean;
  ids: string[];
  expandedElement: Bill;
  sortBill: SortBill;
  stickyHeader: boolean;
}

const initialState: State = {
  loaded: false,
  loading: false,
  ids: [],
  expandedElement: null,
  sortBill: {direction: 'asc', active: 'date'},
  stickyHeader: false
};

export function reducer(
  state = initialState,
  action: CollectionActions
): State {
  switch (action.type) {
    case CollectionActionTypes.Load: {
      return {
        ...state,
        stickyHeader: true,
        loading: true,
      };
    }

    case CollectionActionTypes.LoadSuccess: {
      return {
        ...state,
        loaded: true,
        loading: false,
        ids: action.payload.map(bill => bill.id),
        expandedElement: null
      };
    }

    case CollectionActionTypes.AddBillSuccess: {
      if (state.ids.indexOf(action.payload.id) > -1) {
        return {
          ...state,
          stickyHeader: true,
        };
      }

      return {
        ...state,
        stickyHeader: true,
        ids: [...state.ids, action.payload.id],
      };
    }

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
        stickyHeader: true,
        ids: state.ids.filter(id => id !== action.payload.id),
      };
    }
    case CollectionActionTypes.ExpendBillRow: {
      return {
        ...state,
        expandedElement: action.payload,
      };
    }
    case CollectionActionTypes.ChangeStickyHeaders: {
      return {
        ...state,
        stickyHeader: action.payload,
      };
    }
    case CollectionActionTypes.SortingBills: {
      return {
        ...state,
        sortBill: action.payload,
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

export const getSortBill = (state: State) => state.sortBill;

export const getStickyHeaders = (state: State) => state.stickyHeader;

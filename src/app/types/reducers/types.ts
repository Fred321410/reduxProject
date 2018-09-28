import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import {
  CollectionActions,
  CollectionActionTypes,
} from '../actions/collections';
import { TypeActionTypes, TypeActions } from '../actions/types';
import { Type } from '../models/type';

/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is extended to include
 * any additional interface properties.
 */
export interface State extends EntityState<Type> {
  selectedTypeId: string | null;
}

/**
 * createEntityAdapter creates an object of many helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record id selector function and
 * a sortComparer option which is set to a compare
 * function if the records are to be sorted.
 */
export const adapter: EntityAdapter<Type> = createEntityAdapter<Type>({
  selectId: (book: Type) => book.id,
  sortComparer: false,
});

/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialState: State = adapter.getInitialState({
  selectedTypeId: null,
});

export function reducer(
  state = initialState,
  action: TypeActions | CollectionActions
): State {
  switch (action.type) {
    case TypeActionTypes.SearchComplete:
    case CollectionActionTypes.LoadSuccess: {
      /**
       * The addMany function provided by the created adapter
       * adds many records to the entity dictionary
       * and returns a new state including those records. If
       * the collection is to be sorted, the adapter will
       * sort each record upon entry into the sorted array.
       */
      return adapter.addMany(action.payload, {
        ...state,
        selectedTypeId: state.selectedTypeId,
      });
    }
    case TypeActionTypes.AddSousTypeSuccess: {
      return adapter.updateOne(action.payload.type, state);
    }
    case TypeActionTypes.Load: {
      /**
       * The addOne function provided by the created adapter
       * adds one record to the entity dictionary
       * and returns a new state including that records if it doesn't
       * exist already. If the collection is to be sorted, the adapter will
       * insert the new record into the sorted array.
       */
      return adapter.addOne(action.payload, {
        ...state,
        selectedTypeId: state.selectedTypeId,
      });
    }

    case TypeActionTypes.Select: {
      return {
        ...state,
        selectedTypeId: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const getSelectedId = (state: State) => state.selectedTypeId;

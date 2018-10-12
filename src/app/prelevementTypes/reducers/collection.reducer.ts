import {
  CollectionActionTypes,
  CollectionActions,
} from '../actions/collections';

export interface State {
  prelevementTypes: string[];
}

const initialState: State = {
  prelevementTypes: []
};

export function reducer(
  state = initialState,
  action: CollectionActions
): State {
  switch (action.type) {
    case CollectionActionTypes.LoadSuccess: {
      return {
        ...state,
        prelevementTypes: action.payload
      };
    }
    default: {
      return state;
    }
  }
}

export const getPrelevementTypes = (state: State) => state.prelevementTypes;



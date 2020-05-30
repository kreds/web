import { Store } from 'redux';

import { ActionModel } from '../types/Models';
import { ActionType } from '../types/ActionType';

export interface StateType {
  authenticated: boolean;
}

let initialState: StateType = {
  authenticated: false,
};

export type StoreType = Store<StateType, ActionModel>;

function applicationState(state = initialState, action: ActionModel) {
  const newState = { ...state };

  switch (action.type) {
    case ActionType.SET_AUTHENTICATED:
      newState.authenticated = action.value as boolean;
      break;
  }

  return newState;
}

export default applicationState;

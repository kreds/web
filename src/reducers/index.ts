import { Store } from 'redux';

import { ActionModel } from '../types/Models';
import { ActionType } from '../types/ActionType';
import { User } from '../types/models/User';

export interface StateType {
  authenticated: boolean;
  currentUser?: User;
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
    case ActionType.SET_CURRENT_USER:
      newState.currentUser = action.value as User;
      break;
  }

  return newState;
}

export default applicationState;

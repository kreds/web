import { ActionModel } from '../types/Models';
import { ActionType } from '../types/ActionType';
import { User } from '../types/models/User';

export function setAuthenticatedAction(authenticated: boolean): ActionModel {
  return {
    type: ActionType.SET_AUTHENTICATED,
    value: authenticated,
  };
}

export function setCurrentUserAction(user?: User): ActionModel {
  return {
    type: ActionType.SET_CURRENT_USER,
    value: user,
  };
}

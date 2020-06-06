import { ActionModel } from '../types/Models';
import { ActionType } from '../types/ActionType';

export function setAuthenticatedAction(authenticated: boolean): ActionModel {
  return {
    type: ActionType.SET_AUTHENTICATED,
    value: authenticated,
  };
}

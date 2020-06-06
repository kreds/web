import { put, takeEvery, call } from 'redux-saga/effects';

import { ActionModel } from '../types/Models';
import { ActionType } from '../types/ActionType';
import { currentUser } from '../services/Authentication';
import { setCurrentUserAction, setAuthenticatedAction } from '../actions/state';
import { getToken } from '../helpers/token';

function* initializeAuthentication() {
  if (getToken()) {
    const res = yield call(() => currentUser());
    if (res.isAuthenticated) {
      yield put(setAuthenticatedAction(true));
      yield put(setCurrentUserAction(res.user));
    }
  }
}

function* onAuthenticatedChange(action: ActionModel) {
  if (action.value !== true) {
    return;
  }

  const res = yield call(() => currentUser());
  yield put(setCurrentUserAction(res.user));
}

export default function* root(dispatch: (action: any) => void) {
  yield initializeAuthentication();
  yield takeEvery(ActionType.SET_AUTHENTICATED, onAuthenticatedChange);
}

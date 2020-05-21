import { put, takeEvery, select, call } from 'redux-saga/effects';

import { ActionModel } from '../types/Models';
import { ActionType } from '../types/ActionType';
import { StateType } from '../reducers';

export default function* root(dispatch: (action: any) => void) {}

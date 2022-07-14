import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { ActionStatus, ActionType } from '../store/types';
import type { RootState } from '../store/store';

export interface PlayerActionState {
  status: ActionStatus;
  action?: ActionType;
  endTime?: string;
}

export const playerActionSlice = createSlice({
  name: 'playerActionSlice',
  initialState: {
    status: ActionStatus.IDLE,
    action: undefined,
    endTime: undefined,
  } as PlayerActionState,
  reducers: {
    startAction: (
      state: PlayerActionState,
      action: PayloadAction<ActionType>
    ) => {
      state.status = ActionStatus.RUNNING;
      state.action = action.payload;
      state.endTime = moment().add(10, 'seconds').utc().format();
    },
    endAction: (state) => {
      state.status = ActionStatus.IDLE;
      state.action = undefined;
      state.endTime = undefined;
    },
  },
  extraReducers: {},
});

export const { startAction, endAction } = playerActionSlice.actions;

export const currentPlayerActionState = (state: RootState) =>
  state.playerAction as PlayerActionState;

export default playerActionSlice.reducer;

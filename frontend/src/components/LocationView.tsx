import React from 'react';
import {
  currentPlayerActionState,
  endAction,
  startAction,
} from '../actions/playerActionSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { ActionType } from '../store/types';

export default function LocationView() {
  const playerActionState = useAppSelector(currentPlayerActionState);

  const dispatch = useAppDispatch();

  return (
    <div className="location-view">
      <div>
        <div className="location-view__image">Image</div>
        <div className="location-view__counter">
          <p>status: {playerActionState.status}</p>
          <p>action: {playerActionState.action}</p>
          <p>endTime: {playerActionState.endTime}</p>
        </div>
        <div className="location-view__actions">
          <button
            type="button"
            onClick={() => dispatch(startAction(ActionType.WOODCUTTING))}>
            Start woodcutting
          </button>
          <button type="button" onClick={() => dispatch(endAction())}>
            Stop
          </button>
        </div>
      </div>
    </div>
  );
}

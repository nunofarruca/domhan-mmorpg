import React, { useState } from 'react';
import moment from 'moment';
import { currentPlayerActionState, endAction, startAction } from '../actions/playerActionSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { ActionStatus, ActionType } from '../store/types';

export default function LocationView() {
  const [countdown, setCountdown] = useState<number | undefined>();
  const dispatch = useAppDispatch();
  const playerActionState = useAppSelector(currentPlayerActionState);

  function updateCountdown() {
    if (playerActionState?.status === ActionStatus.RUNNING) {
      const remainingSeconds = moment(playerActionState?.endTime).diff(moment(), 'seconds');

      setCountdown(remainingSeconds);

      if (remainingSeconds <= 0) {
        dispatch(endAction());
      }
    } else if (countdown && playerActionState?.status === ActionStatus.IDLE) {
      setCountdown(undefined);
    }
  }

  React.useEffect(() => {
    updateCountdown();
    const intervalRef = setInterval(() => updateCountdown(), 1000);
    return () => clearInterval(intervalRef);
  }, [playerActionState]);

  return (
    <div className="location-view">
      <div>
        <div className="location-view__image">Image</div>
        <div className="location-view__counter">
          <p>status: {playerActionState.status}</p>
          <p>action: {playerActionState.action}</p>
          <p>endTime: {playerActionState.endTime}</p>
          <p>countdown: {countdown || '---'}</p>
        </div>
        <div className="location-view__actions">
          <button type="button" onClick={() => dispatch(startAction(ActionType.WOODCUTTING))}>
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

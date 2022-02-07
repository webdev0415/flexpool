import React from 'react';
import { useDispatch } from 'react-redux';
import { useReduxState } from 'src/rdx/useReduxState';
import { poolCoinsGet } from './poolCoints.actions';

export const usePoolCoins = () => {
  const poolCoinsState = useReduxState('poolCoins');
  const d = useDispatch();

  React.useEffect(() => {
    if (
      !poolCoinsState.data &&
      !poolCoinsState.isLoading &&
      !poolCoinsState.error
    ) {
      d(poolCoinsGet());
    }
  }, [poolCoinsState.data, poolCoinsState.isLoading, d, poolCoinsState.error]);

  return poolCoinsState;
};

//

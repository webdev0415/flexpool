import { AnyAction, Reducer } from 'redux';
import { DefaultArrayState, ReducerOptions } from './types';
import { defaultReducerArrayState } from './defaultReducerState';

/**
 * Expecting the payload to be
 * {
 *   data: [],
 *   pagination: Pagination
 * }
 * @param initialState
 * @param options
 */

export function createGetWithPaginationReducer<D>(
  initialState: DefaultArrayState<D> = defaultReducerArrayState,
  options: ReducerOptions = {}
) {
  const getReducer: Reducer<DefaultArrayState<D>, AnyAction> = (
    state = initialState,
    action
  ) => {
    const { flushOnError = false, flushOnStart = false } = options;

    if (action.type.endsWith('GET_START')) {
      return {
        ...state,
        isLoading: true,
        lastGetStartAt: new Date(),
        counterGet: state.counterGet + 1,
        data: flushOnStart ? initialState.data : state.data,
        error: null,
      };
    }

    if (action.type.endsWith('GET_ERROR')) {
      return {
        ...state,
        isLoading: false,
        data: flushOnError ? initialState.data : state.data,
        error: action.payload,
      };
    }

    if (action.type.endsWith('GET_SUCCESS')) {
      return {
        ...state,
        isLoading: false,
        lastGetSuccessAt: new Date(),
        ...action.payload,
      };
    }

    return state;
  };

  return getReducer;
}

export default createGetWithPaginationReducer;

import { VerifiableInputData, VerifiableInputAction, verifiableInputActionTypes } from "../../types/verifiable-input-types";

const initialState : VerifiableInputData = {
  value: '',
  status: 'blank',
  error: null
}

export const verifiableInputReducer = (state = initialState, action: VerifiableInputAction): VerifiableInputData => {
  switch (action.type) {
    case verifiableInputActionTypes.CLEAR_INPUT:
      return {value: '', status: 'blank', error: null};
    case verifiableInputActionTypes.UPDATE_INPUT:
      return {value: action.value, status: 'typing', error: null};
    case verifiableInputActionTypes.FETCH_INPUT:
      return {...state, status: 'loading'};
    case verifiableInputActionTypes.FETCH_SUCCESS:
      return {...state, status: 'verified'};
    case verifiableInputActionTypes.FETCH_ERROR:
      return {...state, status: 'failed', error: action.message}
    default:
      return state;
  }
}
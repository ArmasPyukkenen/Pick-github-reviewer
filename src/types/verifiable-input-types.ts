
export enum verifiableInputActionTypes {
  CLEAR_INPUT = "CLEAR_INPUT",
  UPDATE_INPUT = "UPDATE_INPUT",
  FETCH_INPUT = "FETCH_INPUT",
  FETCH_SUCCESS = "FETCH_SUCCESS",
  FETCH_ERROR = "FETCH_ERROR"
}

interface clearInputAction {
  type: verifiableInputActionTypes.CLEAR_INPUT
}

interface updateInputAction {
  type: verifiableInputActionTypes.UPDATE_INPUT,
  value: string
}

interface fetchInputAction {
  type: verifiableInputActionTypes.FETCH_INPUT
}

interface fetchSuccessAction {
  type: verifiableInputActionTypes.FETCH_SUCCESS
}

interface fetchErrorAction {
  type: verifiableInputActionTypes.FETCH_ERROR,
  message: string | null
}

export type VerifiableInputAction = clearInputAction | updateInputAction | fetchInputAction | fetchSuccessAction | fetchErrorAction;

export interface VerifiableInputData {
  value: string;
  status: 'blank' | 'typing' | 'loading' | 'verified' | 'failed';
  error: string | null;
}
import { SettingsState, SettingsAction, SettingsActionTypes } from "../../types/settings-types";
import { verifiableInputActionTypes } from "../../types/verifiable-input-types";
import { verifiableInputReducer } from "./verifiable-input-reducer";

const initialState: SettingsState = {
  currentUser: {
    value: '',
    status: 'blank',
    error: null
  },
  repoName: {
    value: '',
    status: 'blank',
    error: null
  },
  blacklist: {
    candidate: {
      value: '',
      status: 'blank',
      error: null
    },
    list: []
  },
  ok: false
}

const validateUpdatedState = (updatedState: SettingsState): SettingsState => {
  return settingsReducer(updatedState, {type: SettingsActionTypes.VALIDATE_SETTINGS});
}

export const settingsReducer = (state = initialState, action: SettingsAction): SettingsState => {
  switch (action.type) {
    case SettingsActionTypes.REDUCE_CURRENT_USER:
      return validateUpdatedState({...state, currentUser: verifiableInputReducer(state.currentUser, action.subAction)});
    case SettingsActionTypes.REDUCE_REPO_NAME:
      return validateUpdatedState({...state, repoName: verifiableInputReducer(state.repoName, action.subAction)});
    case SettingsActionTypes.REDUCE_BLACKLIST_CANDIDATE:
      return {...state, blacklist: {
        ...state.blacklist, 
        candidate: verifiableInputReducer(state.blacklist.candidate, action.subAction)
      }};
    case SettingsActionTypes.ADD_BLACKLIST_USER:
      return {...state, blacklist: {
        candidate: verifiableInputReducer(state.blacklist.candidate, {type:verifiableInputActionTypes.CLEAR_INPUT}), 
        list: [...state.blacklist.list, state.blacklist.candidate.value]
      }};
    case SettingsActionTypes.REMOVE_BLACKLIST_USER:
      return {...state, blacklist: {
        candidate: state.blacklist.candidate, 
        list: state.blacklist.list.filter(name => name != action.blacklistName)
      }}
    case SettingsActionTypes.VALIDATE_SETTINGS:
      const areSettingsValid = state.currentUser.status === 'verified' && state.repoName.status === 'verified';
      const doesOkPropertyMatch = state.ok === areSettingsValid;
      return doesOkPropertyMatch ? state : {...state, ok: areSettingsValid};
    default: 
      return state;
  }
}
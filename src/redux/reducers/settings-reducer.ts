import { SettingsState, SettingsAction, SettingsActionTypes } from "../../types/settings-types";

const initialState: SettingsState = {
  currentUser: '',
  repoName: '',
  blacklist: {candidate: '', list: []}
}

export const settingsReducer = (state = initialState, action: SettingsAction): SettingsState => {
  switch (action.type) {
    case SettingsActionTypes.UPDATE_CURRENT_USER:
      return {...state, currentUser: action.userName};
    case SettingsActionTypes.UPDATE_REPO_NAME:
      return {...state, repoName: action.repoName};
    case SettingsActionTypes.UPDATE_BLACKLIST_CANDIDATE:
      return {...state, blacklist: {
        ...state.blacklist, 
        candidate: action.blacklistCandidateName
      }};
    case SettingsActionTypes.ADD_BLACKLIST_USER:
      return {...state, blacklist: {
        candidate: '', 
        list: [...state.blacklist.list, state.blacklist.candidate]
      }};
    case SettingsActionTypes.REMOVE_BLACKLIST_USER:
      return {...state, blacklist: {
        candidate: state.blacklist.candidate, 
        list: state.blacklist.list.filter(name => name != action.blacklistName)
      }}
    default: 
      return state;
  }
}
import { Dispatch } from "redux"
import { SettingsAction, SettingsActionTypes } from "../../types/settings-types"

export const updateCurrentUser = (name: string): SettingsAction => {
  /* return (dispatch: Dispatch<SettingsAction>) => {
    dispatch({type: SettingsActionTypes.UPDATE_CURRENT_USER, userName: name})
  } */
  return {type: SettingsActionTypes.UPDATE_CURRENT_USER, userName: name};
}

export const updateRepoName = (name: string): SettingsAction => {
  return {type: SettingsActionTypes.UPDATE_REPO_NAME, repoName: name};
}

export const updateBlacklistCandidate = (name: string): SettingsAction => {
  return {type: SettingsActionTypes.UPDATE_BLACKLIST_CANDIDATE, blacklistCandidateName: name};
}

export const addBlacklistUser = (): SettingsAction => {
  return {type: SettingsActionTypes.ADD_BLACKLIST_USER};
}

export const removeBlacklistUser = (name: string): SettingsAction => {
  return {type: SettingsActionTypes.REMOVE_BLACKLIST_USER, blacklistName: name};
}
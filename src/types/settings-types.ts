export enum SettingsActionTypes {
  UPDATE_CURRENT_USER = "UPDATE_CURRENT_USER",
  UPDATE_REPO_NAME = "UPDATE_REPO_NAME",
  UPDATE_BLACKLIST_CANDIDATE = "UPDATE_BLACKLIST_CANDIDATE",
  ADD_BLACKLIST_USER = "ADD_BLACKLIST_USER",
  REMOVE_BLACKLIST_USER = "REMOVE_BLACKLIST_USER",
}

interface updateCurrentUserAction {
  type: SettingsActionTypes.UPDATE_CURRENT_USER;
  userName: string;
}

interface updateRepoNameAction {
  type: SettingsActionTypes.UPDATE_REPO_NAME;
  repoName: string
}

interface updateBlacklistCandidateAction {
  type: SettingsActionTypes.UPDATE_BLACKLIST_CANDIDATE;
  blacklistCandidateName: string
}

interface addBlacklistUserAction {
  type: SettingsActionTypes.ADD_BLACKLIST_USER;
}

interface removeBlacklistUserAction {
  type: SettingsActionTypes.REMOVE_BLACKLIST_USER;
  blacklistName: string
}

export type SettingsAction = updateCurrentUserAction | updateRepoNameAction | updateBlacklistCandidateAction | addBlacklistUserAction | removeBlacklistUserAction;

export interface SettingsState {
  currentUser: string;
  repoName: string;
  blacklist: {
    candidate: string;
    list: string[];
  }
}


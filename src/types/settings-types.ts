import { VerifiableInputData, VerifiableInputAction } from "./verifiable-input-types";

export enum SettingsActionTypes {
  SET_SETTINGS = "SET_SETTINGS",
  ADD_BLACKLIST_USER = "ADD_BLACKLIST_USER",
  REMOVE_BLACKLIST_USER = "REMOVE_BLACKLIST_USER",
  REDUCE_CURRENT_USER = "REDUCE_CURRENT_USER",
  REDUCE_REPO_NAME = "REDUCE_REPO_NAME",
  REDUCE_BLACKLIST_CANDIDATE = "REDUCE_BLACKLIST_CANDIDATE",
  VALIDATE_SETTINGS = "VALIDATE_SETTINGS",
  SET_CONTRIBUTORS_PAGE_COUNT = "SET_CONTRIBUTORS_PAGE_COUNT"
}


interface setSettingsAction {
  type: SettingsActionTypes.SET_SETTINGS,
  settings: SettingsState
}

interface reduceCurrentUserAction {
  type: SettingsActionTypes.REDUCE_CURRENT_USER;
  subAction: VerifiableInputAction;
}

interface reduceRepoNameAction {
  type: SettingsActionTypes.REDUCE_REPO_NAME;
  subAction: VerifiableInputAction;
}

interface reduceBlacklistCandidateAction {
  type: SettingsActionTypes.REDUCE_BLACKLIST_CANDIDATE;
  subAction: VerifiableInputAction;
}

interface addBlacklistUserAction {
  type: SettingsActionTypes.ADD_BLACKLIST_USER;
}

interface removeBlacklistUserAction {
  type: SettingsActionTypes.REMOVE_BLACKLIST_USER;
  blacklistName: string
}

interface validateSettingsAction {
  type: SettingsActionTypes.VALIDATE_SETTINGS;
}

interface setContributorsPageCount {
  type: SettingsActionTypes.SET_CONTRIBUTORS_PAGE_COUNT;
  count: number | null;
}

export type SettingsAction = setSettingsAction | reduceCurrentUserAction | reduceRepoNameAction 
  | reduceBlacklistCandidateAction | addBlacklistUserAction | removeBlacklistUserAction 
  | validateSettingsAction | setContributorsPageCount;

export interface SettingsState {
  currentUser: VerifiableInputData;
  repoName: VerifiableInputData;
  blacklist: {
    candidate: VerifiableInputData;
    list: string[];
  };
  contributorsPagesCount: number | null;
  ok: boolean;
}

import { Dispatch } from "redux"
import { SettingsAction, SettingsActionTypes } from "../../types/settings-types"
import { VerifiableInputAction, verifiableInputActionTypes } from "../../types/verifiable-input-types"

//WRAPPERS

const wrapCurrentUserSubAction = (subAction: VerifiableInputAction): SettingsAction => {
  return {type: SettingsActionTypes.REDUCE_CURRENT_USER, subAction};
}
const wrapRepoNameSubAction = (subAction: VerifiableInputAction): SettingsAction => {
  return {type: SettingsActionTypes.REDUCE_REPO_NAME, subAction};
}
const wrapBlacklistCandidateSubAction = (subAction: VerifiableInputAction): SettingsAction => {
  return {type: SettingsActionTypes.REDUCE_BLACKLIST_CANDIDATE, subAction};
}

//UPDATE VALUE ACTION CREATORS

const updateValue = (value: string, wrapper: any) => {
  if (value === '') {
    return wrapper({type: verifiableInputActionTypes.CLEAR_INPUT})
  }
  return wrapper({type: verifiableInputActionTypes.UPDATE_INPUT, value});
}

export const updateCurrentUser = (value: string): SettingsAction => {
  return updateValue(value, wrapCurrentUserSubAction);
}

export const updateRepoName = (value: string): SettingsAction => {
  return updateValue(value, wrapRepoNameSubAction);
}

export const updateBlacklistCandidate = (value: string): SettingsAction => {
  return updateValue(value, wrapBlacklistCandidateSubAction);
}

//FETCH VALUE ACTION CREATORS

//URL CONSTRUCTORS
const searchUserUrlConstructor = (login: string) : string => `https://api.github.com/users/${login}`;
const searchRepoUrlConstructor = (repo: string) : string => `https://api.github.com/search/repositories?q=${repo}`;

//RESPONSE VERIFIERS
const searchUserResponseValueGetter = (data: any, value: string) : boolean => data.login === value;
const searchRepoResponseValueGetter = (data: any, value: string) : boolean => data.total_count > 0 && data.items[0]["full_name"] === value;

//Template Async Action Creator
const fetchValue = (value: string, wrapper: any, urlConstructor: any, responseValueGetter: any, valueName='value') => {
  return async (dispatch: Dispatch<SettingsAction>) => {
    try {
      dispatch(wrapper({type: verifiableInputActionTypes.FETCH_INPUT}));      
      const response = await fetch(urlConstructor(value));
      const data = await response.json();
      if(response.ok && responseValueGetter(data, value)) {
        dispatch(wrapper({type: verifiableInputActionTypes.FETCH_SUCCESS}));
      } else {
        if(response.ok) {
          dispatch(wrapper({type: verifiableInputActionTypes.FETCH_ERROR, message: `Didn't find any matches. Please enter a correct ${valueName}`}))
        } else {
          dispatch(wrapper({type: verifiableInputActionTypes.FETCH_ERROR, message: `Recieved response with status ${response.status}.`}))
        }
      }
    } catch {
      dispatch(wrapper({type: verifiableInputActionTypes.FETCH_ERROR, message: 'The request failed. Please, try again!'}));
    }
  } 
}

//FETCH EXACT VALUE
export const fetchCurrentUser = (name: string) => {
  return fetchValue(name, wrapCurrentUserSubAction, searchUserUrlConstructor, searchUserResponseValueGetter, 'Github login');
}

export const fetchRepoName = (name: string) => {
  return fetchValue(name, wrapRepoNameSubAction, searchRepoUrlConstructor, searchRepoResponseValueGetter, 'Github repository name');
}

export const fetchBlacklistCandidate = (name: string) => {
  return fetchValue(name, wrapBlacklistCandidateSubAction, searchUserUrlConstructor, searchUserResponseValueGetter, 'Github login');
}

/* export const fetchCurrentUser = (name: string) => {
  return async (dispatch: Dispatch<SettingsAction>) => {
    try {
      dispatch(wrapCurrentUserSubAction({type: verifiableInputActionTypes.FETCH_INPUT}));      
      const response = await fetch('https://api.github.com/search/users?q=' + name + '+in:login');
      const data = await response.json();
      if(response.ok && data.total_count > 0 && data.items[0].login === name) {
        dispatch(wrapCurrentUserSubAction({type: verifiableInputActionTypes.FETCH_SUCCESS}));
      } else {
        dispatch(wrapCurrentUserSubAction({type: verifiableInputActionTypes.FETCH_ERROR, message: `The value has not been verified. Please enter a correct Github user login`}))
      }
    } catch {
      dispatch(wrapCurrentUserSubAction({type: verifiableInputActionTypes.FETCH_ERROR, message: 'The request failed. Please, try again!'}));
    }
  } 
} */


export const addBlacklistUser = (): SettingsAction => {
  return {type: SettingsActionTypes.ADD_BLACKLIST_USER};
}

export const removeBlacklistUser = (name: string): SettingsAction => {
  return {type: SettingsActionTypes.REMOVE_BLACKLIST_USER, blacklistName: name};
} 
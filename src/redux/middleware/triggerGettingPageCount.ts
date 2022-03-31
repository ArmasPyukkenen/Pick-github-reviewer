import { getRepoContributors } from "../../api/github";
import { SettingsActionTypes } from "../../types/settings-types"
import { verifiableInputActionTypes } from "../../types/verifiable-input-types"

export const triggerPageCountChanges = (store: any) => (next: any) => async (action: any) => {
  //store.dispatch
  //store.getState
  if (
    action.type === SettingsActionTypes.REDUCE_REPO_NAME
    && action.subAction.type === verifiableInputActionTypes.UPDATE_INPUT
  ) {
    store.dispatch({type: SettingsActionTypes.SET_CONTRIBUTORS_PAGE_COUNT, count: null})
  }
  if (
    action.type === SettingsActionTypes.REDUCE_REPO_NAME 
    && action.subAction.type === verifiableInputActionTypes.FETCH_SUCCESS
  ) {
    const response = await getRepoContributors(store.getState().settings.repoName.value);
    let linkInfo: string;
    for (let pair of response.headers.entries()) {
      if(pair[0] === 'link') {
        linkInfo = pair[1];
        const matches = linkInfo.match(/=(\d+)/);
        if(matches === null) break;
        const pageCount = matches[matches.length-1];
        store.dispatch({type: SettingsActionTypes.SET_CONTRIBUTORS_PAGE_COUNT, count: pageCount})
        break;
      }
    }
  }
  next(action);
}
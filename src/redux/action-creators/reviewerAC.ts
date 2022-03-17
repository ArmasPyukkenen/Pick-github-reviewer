import { Dispatch } from "redux";
import { getRepoContributors } from "../../api/github";
import { reviewerAction, reviewerActionTypes } from "../../types/reviewer-types";
import { store } from "../store";

export const pickReviewer = () => {
  return async (dispatch: Dispatch<reviewerAction>) => {
    dispatch({type: reviewerActionTypes.SET_STATUS, status: 'loading'});
    try {
      const settings = store.getState().settings;
      const response = await getRepoContributors(settings.repoName.value);
      const data = await response.json();
      const reviewerCandidates = data
        .map((fullInfo: {login: string, [field: string] : any}) => fullInfo.login)
        .filter((name: string) => !settings.blacklist.list.includes(name));
      if(reviewerCandidates.length === 0) {
        dispatch({type: reviewerActionTypes.SET_STATUS, status: 'nomatch'});
      } else {
        const chosen = reviewerCandidates[Math.floor(Math.random() * reviewerCandidates.length)];
        dispatch({
          type: reviewerActionTypes.PASS_DATA,
          reviewerCandidates: reviewerCandidates,
          currentUser: settings.currentUser.value,
          repoName: settings.repoName.value,
          chosenReviewer: chosen
        })
      }
    } catch {
      dispatch({type: reviewerActionTypes.SET_STATUS, status: 'network_error'});
    }  
  }
}
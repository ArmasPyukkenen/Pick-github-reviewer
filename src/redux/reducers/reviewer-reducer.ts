import { reviewerAction, reviewerActionTypes, reviewerState } from "../../types/reviewer-types";

const initialState : reviewerState = {
  status: 'blank',
  currentUser: '',
  repoName: '',
  reviewerCandidates: [],
  chosenReviewer: '',
  otherCandidatesCount: null
}

export const reviewerReducer = (state = initialState, action : reviewerAction): reviewerState => {
  switch (action.type) {
    case reviewerActionTypes.PASS_DATA:
      return {
        status: 'success', 
        currentUser: action.currentUser, 
        repoName: action.repoName,
        reviewerCandidates: action.reviewerCandidates,
        chosenReviewer: action.chosenReviewer,
        otherCandidatesCount: action.otherCandidatesCount
      };
    case reviewerActionTypes.SET_STATUS:
      return {...state, status: action.status}
    default: 
      return state;
  }
}
type ReviewerStatus = 'blank' | 'loading' | 'success' | 'network_error' | 'nomatch';

export type reviewerState = {
  status: ReviewerStatus;
  currentUser: string;
  repoName: string;
  reviewerCandidates: string[];
  chosenReviewer: string;
  otherCandidatesCount: number | null;
}

export enum reviewerActionTypes  {
  PASS_DATA = "PASS_DATA",
  SET_STATUS = "SET_STATUS"
}

interface PassDataAction {
  type: reviewerActionTypes.PASS_DATA,
  currentUser: string,
  repoName: string,
  reviewerCandidates: string[],
  chosenReviewer: string,
  otherCandidatesCount: number | null;
}

interface SetStatusAction {
  type: reviewerActionTypes.SET_STATUS,
  status: ReviewerStatus
}

export type reviewerAction = PassDataAction | SetStatusAction;
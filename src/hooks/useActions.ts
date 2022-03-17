import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as SettingsActionCreators from '../redux/action-creators/settingsAC';
import * as ReviewerActionCreators from '../redux/action-creators/reviewerAC';

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators({...SettingsActionCreators, ...ReviewerActionCreators}, dispatch);
}
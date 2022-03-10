import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as SettingsActionCreators from '../redux/action-creators/settingsAC';

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(SettingsActionCreators, dispatch);
}
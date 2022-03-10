import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../redux/reducers/root-reducer";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
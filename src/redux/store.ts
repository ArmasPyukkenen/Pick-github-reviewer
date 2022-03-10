import { applyMiddleware, createStore } from "redux";
import { rootReducer, RootState } from "./reducers/root-reducer";
import thunk from "redux-thunk";

export const store = createStore(rootReducer, applyMiddleware(thunk));
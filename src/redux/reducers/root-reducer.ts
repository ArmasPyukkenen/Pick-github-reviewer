import { combineReducers } from "redux";
import { reviewerReducer } from "./reviewer-reducer";
import { settingsReducer } from "./settings-reducer";


export const rootReducer = combineReducers({
  settings: settingsReducer,
  reviewer: reviewerReducer
})

export type RootState = ReturnType<typeof rootReducer>
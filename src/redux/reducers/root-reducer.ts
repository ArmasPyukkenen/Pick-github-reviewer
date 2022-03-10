import { combineReducers } from "redux";
import { settingsReducer } from "./settings-reducer";


export const rootReducer = combineReducers({
  settings: settingsReducer
})

export type RootState = ReturnType<typeof rootReducer>
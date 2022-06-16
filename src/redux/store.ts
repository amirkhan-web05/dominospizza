import { rootReducers } from './reducers/index';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore, compose } from "redux"

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;


export const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)))

type RootReducerType = typeof rootReducers
export type AppStateType = ReturnType<RootReducerType>

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
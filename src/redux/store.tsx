"use client"
import { createStore, Store } from 'redux';
import { rootReducer } from './reducers/rootReducer';

export interface RootState { 
  // Define your state properties here
}

const persistedState = localStorage.getItem('reduxState');
const initialState = persistedState ? JSON.parse(persistedState) : {};

const configureStore = (): Store<RootState> => {
  const store = createStore(rootReducer, initialState);

  store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem('reduxState', JSON.stringify(state));
  });

  return store;
};
export default configureStore;


import { createStore, Store } from 'redux';
import { rootReducer } from './reducers/rootReducer';
import { useEffect } from 'react';

export interface RootState { 
  // Define your state properties here
}

const configureStore = (): Store<RootState> => {
  const persistedState = localStorage.getItem('reduxState');
  const initialState = persistedState ? JSON.parse(persistedState) : {};

  const store = createStore(rootReducer, initialState);

  useEffect(() => {
    store.subscribe(() => {
      const state = store.getState();
      localStorage.setItem('reduxState', JSON.stringify(state));
    });
  }, [store]);

  return store;
};

export default configureStore;

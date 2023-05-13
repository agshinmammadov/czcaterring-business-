import { createStore, Store } from 'redux';
import { rootReducer } from './reducers/rootReducer';
import { useEffect } from 'react';

export interface RootState { 
}
const configureStore = (): Store<RootState> => {
  let initialState = {};

  // Check if the code is being executed on the client
  if (typeof window !== 'undefined') {
    try {
      const persistedState = localStorage.getItem('reduxState');
      if (persistedState) {
        initialState = JSON.parse(persistedState);
      }
    } catch (error) {
      console.log(`"There problem in redux store. Error name:" ${error}`)
    }
  }

  const store = createStore(rootReducer, initialState);

  // Save the state to localStorage whenever it changes, but only on the client
  if (typeof window !== 'undefined') {
    store.subscribe(() => {
      const state = store.getState();
      try {
        localStorage.setItem('reduxState', JSON.stringify(state));
      } catch (error) {
        console.log(`"There is problem with sending data to localstorage. Error name:" ${error}`)
      }
    });
  }

  return store;
};


export default configureStore;

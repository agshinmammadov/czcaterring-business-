import { createStore, Store } from 'redux';
import { rootReducer } from './reducers/rootReducer';
import { useEffect } from 'react';

export interface RootState { 
  // Define your state properties here
}

const configureStore = (): Store<RootState> => {
  let initialState = {};

  try {
    const persistedState = localStorage.getItem('reduxState');
    if (persistedState) {
      initialState = JSON.parse(persistedState);
    }
  } catch (error) {
    console.log(`"There problem in redux store. Error name:" ${error}`)
  }

  const store = createStore(rootReducer, initialState);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      store.subscribe(() => {
        const state = store.getState();
        try {
          localStorage.setItem('reduxState', JSON.stringify(state));
        } catch (error) {
          console.log(`"There is problem with sending data to localstorage. Error name:" ${error}`)
        }
      });
    }
  }, [store]);

  return store;
};

export default configureStore;

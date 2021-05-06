import { useState, useEffect } from 'react';

let globalState = {};
let listeners = [];
let actions = {};

// custom hook
export const useStore = (shouldListen = true) => {
  // not using state here because we're using
  // globalState to hold on to the data instead
  const setState = useState(globalState)[1];

  // dispatch takes a TYPE and returns a
  // NEW STATE TO MERGE WITH THE OLD STATE
  const dispatch = (actionIdentifier, payload) => {
    const newState = actions[actionIdentifier](globalState, payload);
    globalState = {...globalState, ...newState};

    for (const listener of listeners) {
      listener(globalState);
    }
  };

  useEffect( () => {
    if (shouldListen) {
      console.log(listeners);
      // each component that uses this hook will get
      // its OWN copy (and reference) to setState
      // then that reference gets saved to the listeners
      // so all of them will be in one place
      listeners.push(setState);
    }

    // returns a function that will be called when
    // any dependency changes or the component unmounts.
    // Since there is no dependency in this case,
    // it'll run when we unmount (since the '[]' dependency
    // means useEffect runs like componentDidMount)
    return () => {
      if(shouldListen) {
        listeners = listeners.filter(li => li !== setState);
      }
    };

  }, [setState, shouldListen]);

  return [globalState, dispatch];
};

export const initStore = (userAction, initialState) => {
  if (initialState) {
    globalState = { ...initialState, ...globalState };
  }
  actions = { ...actions, ...userAction };
}

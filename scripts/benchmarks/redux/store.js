import { createStore } from 'redux';

export let len = 800;

function generateNewState() {
  let iState = {
    one: Math.random(),
    two: Math.random(),
    three: Math.random(),
    four: Math.random(),
    five: Math.random(),
    six: Math.random(),
    seven: Math.random(),
    eight: Math.random(),
    nine: Math.random(),
    randomNumbers: []
  };

  for(var i=0; i<len; i++) {
    iState.randomNumbers.push(Math.random());
  }

  return iState;
}

let store = createStore((state = generateNewState(), action) => {
  if(action.type === 'change_all') {
    return generateNewState();
  }
  if(action.type === 'change_one') {
    let randomNumbers = state.randomNumbers.slice(0);
    randomNumbers[0] = Math.random();
    return {
      ...state,
      randomNumbers: randomNumbers
    };
  }
  return state;
});

Object.defineProperty(global, 'state', {get: function() { return store.getState() }});

export default store;
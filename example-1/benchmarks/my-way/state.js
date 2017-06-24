import createState from '../../libs/state'

export let len = 50;

export function generateNewState() {
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

export default createState(generateNewState());
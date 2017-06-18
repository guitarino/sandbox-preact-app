let empty = function() {};

// Trying not to pollute the namespace
let sub = Symbol ?
  Symbol() :
  '_subscriber' + Math.random()
;

let State = function(iState) {
  for(var key in iState) {
    if(iState.hasOwnProperty(key)) {
      this[key] = iState[key];
    }
  }
};

// The reason for defineProperty is to make it non-configurable
// So that rewrites will throw error
Object.defineProperty(State.prototype, 'subscriber', {value: function(subscriber) {
  this[sub] = subscriber;
  subscriber(this);
}});

Object.defineProperty(State.prototype, 'change', {value: function(changeState) {
  changeState(this);
  let subscriber = this[sub] || empty;
  subscriber(this);
}});

export default function createState(iState) {
  if(typeof iState === 'object' && iState !== null) {
    return new State(iState);
  } else {
    if(iState !== undefined) {
      console.warn('Should either not have arguments or an object with initial state. Ignoring argument.');
    }
    return new State({});
  }
};
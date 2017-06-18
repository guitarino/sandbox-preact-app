let empty = function() {};

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

Object.defineProperty(State.prototype, 'subscriber', {value: function(subscriber) {
  this[sub] = subscriber;
  subscriber(this);
}});

Object.defineProperty(State.prototype, 'change', {value: function(changeState) {
  changeState(this);
  let subscriber = this[sub] || empty;
  subscriber(this);
}});

export default function createStore(iState) {
  if(typeof iState === 'object' && iState !== null) {
    return new State(iState);
  } else {
    if(iState !== undefined) {
      console.warn('Should either not have arguments or an object with initial state. Ignoring argument.');
    }
    return new State({});
  }
};
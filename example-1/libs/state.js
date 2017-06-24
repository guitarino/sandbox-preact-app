// Trying not to pollute the namespace
let sub = 'Symbol' in global ?
  global.Symbol() :
  '_subscribers' + Math.random()
;

let State = function(iState) {
  this[sub] = [];
  for(var key in iState) {
    if(iState.hasOwnProperty(key)) {
      this[key] = iState[key];
    }
  }
};

// The reason for defineProperty is to make it non-configurable
// So that rewrites will throw error
Object.defineProperty(State.prototype, 'subscribe', {value: function(subscriber, triggerUpdate) {
  this[sub].push(subscriber);
  if(triggerUpdate) {
    subscriber(this);
  }
}});

Object.defineProperty(State.prototype, 'unsubscribe', {value: function(subscriber) {
  let id = this[sub].indexOf(subscriber);
  if(~id) {
    this[sub].splice(id, 1);
  }
  else {
    console.warn('Not subscribed to this function.. is the function bound?');
  }
}});

Object.defineProperty(State.prototype, 'change', {value: function(changeState) {
  changeState(this);
  for(let i=0; i<this[sub].length; i++) {
    let subscriber = this[sub][i];
    subscriber(this);
  }
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
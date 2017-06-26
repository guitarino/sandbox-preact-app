// Trying not to pollute the namespace
let sub = 'Symbol' in global ?
  global.Symbol() :
  '_subscribers' + Math.random()
;

let State = function(iState) {
  Object.defineProperty(this, sub, {value: []}); // should not show up in for(..in..) loop, or be removable
  for(var key in iState) {
    if(iState.hasOwnProperty(key)) {
      this[key] = iState[key];
    }
  }
};

// The reason for defineProperty is to make it non-configurable
// So that rewrites will throw error
Object.defineProperty(State.prototype, 'subscribe', {value: function(subscriber) {
  this[sub].push(subscriber);
}});

Object.defineProperty(State.prototype, 'unsubscribe', {value: function(subscriber) {
  let id = this[sub].indexOf(subscriber);
  if(~id) {
    this[sub].splice(id, 1);
  }
  else {
    console.warn("Not subscribed to this object's handleUpdate / function.. check if it's bound..");
  }
}});

Object.defineProperty(State.prototype, 'change', {value: function(changeState) {
  changeState(this);
  for(let i=0; i<this[sub].length; i++) {
    let subscriber = this[sub][i];
    if('handleUpdate' in subscriber) {
      subscriber.handleUpdate(this);
    }
    else {
      subscriber(this);
    }
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
import * as preact from 'preact';
import { Component1, Component2 } from '../components.js';
import state, {len, generateNewState} from './state';

let root = document.getElementById('root-content');

let
  Test1Begin = (new Date()).getTime(),
  Test1End,
  Test2Begin,
  Test2End,
  Test3Begin,
  Test3End
;

let ArrayOfComponents = [];
let emptyArray = Array.apply(null, Array(len)).map(function () {});

for(var i=0; i<len; i++) {
  ArrayOfComponents.push(function(i) {
    let rand = Math.random();
    return class extends preact.Component {
      render() {
        return (
          <div style={{ color: 'red', lineHeight: state.randomNumbers[i] }}>
            <div>{ rand }</div>
            <span>{ this.props.property }</span>
            <div>{ state.randomNumbers[i] }</div>
          </div>
        );
      };
    };
  }(i));
}

function changeEverything() {
  testType = 2;
  Test2Begin = (new Date()).getTime();
  state.change((state) => {
    let iState = generateNewState();
    for(let key in iState) {
      state[key] = iState[key];
    }
  });
};

function changeOne() {
  testType = 3;
  Test3Begin = (new Date()).getTime();
  state.change((state) => {
    state.randomNumbers[0] = Math.random();
  });
};

let testType;

class App extends preact.Component {
  constructor() {
    super();
    state.subscribe(() => this.forceUpdate());
  }

  componentDidMount() {
    Test1End = (new Date()).getTime();
    console.log('Test 1 - generation and mounting', Test1End - Test1Begin);
  }

  componentDidUpdate() {
    if(testType === 2) {
      Test2End = (new Date()).getTime();
      console.log('Test 2 - change everything', Test2End - Test2Begin);
    }
    else if(testType === 3) {
      Test3End = (new Date()).getTime();
      console.log('Test 3 - change one', Test3End - Test3Begin);
    }
  }

  render() {
    return (
      <div>
        <div style={{ position: 'fixed' }}>
          <button onClick={changeEverything}>Change everything</button>
          <button onClick={changeOne}>Change one</button>
        </div>
        <div>{ emptyArray.map(() => (
          <Component1
            one={ state.one }
            two={ state.two }
            three={ <Component2
              one={ state.three }
              two={ state.four }
              three={ <Component1
                one={ state.five }
                two={ state.six }
                three={ <Component2
                  one={ state.seven }
                  two={ state.eight }
                  three={ state.nine }
                /> }
              /> }
            /> }
          />
        )) }</div>
        <div>{ ArrayOfComponents.map((Component) => (
          <Component
            property={
              state.one +
              state.two +
              state.three +
              state.four +
              state.five +
              state.seven +
              state.eight +
              state.nine
            }
          />
        )) }</div>
      </div>
    );
  }
};

preact.render(
  <App />,
  root,
  root.firstChild
);
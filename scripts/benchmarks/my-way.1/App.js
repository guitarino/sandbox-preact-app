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
      componentWillMount() {
        state.subscribe(this);
        this.handleUpdate();
      }
      componentWillUnmount() {
        state.unsubscribe(this);
        console.log('unmounted');
      }
      handleUpdate() {
        if(this.state.value !== state.randomNumbers[i]) {
          this.setState({
            value: state.randomNumbers[i]
          });
        }
      }
      componentDidUpdate() {
        if(testType === 3) {
          Test3End = (new Date()).getTime();
          console.log('Test 3 - change one', Test3End - Test3Begin);
        }
      }
      render() {
        return (
          <div style={{ color: 'red', lineHeight: this.state.value }}>
            <div>{ rand }</div>
            <span>{ this.props.property }</span>
            <div>{ this.state.value }</div>
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
      if(iState.hasOwnProperty(key)) {
        state[key] = iState[key];
      }
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
  componentWillMount() {
    state.subscribe(this);
    this.handleUpdate();
  }
  componentWillUnmount() {
    state.unsubscribe(this);
  }
  handleUpdate() {
    if(this.state.one !== state.one ||
      this.state.two !== state.two ||
      this.state.three !== state.three ||
      this.state.four !== state.four ||
      this.state.five !== state.five ||
      this.state.six !== state.six ||
      this.state.seven !== state.seven ||
      this.state.eight !== state.eight ||
      this.state.nine !== state.nine) {

      this.setState({
        one: state.one,
        two: state.two,
        three: state.three,
        four: state.four,
        five: state.five,
        six: state.six,
        seven: state.seven,
        eight: state.eight,
        nine: state.nine
      });
    }
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
            one={ this.state.one }
            two={ this.state.two }
            three={ <Component2
              one={ this.state.three }
              two={ this.state.four }
              three={ <Component1
                one={ this.state.five }
                two={ this.state.six }
                three={ <Component2
                  one={ this.state.seven }
                  two={ this.state.eight }
                  three={ this.state.nine }
                /> }
              /> }
            /> }
          />
        )) }</div>
        <div>{ ArrayOfComponents.map((Component) => (
          <Component
            property={
              this.state.one +
              this.state.two +
              this.state.three +
              this.state.four +
              this.state.five +
              this.state.seven +
              this.state.eight +
              this.state.nine
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
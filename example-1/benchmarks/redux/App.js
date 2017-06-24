import * as preact from 'preact';
import { Component1, Component2 } from '../components.js';
import { Provider, connect } from 'preact-redux';
import store, {len} from './store';

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

    let mapStateToProps = (state) => ({
      rand: state.randomNumbers[i]
    });

    return connect(mapStateToProps)(class extends preact.Component {
      componentDidUpdate() {
        if(testType === 3) {
          Test3End = (new Date()).getTime();
          console.log('Test 3 - change one', Test3End - Test3Begin);
        }
      }

      render() {
        return (
          <div style={{ color: 'red', lineHeight: this.props.rand }}>
            <div>{ rand }</div>
            <span>{ this.props.property }</span>
            <div>{ this.props.rand }</div>
          </div>
        );
      };
    });
  }(i));
}

let testType;

let mapStateToProps = (state) => ({
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

let mapDispatchToProps = (dispatch) => ({
  changeAll: () => {
    testType = 2;
    Test2Begin = (new Date()).getTime();
    dispatch({type: 'change_all'});
  },
  changeOne: () => {
    testType = 3;
    Test3Begin = (new Date()).getTime();
    dispatch({type: 'change_one'});
  }
});

let App = connect(mapStateToProps, mapDispatchToProps)(class extends preact.Component {
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
          <button onClick={() => this.props.changeAll()}>Change everything</button>
          <button onClick={() => this.props.changeOne()}>Change one</button>
        </div>
        <div>{ emptyArray.map(() => (
          <Component1
            one={ this.props.one }
            two={ this.props.two }
            three={ <Component2
              one={ this.props.three }
              two={ this.props.four }
              three={ <Component1
                one={ this.props.five }
                two={ this.props.six }
                three={ <Component2
                  one={ this.props.seven }
                  two={ this.props.eight }
                  three={ this.props.nine }
                /> }
              /> }
            /> }
          />
        )) }</div>
        <div>{ ArrayOfComponents.map((Component) => (
          <Component
            property={
              this.props.one +
              this.props.two +
              this.props.three +
              this.props.four +
              this.props.five +
              this.props.seven +
              this.props.eight +
              this.props.nine
            }
          />
        )) }</div>
      </div>
    );
  }
});

preact.render(
	<Provider store={store}>
    <App />
  </Provider>,
  root,
  root.firstChild
);
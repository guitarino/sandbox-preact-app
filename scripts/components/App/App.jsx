import * as preact from 'preact';
import state from '../../state';
import ColorToggle from '../ColorToggle/ColorToggle';
import ColorDisplay from '../ColorDisplay/ColorDisplay';

function toggleName() {
  state.name !== 'World' ?
    state.change((state) => { state.name = 'World' }) :
    state.change((state) => { state.name = 'Hamster' })
  ;
}

function inputChanged(e) {
  state.change((state) => {
    state.input = e.currentTarget.value
  });
}

export default class App extends preact.Component {
  render() {
    return (
      <div style={{color: state.color}}>
        <div>Hello, {state.name}</div>
        <button onClick={toggleName}>Change name!</button>
        <ColorToggle />
        <ColorDisplay />
        <input type='text' value={ state.input } onInput={ inputChanged } />
        <div>What do you mean by <strong>{ state.input }</strong>?</div>
      </div>
    );
  }
};

export function renderTo(root) {
  state.subscriber(function() {
    preact.render(
      <App />,
      root,
      root.firstChild
    );
  });
};
import * as preact from 'preact';
import state from '../../state';

function toggleColor() {
  state.color !== 'black' ?
    state.change((state) => { state.color = 'black' }) :
    state.change((state) => { state.color = '#007ACC' })
  ;
};

export default class ColorToggle extends preact.Component {
  render() {
    return (
      <button onClick={ toggleColor }>Change color!</button>
    );
  }
};
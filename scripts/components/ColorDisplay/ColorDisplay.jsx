import * as preact from 'preact';
import state from '../../state';

export default class ColorDisplay extends preact.Component {
  render() {
    return (
      <div>{ state.color }</div>
    );
  }
};
import * as preact from 'preact';
import state, { createState } from '../../state';

function toggleName() {
  state.App.name !== 'World' ?
    state.App.change((state) => { state.name = 'World' }) :
    state.App.change((state) => { state.name = 'Hamster' })
  ;
}

function inputChanged(e) {
  state.App.change((state) => {
    state.input = e.currentTarget.value
  });
}

export default class App extends preact.Component {
  constructor() {
    super();
    state.App = createState({
      name: 'World',
      input: 'infinity'
    });
  }

  componentWillMount() {
    state.App.subscribe(this);
  }

  componentWillUnmount() {
    state.App.unsubscribe(this);
  }

  handleUpdate() {
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <div>Hello, { state.App.name }</div>
        <button onClick={ toggleName }>Change name!</button>
        <input type='text' value={ state.App.input } onInput={ inputChanged } />
        <div>What do you mean by <strong>{ state.App.input }</strong>?</div>
      </div>
    );
  }
};

export function renderTo(root) {
  preact.render(
    <App />,
    root
  );
};
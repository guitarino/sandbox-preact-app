import * as preact from 'preact';

let rnd = Math.random();

export let Component1 = function(props) {
  return (
    <div class={rnd}>
      { props.one }
      <div class={rnd}>{ props.two }</div>
      <div class={rnd}>{ props.three }</div>
    </div>
  );
};

export class Component2 extends preact.Component {
  componentWillMount() {
    this.setState({random: rnd});
  }

  render() {
    return (
      <div class={rnd}>
        <h5 class={rnd}>{ this.state.random }</h5>
        <div class={rnd}>{ rnd }</div>
        <span class={rnd}>{ this.props.one }</span>
        <div class={rnd}>{ this.props.two }</div>
        <div class={rnd}>{ this.props.three }</div>
      </div>
    );
  }
};
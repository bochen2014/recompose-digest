import { Component } from 'react';
import { createChangeEmitter } from 'change-emitter';
import $$observable from 'symbol-observable';
import { config as globalConfig } from './setObservableConfig';

/*
class ComponentFromStream extends Component {
    state = { vdom: null }
    componendWillMount/ componentWillReceiveProps
        changeEmitter causes props$ to emit new value
              ⬇️
              ⬇️
              ⬇️
props$     { name:'bochen' }  --------- {name:'joanna'}   ------------- { name: 'jenny'}  ------
              ⬇️
              ⬇️  you can use all forms of transforms, map, combineLatest,merge... anything you like
              ⬇️
vdom$    <div>bchen</div>
              ⬇
              ⬇
              ⬇    ️
render() {
      return this.state.vdom
    }
*/

export const componentFromStreamWithConfig = config => propsToVdom =>
  class ComponentFromStream extends Component {
    // es7
    state = { vdom: null }

    propsEmitter = createChangeEmitter()

    props$ = config.fromESObservable({
      subscribe: observer => {
        const unsubscribe = this.propsEmitter.listen(props => {
          if (props) {
            observer.next(props);
          } else {
            observer.complete();
          }
        });
        return { unsubscribe };
      },
      [$$observable]() {
        return this;
      },
    })

    // Stream of vdom
    vdom$ = config.toESObservable(propsToVdom(this.props$))

    componentWillMount() {
      // Subscribe to child prop changes so we know when to re-render
      this.subscription = this.vdom$.subscribe({
        next: vdom => {
          this.setState({ vdom });
        },
      });
      this.propsEmitter.emit(this.props);
    }

    componentWillReceiveProps(nextProps) {
      // Receive new props from the owner
      this.propsEmitter.emit(nextProps);
    }

    shouldComponentUpdate(nextProps, nextState) {
      return nextState.vdom !== this.state.vdom;
    }

    componentWillUnmount() {
      // Call without arguments to complete stream
      this.propsEmitter.emit();

      // Clean-up subscription before un-mounting
      this.subscription.unsubscribe();
    }

    render() {
      return this.state.vdom;
    }
  };

const componentFromStream = propsToVdom =>
  componentFromStreamWithConfig(globalConfig)(propsToVdom);

export default componentFromStream;

import shallowEqual from 'react/lib/shallowEqual';

/**
 * This (and related hacks) will go away in React 0.14.
 */
export default {
  getInitialState() {
    this.ctor();

    const data = {};
    this.subscribe((key, value) => {
      data[key] = value;
    });
    this.unsubscribe();

    return { data };
  },

  componentWillMount() {
    this.subscribe(this.setData);
  },

  // In future we'll be able to do it at receive props stage
  // but it's way too painful for now.
  componentDidUpdate(prevProps) {
    if (shallowEqual(prevProps, this.props)) {
      return;
    }

    this.subscribe(this.setData);
  },

  componentWillUnmount() {
    this.unsubscribe();
  },

  setData(key, value) {
    this.setState({
      data: {...this.state.data, [key]: value }
    });
  },

  subscribe(onNext) {
    const newObservables = this.observe();
    const newSubscriptions = {};

    for (let key in newObservables) {
      newSubscriptions[key] = newObservables[key].subscribe({
        onNext: (value) => onNext(key, value),
        onError: () => {},
        onCompleted: () => {}
      });
    }

    this.unsubscribe();
    this.subscriptions = newSubscriptions;
  },

  unsubscribe() {
    for (let key in this.subscriptions) {
      if (this.subscriptions.hasOwnProperty(key)) {
        this.subscriptions[key].dispose();
      }
    }

    this.subscriptions = {};
  }
}
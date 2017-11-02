/*!
 * React Native Globalize
 *
 * Copyright 2015-2017 Josh Swan
 * Released under the MIT license
 * https://github.com/joshswan/react-native-globalize/blob/master/LICENSE
 */
import { Component, PropTypes } from 'react';
import { globalizeShape, globalizePropTypes } from '../types';
import Globalize from '../globalize';

export default class FormattedWrapper extends Component {
  constructor(props) {
    super(props);

    if (props.cldr) {
      Globalize.load(props.cldr);
    }

    if (props.messages) {
      Globalize.loadMessages(props.messages);
    }

    const instance = new Globalize(props.locale, props.currency, {
      fallback: props.localeFallback,
      warnOnMissingMessage: props.warnOnMissingMessage,
    });

    this.state = {
      globalize: instance,
    };
  }

  getChildContext() {
    return {
      globalize: this.state.globalize,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.locale !== nextProps.locale || this.props.currency !== nextProps.currency) {
      const instance = new Globalize(nextProps.locale, nextProps.currency, {
        fallback: nextProps.localeFallback,
        warnOnMissingMessage: nextProps.warnOnMissingMessage,
      });

      this.setState({
        globalize: instance,
      });
    }
  }

  render() {
    return this.props.children;
  }
}

FormattedWrapper.childContextTypes = {
  globalize: globalizeShape,
};

FormattedWrapper.defaultProps = {
  cldr: null,
  currency: 'USD',
  locale: 'en',
  localeFallback: false,
  messages: null,
  warnOnMissingMessage: true,
};

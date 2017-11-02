/*!
 * React Native Globalize
 *
 * Copyright 2015-2017 Josh Swan
 * Released under the MIT license
 * https://github.com/joshswan/react-native-globalize/blob/master/LICENSE
 */
import React, { Component, PropTypes } from 'react';
import { Text } from 'react-native';
import { globalizeShape, numberFormatPropTypes } from '../types';

export default class FormattedNumber extends Component {
  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  render() {
    const {
      numberStyle,
      style,
      value,
      ...other
    } = this.props;

    const formatNumber = this.context.globalize.getNumberFormatter({
      ...other,
      style: numberStyle,
    });
    const formattedNumber = (typeof value === 'number') ? formatNumber(value) : '';

    return (
      <Text
        ref={(component) => { this._root = component; }}
        style={style}
      >
        {formattedNumber}
      </Text>
    );
  }
}

FormattedNumber.defaultProps = {
  numberStyle: 'decimal',
  style: null,
};

FormattedNumber.contextTypes = {
  globalize: globalizeShape,
};

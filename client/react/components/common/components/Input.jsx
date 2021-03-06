import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { get } from 'lodash';

import { _t } from '../../../../../common/i18n';

const Input = ({ name, touched, errors, handleChange, placeholder, values, type, disabled, className }) => (
  <div className={cn('form-group', { [className]: !!className })}>
    <input
      disabled={disabled}
      name={name}
      placeholder={_t(placeholder)}
      onChange={handleChange}
      value={get(values, name)}
      className={cn('cc-input form-control form-control-lg', { 'cc-error': get(errors, name) && get(touched, name) })}
      type={type}
    />
  </div>
);
Input.defaultProps = {
  type: 'text',
  disabled: false,
  className: undefined,
};

Input.propTypes = {
  disabled: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.string,
  touched: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  values: PropTypes.shape({}).isRequired,
};

export default Input;

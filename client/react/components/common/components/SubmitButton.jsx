import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { _t } from '../../../../../common/i18n';

const Input = ({ onClick, disabled, label, inverse }) => (
  <button
    type="submit"
    disabled={disabled}
    onClick={onClick}
    className={cn('cc-button form-control form-control-lg', { 'cc-button-inverse': inverse })}
  >
    {_t(label)}
  </button>
);
Input.defaultProps = {
  disabled: false,
  onClick: undefined,
  inverse: false,
};

Input.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  inverse: PropTypes.bool,
};

export default Input;

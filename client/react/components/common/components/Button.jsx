import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { _t } from '../../../../../common/i18n';

const Button = ({ onClick, disabled, label, inverse, className }) => (
  <button
    type="button"
    disabled={disabled}
    onClick={onClick}
    className={cn('cc-button form-control form-control-lg', { 'cc-button-inverse': inverse, [className]: !!className })}
  >
    {_t(label)}
  </button>
);

Button.defaultProps = {
  disabled: false,
  onClick: undefined,
  inverse: false,
  className: undefined,
};

Button.propTypes = {
  disabled: PropTypes.bool,
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  inverse: PropTypes.bool,
};

export default Button;

import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { _t } from '../../../../../common/i18n';

const SubmitButton = ({ onClick, disabled, label, inverse, className }) => (
  <button
    type="submit"
    disabled={disabled}
    onClick={onClick}
    className={cn('cc-button form-control form-control-lg', { 'cc-button-inverse': inverse, [className]: !!className })}
  >
    {_t(label)}
  </button>
);

SubmitButton.defaultProps = {
  disabled: false,
  onClick: undefined,
  inverse: false,
  className: undefined,
};

SubmitButton.propTypes = {
  disabled: PropTypes.bool,
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  inverse: PropTypes.bool,
};

export default SubmitButton;

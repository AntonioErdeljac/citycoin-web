import PropTypes from 'prop-types';
import React from 'react';

import { _t } from '../../../../../common/i18n';

const Input = ({ onClick, disabled, label }) => (
  <button
    type="submit"
    disabled={disabled}
    onClick={onClick}
    className="cc-button form-control form-control-lg"
  >
    {_t(label)}
  </button>
);
Input.defaultProps = {
  disabled: false,
  onClick: undefined,
};

Input.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Input;

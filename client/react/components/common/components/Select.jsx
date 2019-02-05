import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { get } from 'lodash';
import uniqid from 'uniqid';

import { _t } from '../../../../../common/i18n';

class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: get(props.values, props.name, '1'),
    };
  }

  handleSelectValue = (event) => {
    const { setFieldValue, name } = this.props;

    this.setState({
      selectedValue: event.target.value,
    });

    setFieldValue(name, event.target.value);
  }

  render() {
    const { name, touched, errors, placeholder, type, disabled, className, options } = this.props;
    const { selectedValue } = this.state;

    return (
      <div className={cn('form-group', { [className]: !!className })}>
        <select
          disabled={disabled}
          name={name}
          onChange={this.handleSelectValue}
          value={selectedValue}
          className={cn('cc-input form-control form-control-lg', { 'cc-error': get(errors, name) && get(touched, name) })}
          type={type}
        >
          <option value="1" disabled>{_t(placeholder)}</option>
          {options.map(option => (
            <option key={uniqid()} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

Select.defaultProps = {
  type: 'text',
  disabled: false,
  className: undefined,
};

Select.propTypes = {
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  touched: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
  name: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  values: PropTypes.shape({}).isRequired,
};

export default Select;

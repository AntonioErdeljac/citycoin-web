import * as Yup from 'yup';
import { get } from 'lodash';

import { userTypes } from '../../../../../../common/constants';

const initialValues = values => ({
  personal: {
    firstName: get(values, 'personal.firstName', ''),
    lastName: get(values, 'personal.lastName', ''),
    nin: get(values, 'personal.nin', ''),
  },
  contact: {
    email: get(values, 'contact.email', ''),
  },
  authentication: {
    password: get(values, 'authentication.password', ''),
  },
  type: userTypes.SUPERVISOR,
  services: (values && values.services)
    ? values.services.map(service => (service._id ? service._id : service.value))
    : [undefined],
});

const validations = values => Yup.object().shape({
  personal: Yup.object().shape({
    firstName: Yup.string()
      .required('Required'),
    lastName: Yup.string()
      .required('Required'),
    nin: Yup.string()
      .required('Required'),
  }),
  contact: Yup.object().shape({
    email: Yup.string()
      .required('Required'),
  }),
  authentication: get(values, '_id', undefined)
    ? undefined
    : Yup.object().shape({
      password: Yup.string()
        .min(6, 'Too short')
        .required('Required'),
    }),
  services: Yup.array()
    .of(
      Yup.string()
        .required('required'),
    ),
});

export default {
  initialValues,
  validations,
};

import * as Yup from 'yup';

import { userTypes } from '../../../../../../common/constants';

const initialValues = {
  contact: {
    email: '',
  },
  authentication: {
    password: '',
  },
  personal: {
    businessName: '',
    nin: '',
  },
  type: userTypes.ADMIN,
};

const validations = Yup.object().shape({
  contact: Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
  }),
  authentication: Yup.object().shape({
    password: Yup.string()
      .min(6, 'Too short')
      .required('Required'),
  }),
  personal: Yup.object().shape({
    businessName: Yup.string()
      .required('Required'),
    nin: Yup.string()
      .required('Required'),
  }),
});

export default {
  initialValues,
  validations,
};

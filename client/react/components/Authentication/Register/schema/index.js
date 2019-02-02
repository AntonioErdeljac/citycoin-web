import * as Yup from 'yup';

const initialValues = {
  contact: {
    email: '',
  },
  authentication: {
    password: '',
  },
  personal: {
    firstName: '',
    lastName: '',
    nin: '',
  },
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
    firstName: Yup.string()
      .required('Required'),
    lastName: Yup.string()
      .required('Required'),
    nin: Yup.string()
      .required('Required'),
  }),
});

export default {
  initialValues,
  validations,
};

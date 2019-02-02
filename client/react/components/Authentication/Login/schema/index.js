import * as Yup from 'yup';

const initialValues = { email: '', password: '' };

const validations = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .required('Required'),
});

export default {
  initialValues,
  validations,
};

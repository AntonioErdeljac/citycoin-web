import * as Yup from 'yup';
import { get } from 'lodash';

const initialValues = values => ({
  general: {
    name: get(values, 'general.name', ''),
    durationUnit: get(values, 'general.durationUnit', undefined),
    duration: get(values, 'general.duration', ''),
    price: get(values, 'general.price', ''),
  },
});

const validations = Yup.object().shape({
  general: Yup.object().shape({
    name: Yup.string()
      .required('Required'),
    duration: Yup.string()
      .required('Required'),
    durationUnit: Yup.string()
      .required('Required'),
    price: Yup.string()
      .required('Required'),
  }),
});

export default {
  initialValues,
  validations,
};

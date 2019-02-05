import * as Yup from 'yup';
import { get } from 'lodash';

const initialValues = values => ({
  company: {
    name: get(values, 'company.name', ''),
    nin: get(values, 'company.nin', ''),
  },
  general: {
    name: get(values, 'general.name', ''),
  },
  type: get(values, 'type', undefined),
  subscriptions: get(values, 'subscriptions') || [{
    description: '',
    duration: '',
    durationUnit: undefined,
    price: '',
  }],
});

const validations = Yup.object().shape({
  general: Yup.object().shape({
    name: Yup.string()
      .required('Required'),
  }),
  company: Yup.object().shape({
    name: Yup.string()
      .required('Required'),
    nin: Yup.string()
      .required('Required'),
  }),
  type: Yup.string()
    .required('Required'),
  subscriptions: Yup.array()
    .of(
      Yup.object().shape({
        description: Yup.string()
          .required('Required'),
        duration: Yup.string()
          .required('Required'),
        durationUnit: Yup.string()
          .required('Required'),
        price: Yup.number()
          .required('Required'),
      }),
    ),
});

export default {
  initialValues,
  validations,
};

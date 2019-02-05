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
  subscriptions: get(values, 'subscriptions', [undefined]),
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
      Yup.string()
        .required('required'),
    ),
});

export default {
  initialValues,
  validations,
};

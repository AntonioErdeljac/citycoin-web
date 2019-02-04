import * as Yup from 'yup';
import { get } from 'lodash';

const initialValues = values => ({
  general: {
    name: get(values, 'general.name', ''),
    status: get(values, 'general.status', ''),
  },
  info: {
    iata: get(values, 'info.iata', ''),
    countryCode: get(values, 'info.countryCode', ''),
  },
});

const validations = Yup.object().shape({
  general: Yup.object().shape({
    name: Yup.string()
      .required('Required'),
  }),
  info: Yup.object().shape({
    iata: Yup.string()
      .required('Required'),
    countryCode: Yup.string()
      .required('Required'),
  }),
});

export default {
  initialValues,
  validations,
};

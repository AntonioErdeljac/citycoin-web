import * as Yup from 'yup';
import { get } from 'lodash';

const initialValues = values => ({
  general: {
    name: get(values, 'general.name', ''),
  },
  info: {
    iata: get(values, 'info.iata', ''),
    countryCode: get(values, 'info.countryCode', undefined),
  },
  location: {
    coordinates: undefined,
  },
  services: [undefined],
});

const validations = Yup.object().shape({
  general: Yup.object().shape({
    name: Yup.string()
      .required('Required'),
  }),
  info: Yup.object().shape({
    countryCode: Yup.string()
      .required('Required'),
  }),
  location: Yup.object().shape({
    coordinates: Yup.array()
      .of(
        Yup.number()
          .required('Required'),
      )
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

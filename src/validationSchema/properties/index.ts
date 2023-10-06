import * as yup from 'yup';

export const propertyValidationSchema = yup.object().shape({
  address: yup.string().required(),
  property_value: yup.number().integer().required(),
  property_type: yup.string().required(),
  property_status: yup.string().required(),
  owner_id: yup.string().nullable().required(),
});

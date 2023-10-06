import * as yup from 'yup';

export const applicationValidationSchema = yup.object().shape({
  application_status: yup.string().required(),
  loan_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});

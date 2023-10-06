import * as yup from 'yup';

export const quoteValidationSchema = yup.object().shape({
  quote_amount: yup.number().integer().required(),
  interest_rate: yup.number().integer().required(),
  loan_term: yup.number().integer().required(),
  quote_status: yup.string().required(),
  loan_id: yup.string().nullable().required(),
  company_id: yup.string().nullable().required(),
});

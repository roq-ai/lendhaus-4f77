import * as yup from 'yup';

export const loanValidationSchema = yup.object().shape({
  loan_amount: yup.number().integer().required(),
  interest_rate: yup.number().integer().required(),
  loan_term: yup.number().integer().required(),
  loan_status: yup.string().required(),
  property_id: yup.string().nullable().required(),
  lender_id: yup.string().nullable().required(),
});

import { LoanInterface } from 'interfaces/loan';
import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface QuoteInterface {
  id?: string;
  quote_amount: number;
  interest_rate: number;
  loan_term: number;
  quote_status: string;
  loan_id: string;
  company_id: string;
  created_at?: any;
  updated_at?: any;

  loan?: LoanInterface;
  company?: CompanyInterface;
  _count?: {};
}

export interface QuoteGetQueryInterface extends GetQueryInterface {
  id?: string;
  quote_status?: string;
  loan_id?: string;
  company_id?: string;
}

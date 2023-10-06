import { ApplicationInterface } from 'interfaces/application';
import { QuoteInterface } from 'interfaces/quote';
import { PropertyInterface } from 'interfaces/property';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface LoanInterface {
  id?: string;
  loan_amount: number;
  interest_rate: number;
  loan_term: number;
  loan_status: string;
  property_id: string;
  lender_id: string;
  created_at?: any;
  updated_at?: any;
  application?: ApplicationInterface[];
  quote?: QuoteInterface[];
  property?: PropertyInterface;
  user?: UserInterface;
  _count?: {
    application?: number;
    quote?: number;
  };
}

export interface LoanGetQueryInterface extends GetQueryInterface {
  id?: string;
  loan_status?: string;
  property_id?: string;
  lender_id?: string;
}

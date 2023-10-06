import { LoanInterface } from 'interfaces/loan';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ApplicationInterface {
  id?: string;
  application_status: string;
  loan_id: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  loan?: LoanInterface;
  user?: UserInterface;
  _count?: {};
}

export interface ApplicationGetQueryInterface extends GetQueryInterface {
  id?: string;
  application_status?: string;
  loan_id?: string;
  user_id?: string;
}

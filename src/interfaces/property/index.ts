import { LoanInterface } from 'interfaces/loan';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PropertyInterface {
  id?: string;
  address: string;
  property_value: number;
  property_type: string;
  property_status: string;
  owner_id: string;
  created_at?: any;
  updated_at?: any;
  loan?: LoanInterface[];
  user?: UserInterface;
  _count?: {
    loan?: number;
  };
}

export interface PropertyGetQueryInterface extends GetQueryInterface {
  id?: string;
  address?: string;
  property_type?: string;
  property_status?: string;
  owner_id?: string;
}

import { QuoteInterface } from 'interfaces/quote';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CompanyInterface {
  id?: string;
  description?: string;
  address?: string;
  contact_number?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  quote?: QuoteInterface[];
  user?: UserInterface;
  _count?: {
    quote?: number;
  };
}

export interface CompanyGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  address?: string;
  contact_number?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}

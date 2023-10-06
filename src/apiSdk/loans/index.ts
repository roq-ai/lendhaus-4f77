import queryString from 'query-string';
import { LoanInterface, LoanGetQueryInterface } from 'interfaces/loan';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getLoans = async (query?: LoanGetQueryInterface): Promise<PaginatedInterface<LoanInterface>> => {
  return fetcher('/api/loans', {}, query);
};

export const createLoan = async (loan: LoanInterface) => {
  return fetcher('/api/loans', { method: 'POST', body: JSON.stringify(loan) });
};

export const updateLoanById = async (id: string, loan: LoanInterface) => {
  return fetcher(`/api/loans/${id}`, { method: 'PUT', body: JSON.stringify(loan) });
};

export const getLoanById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/loans/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteLoanById = async (id: string) => {
  return fetcher(`/api/loans/${id}`, { method: 'DELETE' });
};

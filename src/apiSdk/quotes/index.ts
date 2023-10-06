import queryString from 'query-string';
import { QuoteInterface, QuoteGetQueryInterface } from 'interfaces/quote';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getQuotes = async (query?: QuoteGetQueryInterface): Promise<PaginatedInterface<QuoteInterface>> => {
  return fetcher('/api/quotes', {}, query);
};

export const createQuote = async (quote: QuoteInterface) => {
  return fetcher('/api/quotes', { method: 'POST', body: JSON.stringify(quote) });
};

export const updateQuoteById = async (id: string, quote: QuoteInterface) => {
  return fetcher(`/api/quotes/${id}`, { method: 'PUT', body: JSON.stringify(quote) });
};

export const getQuoteById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/quotes/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteQuoteById = async (id: string) => {
  return fetcher(`/api/quotes/${id}`, { method: 'DELETE' });
};

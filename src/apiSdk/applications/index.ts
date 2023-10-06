import queryString from 'query-string';
import { ApplicationInterface, ApplicationGetQueryInterface } from 'interfaces/application';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getApplications = async (
  query?: ApplicationGetQueryInterface,
): Promise<PaginatedInterface<ApplicationInterface>> => {
  return fetcher('/api/applications', {}, query);
};

export const createApplication = async (application: ApplicationInterface) => {
  return fetcher('/api/applications', { method: 'POST', body: JSON.stringify(application) });
};

export const updateApplicationById = async (id: string, application: ApplicationInterface) => {
  return fetcher(`/api/applications/${id}`, { method: 'PUT', body: JSON.stringify(application) });
};

export const getApplicationById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/applications/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteApplicationById = async (id: string) => {
  return fetcher(`/api/applications/${id}`, { method: 'DELETE' });
};

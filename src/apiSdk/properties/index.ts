import queryString from 'query-string';
import { PropertyInterface, PropertyGetQueryInterface } from 'interfaces/property';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getProperties = async (
  query?: PropertyGetQueryInterface,
): Promise<PaginatedInterface<PropertyInterface>> => {
  return fetcher('/api/properties', {}, query);
};

export const createProperty = async (property: PropertyInterface) => {
  return fetcher('/api/properties', { method: 'POST', body: JSON.stringify(property) });
};

export const updatePropertyById = async (id: string, property: PropertyInterface) => {
  return fetcher(`/api/properties/${id}`, { method: 'PUT', body: JSON.stringify(property) });
};

export const getPropertyById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/properties/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deletePropertyById = async (id: string) => {
  return fetcher(`/api/properties/${id}`, { method: 'DELETE' });
};

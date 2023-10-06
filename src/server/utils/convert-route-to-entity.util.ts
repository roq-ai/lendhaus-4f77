const mapping: Record<string, string> = {
  applications: 'application',
  companies: 'company',
  loans: 'loan',
  properties: 'property',
  quotes: 'quote',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}

interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Property Owner'],
  customerRoles: ['Customer'],
  tenantRoles: ['Property Owner', 'Bank Lender', 'Loan Officer', 'Financial Advisor', 'End Customer'],
  tenantName: 'Company',
  applicationName: 'lendhaus',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: ['Manage user profile', 'View properties', 'Apply for loans', 'Receive quotes'],
  ownerAbilities: ['Manage properties', 'Manage loans', 'View quotes', 'View applications'],
  getQuoteUrl: 'https://app.roq.ai/proposal/8932b962-9958-46e1-bb5c-c6a96f90779a',
};

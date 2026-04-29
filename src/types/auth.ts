export type AppRole = 'super_admin' | 'company_admin' | 'financial_manager' | 'marketing_analyst' | 'viewer';

export interface User {
  id: string;
  email: string;
  companyName: string;
  industry: string;
  companySize: string;
  role: AppRole;
  domain?: string;
  keywords?: string[];
  sentimentGoals?: string;
}

export const ROLE_LABELS: Record<AppRole, string> = {
  super_admin: 'Super Admin',
  company_admin: 'Company Admin',
  financial_manager: 'Financial Manager',
  marketing_analyst: 'Marketing Analyst',
  viewer: 'Viewer',
};

export const ROLE_PERMISSIONS: Record<AppRole, string[]> = {
  super_admin: ['all'],
  company_admin: ['manage_users', 'view_all', 'edit_all', 'manage_settings'],
  financial_manager: ['view_financial', 'edit_financial', 'view_sentiment', 'view_insights'],
  marketing_analyst: ['view_sentiment', 'view_marketing', 'view_insights', 'edit_marketing'],
  viewer: ['view_all'],
};

export function hasPermission(role: AppRole, permission: string): boolean {
  const perms = ROLE_PERMISSIONS[role];
  return perms.includes('all') || perms.includes(permission) || perms.includes('view_all');
}

export function canEdit(role: AppRole): boolean {
  return role !== 'viewer';
}

export function canManageUsers(role: AppRole): boolean {
  return role === 'super_admin' || role === 'company_admin';
}

export function canAccessFinancialUploads(role: AppRole): boolean {
  return role !== 'marketing_analyst' && role !== 'viewer';
}

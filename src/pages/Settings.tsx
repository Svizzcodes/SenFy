import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { canManageUsers } from '@/types/auth';
import type { AppRole } from '@/types/auth';
import { ROLE_LABELS } from '@/types/auth';
import { Settings as SettingsIcon, Users, Shield, Building, Save, Check } from 'lucide-react';

const ALL_ROLES = Object.keys(ROLE_LABELS) as AppRole[];

export default function SettingsPage() {
  const { user, users, updateUserRole } = useAuth();
  const [companyName, setCompanyName] = useState(user?.companyName || '');
  const [industry, setIndustry] = useState(user?.industry || '');
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'company' | 'users' | 'roles'>('company');

  const isAdmin = user ? canManageUsers(user.role) : false;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleRoleChange = (userId: string, role: AppRole) => {
    updateUserRole(userId, role);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <SettingsIcon className="w-5 h-5 text-primary" />
          <h2 className="font-display font-semibold">Settings</h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-secondary/50 p-1 rounded-lg w-fit">
          {[
            { id: 'company' as const, label: 'Company', icon: Building },
            { id: 'users' as const, label: 'Users', icon: Users },
            { id: 'roles' as const, label: 'Roles', icon: Shield },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-colors ${
                activeTab === tab.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Company Settings */}
        {activeTab === 'company' && (
          <div className="glass-card p-6 animate-fade-in">
            <h3 className="font-display font-semibold text-sm mb-4">Company Details</h3>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Company Name</label>
                <input value={companyName} onChange={e => setCompanyName(e.target.value)} disabled={!isAdmin} className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Industry</label>
                <input value={industry} onChange={e => setIndustry(e.target.value)} disabled={!isAdmin} className="w-full h-10 px-3 rounded-lg bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50" />
              </div>
              {isAdmin && (
                <button onClick={handleSave} className="h-10 px-6 rounded-lg gradient-primary text-primary-foreground font-medium text-sm flex items-center gap-2 hover:opacity-90 transition-opacity">
                  {saved ? <><Check className="w-4 h-4" /> Saved</> : <><Save className="w-4 h-4" /> Save Changes</>}
                </button>
              )}
              {!isAdmin && <p className="text-xs text-muted-foreground">Only admins can edit company details.</p>}
            </div>
          </div>
        )}

        {/* User Management */}
        {activeTab === 'users' && (
          <div className="glass-card p-6 animate-fade-in">
            <h3 className="font-display font-semibold text-sm mb-4">User Management</h3>
            {!isAdmin ? (
              <p className="text-sm text-muted-foreground">Only admins can manage users.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-muted-foreground font-medium">Email</th>
                      <th className="text-left py-2 text-muted-foreground font-medium">Company</th>
                      <th className="text-left py-2 text-muted-foreground font-medium">Role</th>
                      <th className="text-left py-2 text-muted-foreground font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.id} className="border-b border-border/30">
                        <td className="py-2.5">{u.email}</td>
                        <td className="py-2.5 text-muted-foreground">{u.companyName}</td>
                        <td className="py-2.5">
                          <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">{ROLE_LABELS[u.role]}</span>
                        </td>
                        <td className="py-2.5">
                          <select
                            value={u.role}
                            onChange={e => handleRoleChange(u.id, e.target.value as AppRole)}
                            className="h-8 px-2 rounded bg-secondary border border-border text-xs focus:outline-none"
                          >
                            {ALL_ROLES.map(r => <option key={r} value={r}>{ROLE_LABELS[r]}</option>)}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Role Descriptions */}
        {activeTab === 'roles' && (
          <div className="glass-card p-6 animate-fade-in">
            <h3 className="font-display font-semibold text-sm mb-4">Role Permissions</h3>
            <div className="space-y-3">
              {[
                { role: 'Super Admin', perms: 'Full access to all features, user management, and settings' },
                { role: 'Company Admin', perms: 'Manage users, view and edit all data, manage settings' },
                { role: 'Financial Manager', perms: 'View and edit financial data, view sentiment and insights' },
                { role: 'Marketing Analyst', perms: 'View sentiment and marketing data, edit marketing campaigns' },
                { role: 'Viewer', perms: 'Read-only access to all dashboards, cannot edit or manage' },
              ].map(item => (
                <div key={item.role} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
                  <Shield className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{item.role}</p>
                    <p className="text-xs text-muted-foreground">{item.perms}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

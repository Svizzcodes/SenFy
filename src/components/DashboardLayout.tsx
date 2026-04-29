import { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AlertPanel } from '@/components/AlertPanel';
import {
  LayoutDashboard, TrendingUp, MessageSquare, Lightbulb,
  Target, Globe, FileText, Settings, LogOut, Menu, X, ChevronLeft,
} from 'lucide-react';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { path: '/financial', label: 'Financial Analytics', icon: TrendingUp },
  { path: '/sentiment', label: 'Sentiment Analytics', icon: MessageSquare },
  { path: '/insights', label: 'Integrated Insights', icon: Lightbulb },
  { path: '/marketing', label: 'Marketing Intelligence', icon: Target },
  { path: '/heatmap', label: 'World Heatmap', icon: Globe },
  { path: '/reports', label: 'Reports', icon: FileText },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile overlay */}
      {mobileOpen && <div className="fixed inset-0 bg-background/80 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 ${collapsed ? 'w-16' : 'w-60'} ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Logo */}
        <div className={`flex items-center h-14 border-b border-sidebar-border px-4 ${collapsed ? 'justify-center' : 'justify-between'}`}>
          {!collapsed && <span className="font-display font-bold text-lg text-gradient-primary">Senfy AI</span>}
          <button onClick={() => { setCollapsed(!collapsed); setMobileOpen(false); }} className="p-1 rounded hover:bg-sidebar-accent transition-colors hidden lg:block">
            <ChevronLeft className={`w-4 h-4 text-sidebar-foreground transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          </button>
          <button onClick={() => setMobileOpen(false)} className="p-1 rounded hover:bg-sidebar-accent transition-colors lg:hidden">
            <X className="w-4 h-4 text-sidebar-foreground" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 space-y-0.5 overflow-y-auto px-2">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium glow-primary'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                } ${collapsed ? 'justify-center' : ''}`
              }
            >
              <item.icon className="w-4.5 h-4.5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="border-t border-sidebar-border p-3">
          {!collapsed && user && (
            <div className="mb-2 px-2">
              <p className="text-xs font-medium truncate">{user.name || user.email}</p>
              <p className="text-[10px] text-muted-foreground capitalize">{user.role?.replace('_', ' ') || 'User'}</p>
            </div>
          )}
          <button onClick={handleLogout} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive transition-colors w-full ${collapsed ? 'justify-center' : ''}`}>
            <LogOut className="w-4 h-4 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-14 border-b border-border flex items-center justify-between px-4 lg:px-6 bg-background/80 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="p-2 rounded-lg hover:bg-secondary transition-colors lg:hidden">
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="font-display font-semibold text-sm lg:text-base">
              {NAV_ITEMS.find(n => location.pathname.startsWith(n.path))?.label || 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <AlertPanel />
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
              {user?.email?.[0]?.toUpperCase() || 'U'}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
